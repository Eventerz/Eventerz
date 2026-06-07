"use client";

import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

  return (
    <section className="relative overflow-hidden pt-24 pb-32 sm:pt-32 sm:pb-40">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      
      {/* Animated subtle shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-secondary/10 rounded-full blur-3xl animate-float delay-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Built on Solana</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-8">
            Everything is <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">On-chain</span>,<br />
            Why Not Your Events?
          </h1>
          
          <p className="text-lg sm:text-xl text-muted mb-10 leading-relaxed">
            The wallet-native event platform. Connect your Solana wallet to discover events, RSVP on-chain, and build your community reputation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {connected ? (
              <Link 
                href="/events"
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-medium text-lg hover:bg-primary-dark transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                Go to Events
                <ArrowRight className="w-5 h-5" />
              </Link>
            ) : (
              <button
                onClick={() => setVisible(true)}
                className="w-full sm:w-auto px-8 py-4 bg-primary text-white rounded-xl font-medium text-lg hover:bg-primary-dark transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                Connect Wallet
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
            
            <Link 
              href="/events"
              className="w-full sm:w-auto px-8 py-4 bg-white text-foreground border-2 border-border-light rounded-xl font-medium text-lg hover:border-primary/30 hover:bg-card transition-all"
            >
              Explore Events
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
