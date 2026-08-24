import type { Metadata } from "next";
import { Prompt, IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import SplashScreen from "@/components/SplashScreen";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

const ibm = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "รายงานการฝึกปฏิบัติการสอน",
  description: "ระบบรายงานการฝึกปฏิบัติการสอนและแฟ้มสะสมผลงาน",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/images/others/logo_comedu.jpeg", type: "image/jpeg" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${prompt.variable} ${ibm.variable} ${jetbrains.variable} font-sans`}>
      <body className="antialiased min-h-screen flex flex-col relative overflow-x-hidden">
        <SplashScreen />
        
        {/* Animated Tech Background (Aurora & Circuit) */}
        <div className="aurora">
          <div className="blob b1"></div>
          <div className="blob b2"></div>
          <div className="blob b3"></div>
        </div>

        <svg className="circuit" id="circuitSvg" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
          <path id="cpath1" d="M0,120 L220,120 L220,260 L520,260 L520,80 L820,80"></path>
          <path id="cpath2" d="M1440,300 L1180,300 L1180,460 L900,460 L900,620 L620,620"></path>
          <path id="cpath3" d="M100,900 L100,720 L400,720 L400,860 L700,860"></path>
          <circle className="node" cx="220" cy="120" r="4"></circle>
          <circle className="node" cx="520" cy="260" r="4"></circle>
          <circle className="node" cx="1180" cy="300" r="4"></circle>
          <circle className="node" cx="900" cy="460" r="4"></circle>
          <circle className="node" cx="400" cy="720" r="4"></circle>
          <circle className="packet" r="3.5">
            <animateMotion dur="6s" repeatCount="indefinite" begin="0s">
              <mpath href="#cpath1" />
            </animateMotion>
          </circle>
          <circle className="packet" r="3.5">
            <animateMotion dur="7.5s" repeatCount="indefinite" begin="1s">
              <mpath href="#cpath2" />
            </animateMotion>
          </circle>
          <circle className="packet" r="3.5">
            <animateMotion dur="5.5s" repeatCount="indefinite" begin="2s">
              <mpath href="#cpath3" />
            </animateMotion>
          </circle>
        </svg>

        {/* Content */}
        <div id="site" className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main 
            className="flex-grow w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pb-16"
            style={{ paddingTop: 'var(--page-top-padding)' }}
          >
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
