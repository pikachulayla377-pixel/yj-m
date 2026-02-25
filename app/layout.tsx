import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import SocialFloat from "@/components/SocialFloat/SocialFloat";
import Chatbot from "@/components/Chatbot/Chatbot";
import Maintenance from "@/components/Maintenance/Maintenance";
import { GoogleAnalytics } from '@next/third-parties/google';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FEATURE_FLAGS } from "@/lib/config";
import { connectDB } from "@/lib/mongodb";
import SystemSettings from "@/models/SystemSettings";

export const metadata: Metadata = {
  title: "yuji – MLBB Diamond Top Up | Instant & Secure",
  description: "yuji is a fast and secure Mobile Legends (MLBB) diamond top-up platform. Instant delivery, safe payments, and 24/7 automated service.",
};

async function getMaintenanceMode() {
  try {
    await connectDB();
    const settings = await SystemSettings.findOne();
    return settings?.maintenanceMode || false;
  } catch (err) {
    console.error("Failed to fetch maintenance mode", err);
    return false;
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMaintenance = await getMaintenanceMode();

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          {isMaintenance && <Maintenance />}
          <Header />
          <main className="pt-20">{children}</main>
          <Footer />
          <SocialFloat />
          <Chatbot />
        </GoogleOAuthProvider>

      </body>
      <GoogleAnalytics gaId="G-7MQ5K05HZQ" />
      {/* <script src="https://quge5.com/88/tag.min.js" data-zone="191906" async data-cfasync="false"></script> */}
    </html>
  );
}
