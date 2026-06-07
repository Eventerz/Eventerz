"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Menu, X, Zap } from "lucide-react";
import { shortenAddress } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleConnect = () => {
    setVisible(true);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(109,93,252,0.35)]">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              Eventerz
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-1/2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {connected && publicKey ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm">
                  <div className="relative w-6 h-6 rounded-full overflow-hidden bg-primary/10">
                    <Image
                      src={`https://api.dicebear.com/9.x/identicon/svg?seed=${publicKey.toBase58()}`}
                      alt="wallet avatar"
                      fill
                      className="object-cover"
                      sizes="24px"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {shortenAddress(publicKey.toBase58())}
                  </span>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="px-3 py-2 text-sm text-muted hover:text-error rounded-lg hover:bg-red-50 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-medium rounded-xl hover:shadow-[0_0_20px_rgba(109,93,252,0.35)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Connect Wallet
              </button>
            )}
          </div>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="md:hidden p-2 text-muted hover:text-foreground rounded-lg hover:bg-card transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-background/98 border-b border-border-light shadow-lg animate-fade-in">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-muted hover:text-foreground hover:bg-card rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-border-light">
              {connected && publicKey ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden bg-primary/10">
                      <Image
                        src={`https://api.dicebear.com/9.x/identicon/svg?seed=${publicKey.toBase58()}`}
                        alt="wallet avatar"
                        fill
                        className="object-cover"
                        sizes="24px"
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {shortenAddress(publicKey.toBase58())}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      disconnect();
                      setIsOpen(false);
                    }}
                    className="w-full px-4 py-3 text-sm text-left text-error hover:bg-red-50 rounded-lg transition-colors"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    handleConnect();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
