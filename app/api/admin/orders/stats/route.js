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

        /* ================= AGGREGATION ================= */
        const matchStatus = ["success", "SUCCESS"];

        const result = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: null,
                    count1d: { $sum: { $cond: [{ $gte: ["$createdAt", oneDayAgo] }, 1, 0] } },
                    revenue1d: { $sum: { $cond: [{ $and: [{ $gte: ["$createdAt", oneDayAgo] }, { $in: ["$status", matchStatus] }] }, "$price", 0] } },
                    count7d: { $sum: { $cond: [{ $gte: ["$createdAt", sevenDaysAgo] }, 1, 0] } },
                    revenue7d: { $sum: { $cond: [{ $and: [{ $gte: ["$createdAt", sevenDaysAgo] }, { $in: ["$status", matchStatus] }] }, "$price", 0] } },
                    count30d: { $sum: 1 },
                    revenue30d: { $sum: { $cond: [{ $in: ["$status", matchStatus] }, "$price", 0] } }
                }
            }
        ]);

        const stats = result[0] || {
            count1d: 0, revenue1d: 0,
            count7d: 0, revenue7d: 0,
            count30d: 0, revenue30d: 0
        };

        return Response.json({
            success: true,
            stats: {
                "1d": { count: stats.count1d, revenue: stats.revenue1d },
                "7d": { count: stats.count7d, revenue: stats.revenue7d },
                "30d": { count: stats.count30d, revenue: stats.revenue30d },
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
