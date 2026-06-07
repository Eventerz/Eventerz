"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useEvents } from "@/providers/event-provider";
import ProfileCard from "@/components/profile/profile-card";
import QRCodeCard from "@/components/profile/qr-code-card";
import { formatDate } from "@/lib/utils";
import { Calendar, Ticket, ArrowRight, XCircle } from "lucide-react";

export default function ProfilePage() {
  const { publicKey } = useWallet();
  const { getEventsByAttendee } = useEvents();

  if (!publicKey) {
    return (
      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-background">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">My Profile</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProfileCard />
          </div>
          <div className="lg:col-span-1">
            <QRCodeCard />
          </div>
        </div>
      </div>
    );
  }

  const walletAddress = publicKey.toBase58();
  const attendedEvents = getEventsByAttendee(walletAddress);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-background">
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <ProfileCard />
        </div>
        <div className="lg:col-span-1">
          <QRCodeCard />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <Ticket className="w-6 h-6 text-primary" />
          My RSVPs
        </h2>

        {attendedEvents.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-border text-center shadow-sm">
            <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
              <Calendar className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No RSVPs yet</h3>
            <p className="text-muted mb-6">Discover events and RSVP to start building your on-chain reputation.</p>
            <Link 
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm"
            >
              Explore Events <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attendedEvents.map((event) => {
              const isPast = new Date(event.date) < new Date();
              return (
                <div key={event.id} className="bg-white rounded-2xl border border-border p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  {/* Decorative accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${isPast ? 'bg-muted' : 'bg-green-500'}`}></div>
                  
                  <div className="flex justify-between items-start mb-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${isPast ? 'bg-card text-muted border border-border' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                      {isPast ? 'Past Event' : 'Confirmed'}
                    </span>
                    {!isPast && (
                      <Link href={`/events/${event.id}`} title="Cancel RSVP" className="text-muted hover:text-red-500 transition-colors">
                        <XCircle className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-muted flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> {formatDate(event.date)}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/events/${event.id}`}
                    className="block w-full py-2.5 bg-card text-center text-sm font-medium text-foreground rounded-lg border border-border hover:border-primary/30 hover:text-primary transition-all"
                  >
                    View Details
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
