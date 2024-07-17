import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/providers/providers";

const space_Mono = Space_Mono({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Comma",
  description: "Comma Social Media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={space_Mono.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
