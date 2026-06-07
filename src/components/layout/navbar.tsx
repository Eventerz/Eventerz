"use client";

import { useState } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  Menu,
  X,
  Zap,
} from "lucide-react";
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
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground tracking-tight">
              Eventerz
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-card transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet Button (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            {connected && publicKey ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-primary/10">
                    <img
                      src={`https://api.dicebear.com/9.x/identicon/svg?seed=${publicKey.toBase58()}`}
                      alt="avatar"
                      className="w-full h-full"
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
                className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md"
              >
                Connect Wallet
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-muted hover:text-foreground rounded-lg hover:bg-card transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-border-light animate-fade-in">
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
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-primary/10">
                      <img
                        src={`https://api.dicebear.com/9.x/identicon/svg?seed=${publicKey.toBase58()}`}
                        alt="avatar"
                        className="w-full h-full"
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
