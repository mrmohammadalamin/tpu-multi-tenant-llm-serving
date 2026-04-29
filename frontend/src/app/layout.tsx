import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Multi-Tenant LLM Serving on TPUs | SaaS Dashboard",
  description: "Scalable Multi-LoRA vLLM SaaS Architecture on GKE for Google TPU Sprint",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent)]" />
        <nav className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-white shadow-lg">
              TPU
            </div>
            <span className="font-outfit text-xl font-bold tracking-tight">SaaS Gateway</span>
          </div>
          <div className="flex items-center gap-8 text-sm font-medium text-white/60">
            <a href="#" className="hover:text-cyan-400 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Playground</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Analytics</a>
            <button className="glow-btn px-5 py-2 rounded-full text-white font-semibold">
              Get Started
            </button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
