"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEvents } from "@/providers/event-provider";
import { formatDate, formatTime, getCategoryColor, getCategoryLabel, getCapacityPercentage } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users, Share2, Tag, ArrowLeft, Ticket } from "lucide-react";

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getEventById, isRsvped, rsvpToEvent, cancelRsvp } = useEvents();
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  
  const [isHovering, setIsHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  const walletAddress = publicKey?.toBase58();
  const isUserRsvped = walletAddress ? isRsvped(id, walletAddress) : false;
  const isOrganizer = walletAddress === event.organizer.walletAddress;
  
  const capacityPercent = getCapacityPercentage(event.rsvpCount, event.capacity);
  const isFull = capacityPercent >= 100;
  
  const handleRsvp = () => {
    if (!walletAddress) {
      setVisible(true);
      return;
    }
    
    if (isUserRsvped) {
      cancelRsvp(id, walletAddress);
    } else if (!isFull) {
      rsvpToEvent(id, walletAddress);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Banner */}
      <div className="relative h-[40vh] min-h-[300px] w-full bg-muted/20">
        <Image
          src={event.bannerImage}
          alt={event.title}
          fill
          className="object-cover"
          unoptimized
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        
        <div className="absolute top-6 left-4 sm:left-6 lg:left-8">
          <Link 
            href="/events"
            className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-sm font-medium text-foreground hover:bg-white transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Main Content */}
          <div className="lg:w-2/3 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                    style={{ 
                      backgroundColor: `${getCategoryColor(event.category)}20`, 
                      color: getCategoryColor(event.category) 
                    }}
                  >
                    {getCategoryLabel(event.category)}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
                    {event.title}
                  </h1>
                </div>
                
                <button 
                  onClick={handleShare}
                  className="p-3 bg-card border border-border rounded-xl text-muted hover:text-primary hover:border-primary/30 transition-colors shrink-0"
                  aria-label="Share event"
                  title="Copy link"
                >
                  {copied ? <span className="text-sm font-medium text-primary">Copied!</span> : <Share2 className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex items-center gap-4 py-6 border-y border-border my-6">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-primary/10 overflow-hidden shrink-0 shadow-sm">
                  <img src={event.organizer.avatar} alt={event.organizer.displayName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm text-muted mb-0.5">Organized by</p>
                  <p className="font-semibold text-foreground">{event.organizer.displayName}</p>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-foreground mb-4">About This Event</h3>
                <p className="text-muted leading-relaxed whitespace-pre-wrap">
                  {event.description}
                </p>
              </div>

              {event.tags && event.tags.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-muted" /> Tags
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-card border border-border rounded-lg text-sm text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {event.schedule && event.schedule.length > 0 && (
              <div className="bg-white p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="text-xl font-bold text-foreground mb-6">Schedule</h3>
                <div className="space-y-6">
                  {event.schedule.map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-20 shrink-0 text-sm font-medium text-muted pt-1">
                        {formatTime(item.time)}
                      </div>
                      <div className="flex-grow pb-6 border-b border-border last:border-0 last:pb-0">
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        {item.speaker && (
                          <p className="text-sm text-muted mt-1">Speaker: {item.speaker}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-border shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-foreground mb-6">Event Details</h3>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{formatDate(event.date)}</p>
                    <p className="text-sm text-muted">{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{event.isOnline ? "Online Event" : "Venue"}</p>
                    <p className="text-sm text-muted">{event.venue}</p>
                  </div>
                </div>
              </div>

              {/* RSVP Capacity */}
              <div className="bg-card p-4 rounded-xl border border-border mb-6">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2 text-foreground font-semibold">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.rsvpCount.toLocaleString()}</span>
                    <span className="text-muted font-normal text-sm">attending</span>
                  </div>
                  <div className="text-sm font-medium text-muted">
                    {event.capacity.toLocaleString()} max
                  </div>
                </div>
                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${capacityPercent}%` }}
                  ></div>
                </div>
                {isFull && <p className="text-xs text-red-500 font-medium mt-2 text-center">This event is currently full</p>}
              </div>

              {/* Action Button */}
              {isOrganizer ? (
                <button className="w-full py-4 bg-card text-foreground font-medium rounded-xl border border-border cursor-default flex items-center justify-center gap-2">
                  <Ticket className="w-5 h-5" /> You are the organizer
                </button>
              ) : (
                <button 
                  onClick={handleRsvp}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  disabled={isFull && !isUserRsvped}
                  className={`w-full py-4 font-bold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2
                    ${isUserRsvped 
                      ? isHovering 
                        ? 'bg-red-50 text-red-600 border border-red-200' 
                        : 'bg-green-500 text-white shadow-green-500/25'
                      : isFull
                        ? 'bg-muted text-white cursor-not-allowed opacity-70'
                        : 'bg-primary text-white hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] shadow-primary/25'
                    }
                  `}
                >
                  <Ticket className="w-5 h-5" />
                  {isUserRsvped 
                    ? isHovering ? "Cancel RSVP" : "You're Going!" 
                    : isFull 
                      ? "Sold Out" 
                      : !walletAddress 
                        ? "Connect Wallet to RSVP" 
                        : "RSVP Now"
                  }
                </button>
              )}
              
              {!walletAddress && (
                <p className="text-xs text-center text-muted mt-4">
                  A Solana wallet is required to RSVP to events on Eventerz.
                </p>
              )}
              
              {isUserRsvped && (
                <p className="text-xs text-center text-green-600 font-medium mt-4">
                  Your RSVP has been recorded on-chain. See you there!
                </p>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
