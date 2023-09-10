import "./globals.css";
import type { Metadata } from "next";
import { Inter, Londrina_Solid } from "next/font/google";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { WalletProvider } from "@/components/WalletProviderWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const londrinaSolid = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  variable: "--font-londrina-solid",
});

export const metadata: Metadata = {
  title: "Fundle",
  description: "Farm to Fund!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${londrinaSolid.variable}`}>
        <WalletProvider>
          <NavBar />
          {children}
          <Footer />
        </WalletProvider>
      </body>
    </html>
  );
}
