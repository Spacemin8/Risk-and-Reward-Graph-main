import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles/global.css";
import AppProvider from "@/source/components/AppProvider";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Aries challenge",
  description: "Design and implement a front-end for options strategy risk and reward analysis using Vue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#b1dbff"></meta>
      </head>
      <body className={`${poppins.variable} font-poppins tracking-wide`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
