"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { MOCK_BADGES } from "@/lib/mock-data";
import { shortenAddress, getAvatarUrl } from "@/lib/utils";
import { Badge } from "@/lib/types";

export default function ProfileCard() {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);

  const address = publicKey?.toBase58() || "Not Connected";
  const avatarUrl = publicKey ? getAvatarUrl(address) : getAvatarUrl("guest");
  const reputationScore = 850; // Mock score

  const handleCopy = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTierColor = (tier: Badge["tier"]) => {
    switch (tier) {
      case "bronze": return "border-[#CD7F32] bg-[#CD7F32]/10 text-[#CD7F32]";
      case "silver": return "border-[#C0C0C0] bg-[#C0C0C0]/10 text-[#9CA3AF]"; // text-gray-400 equivalent
      case "gold": return "border-[#FFD700] bg-[#FFD700]/10 text-[#D4AF37]";
      case "diamond": return "border-[#B9F2FF] bg-[#B9F2FF]/20 text-[#00BFFF]";
      default: return "border-border bg-card text-muted";
    }
  };

  if (!publicKey) {
    return (
      <div className="bg-white rounded-2xl border border-border p-8 text-center shadow-sm">
        <div className="w-24 h-24 rounded-full bg-card mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-md">
          <span className="text-4xl">👻</span>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Connect Wallet</h2>
        <p className="text-muted">Connect your Solana wallet to view your profile and reputation.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
      {/* Header Banner */}
      <div className="h-32 bg-gradient-to-r from-primary to-secondary relative">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="px-6 pb-8 sm:px-8">
        {/* Avatar & Address */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 mb-8 relative z-10">
          <div className="flex items-end gap-5">
            <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-lg shrink-0">
              <div className="w-full h-full rounded-xl overflow-hidden bg-primary/10">
                <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>
            
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-foreground mb-1">
                {shortenAddress(address, 6)}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-muted">
                  <span className="truncate max-w-[120px] sm:max-w-[200px]">{address}</span>
                  <button 
                    onClick={handleCopy}
                    className="p-1 hover:bg-border rounded-md transition-colors"
                    aria-label="Copy address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <a 
                    href={`https://explorer.solana.com/address/${address}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 hover:bg-border rounded-md transition-colors ml-1"
                    aria-label="View on Explorer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Reputation Score */}
          <div className="bg-card border border-border px-6 py-4 rounded-xl flex items-center gap-4 sm:mb-2">
            <div>
              <p className="text-sm font-medium text-muted mb-1">Reputation Score</p>
              <p className="text-3xl font-bold text-primary">{reputationScore}</p>
            </div>
            {/* Simple progress ring representation */}
            <div className="relative w-14 h-14">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  className="stroke-border"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                />
                <path
                  className="stroke-primary"
                  strokeDasharray={`${(reputationScore / 1000) * 100}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-foreground">Attendance Badges</h3>
            <span className="text-sm font-medium text-muted bg-card px-3 py-1 rounded-full border border-border">
              {MOCK_BADGES.length} Earned
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_BADGES.map((badge) => (
              <div 
                key={badge.id}
                className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-sm transition-all"
              >
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl shrink-0 ${getTierColor(badge.tier)}`}>
                  {badge.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{badge.name}</h4>
                  <p className="text-xs text-muted line-clamp-2">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
