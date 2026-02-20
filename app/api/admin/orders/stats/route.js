import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
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
            const matchStatus = { $in: ["success", "SUCCESS"] }; // Only count successful orders for revenue

            const stats = await Order.aggregate([
                {
                    $match: {
                        createdAt: { $gte: startDate }
                    }
                },
                {
                    $facet: {
                        totalOrders: [{ $count: "count" }],
                        revenue: [
                            { $match: { status: matchStatus } },
                            { $group: { _id: null, total: { $sum: "$price" } } }
                        ]
                    }
                }
            ]);

            return {
                count: stats[0].totalOrders[0]?.count || 0,
                revenue: stats[0].revenue[0]?.total || 0,
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
