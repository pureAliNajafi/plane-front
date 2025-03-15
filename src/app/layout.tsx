import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ZustandProvider from "@/core/providers/ZustandProvider";
import TokenTimerProvider from "@/core/providers/TokenTimerProvider";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "Warbirds",
  description: "Flying Machines Models",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ZustandProvider>
          <TokenTimerProvider>
            <ToastContainer className="top-[64px]" />
            <Navbar /> {children}
          </TokenTimerProvider>
        </ZustandProvider>
      </body>
    </html>
  );
}
