import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SystemSettings from "@/models/SystemSettings";

export async function GET() {
    try {
        await connectDB();
        let settings = await SystemSettings.findOne();
        if (!settings) {
            settings = { maintenanceMode: false };
        }
        return NextResponse.json({ success: true, settings });
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message }, { status: 500 });
    }
}
