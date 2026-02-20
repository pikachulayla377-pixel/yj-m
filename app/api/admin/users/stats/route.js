import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
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

        /* ================= STATS ================= */
        const [
            active1d, active7d, active30d,
            new1d, new7d, new30d
        ] = await Promise.all([
            // Active Users (lastLoginAt)
            User.countDocuments({ lastLoginAt: { $gte: oneDayAgo } }),
            User.countDocuments({ lastLoginAt: { $gte: sevenDaysAgo } }),
            User.countDocuments({ lastLoginAt: { $gte: thirtyDaysAgo } }),

            // New Users (createdAt)
            User.countDocuments({ createdAt: { $gte: oneDayAgo } }),
            User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
            User.countDocuments({ createdAt: { $gte: thirtyDaysAgo } }),
        ]);

        return Response.json({
            success: true,
            stats: {
                active: {
                    "1d": active1d,
                    "7d": active7d,
                    "30d": active30d,
                },
                new: {
                    "1d": new1d,
                    "7d": new7d,
                    "30d": new30d,
                }
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
