import { connectDB } from "@/lib/mongodb";
import SupportQuery from "@/models/SupportQuery";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        await connectDB();

        /* ================= AUTH ================= */
        const auth = req.headers.get("authorization");
        if (!auth?.startsWith("Bearer "))
            return Response.json({ message: "Unauthorized" }, { status: 401 });

        const token = auth.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userType !== "owner")
            return Response.json({ message: "Forbidden" }, { status: 403 });

        /* ================= DATES ================= */
        const now = new Date();
        const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

        /* ================= AGGREGATION HELPERS ================= */
        const getStats = async (startDate) => {
            const stats = await SupportQuery.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startDate }
                    }
                },
                {
                    $facet: {
                        totalQueries: [{ $count: "count" }],
                        activeQueries: [
                            { $match: { status: { $in: ["open", "in_progress"] } } },
                            { $count: "count" }
                        ],
                        resolvedQueries: [
                            { $match: { status: "resolved" } },
                            { $count: "count" }
                        ]
                    }
                }
            ]);

            return {
                total: stats[0].totalQueries[0]?.count || 0,
                active: stats[0].activeQueries[0]?.count || 0,
                resolved: stats[0].resolvedQueries[0]?.count || 0
            };
        };

        const [stats1d, stats7d, stats30d] = await Promise.all([
            getStats(oneDayAgo),
            getStats(sevenDaysAgo),
            getStats(thirtyDaysAgo)
        ]);

        return Response.json({
            success: true,
            stats: {
                "1d": stats1d,
                "7d": stats7d,
                "30d": stats30d,
            }
        });
    } catch (err) {
        console.error(err);
        return Response.json(
            { success: false, message: "Server error" },
            { status: 500 }
        );
    }
}
