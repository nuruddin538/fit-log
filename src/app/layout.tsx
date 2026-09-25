import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import FitLogProvider from "@/context/FitLogContext";
import ToastProvider from "@/components/ToastProvider";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "FitLog | Workout Library",
  description: "Build your workout plan with FitLog.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FitLogProvider>
          <Navbar></Navbar>
          <main>{children}</main>
          {/* <Footer /> */}
          <ToastProvider />
        </FitLogProvider>
      </body>
    </html>
  );
}
