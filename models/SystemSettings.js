import mongoose from "mongoose";

const SystemSettingsSchema = new mongoose.Schema(
    {
        maintenanceMode: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

if (mongoose.models.SystemSettings) {
    delete mongoose.models.SystemSettings;
}

export default mongoose.model("SystemSettings", SystemSettingsSchema);
