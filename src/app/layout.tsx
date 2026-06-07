import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SolanaWalletProvider from "@/providers/wallet-provider";
import { EventProvider } from "@/providers/event-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eventerz | Wallet-Native Event Platform",
  description:
    "Everything is On-chain, Why Not Your Events? Discover events, RSVP on-chain, and build your community reputation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-svh flex flex-col bg-background text-foreground overflow-x-hidden">
        <SolanaWalletProvider>
          <EventProvider>
            <Navbar />
            <main className="flex-1 w-full flex flex-col">{children}</main>
            <Footer />
          </EventProvider>
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
