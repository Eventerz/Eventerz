"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, ShieldCheck } from "lucide-react";

export default function QRCodeCard() {
  const { publicKey } = useWallet();

  const qrValue = publicKey ? publicKey.toBase58() : "eventerz-guest";

  if (!publicKey) return null;

  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col h-full">
      <div className="p-6 border-b border-border bg-card flex items-center justify-between">
        <h3 className="font-bold text-foreground text-lg flex items-center gap-2">
          <QrCode className="w-5 h-5 text-primary" />
          Event Check-In
        </h3>
      </div>
      
      <div className="p-8 flex flex-col items-center justify-center flex-grow text-center">
        <p className="text-muted mb-8 max-w-xs">
          Show this QR code at the event venue to verify your RSVP and log your attendance.
        </p>
        
        <div className="bg-white p-4 rounded-xl border-2 border-border shadow-sm inline-block mb-8 relative group">
          <div className="absolute inset-0 border-2 border-primary rounded-xl opacity-0 group-hover:opacity-100 scale-105 transition-all duration-300 pointer-events-none"></div>
          <QRCodeSVG 
            value={qrValue}
            size={200}
            bgColor={"#ffffff"}
            fgColor={"#0F172A"}
            level={"Q"}
            includeMargin={false}
          />
        </div>
        
        <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-xl text-left border border-primary/10 max-w-sm mt-auto">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">On-chain Verification</h4>
            <p className="text-xs text-muted leading-relaxed">
              When scanned by the organizer, an on-chain transaction will be created to verify your attendance and issue your badge.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
