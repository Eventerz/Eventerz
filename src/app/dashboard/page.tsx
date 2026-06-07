"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Link from "next/link";
import { useEvents } from "@/providers/event-provider";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import { formatDate, getCapacityPercentage } from "@/lib/utils";
import { PlusCircle, ExternalLink, Users, Calendar } from "lucide-react";

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const { setVisible } = useWalletModal();
  const { getEventsByOrganizer } = useEvents();

  if (!publicKey) {
    return (
      <div className="py-20 max-w-7xl mx-auto px-4 text-center">
        <div className="bg-white p-12 rounded-3xl border border-border shadow-sm max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">Organizer Dashboard</h1>
          <p className="text-lg text-muted mb-8">
            Connect your wallet to manage your events, view attendee lists, and track RSVP analytics.
          </p>
          <button
            onClick={() => setVisible(true)}
            className="px-8 py-4 bg-primary text-white rounded-xl font-medium text-lg hover:bg-primary-dark transition-all shadow-md"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  const walletAddress = publicKey.toBase58();
  const myEvents = getEventsByOrganizer(walletAddress);
  
  // Calculate stats
  const totalEvents = myEvents.length;
  const totalRSVPs = myEvents.reduce((sum, event) => sum + event.rsvpCount, 0);
  
  const now = new Date();
  const upcomingEvents = myEvents.filter(e => new Date(e.date) >= now).length;
  
  const totalCapacity = myEvents.reduce((sum, event) => sum + event.capacity, 0);
  const averageAttendance = totalCapacity > 0 ? Math.round((totalRSVPs / totalCapacity) * 100) : 0;

  const statsData = {
    totalEvents,
    totalRSVPs,
    upcomingEvents,
    averageAttendance,
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-background">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Organizer Dashboard</h1>
          <p className="text-muted">Manage your events and track performance.</p>
        </div>
        <Link 
          href="/create"
          className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm flex items-center gap-2"
        >
          <PlusCircle className="w-5 h-5" />
          Create Event
        </Link>
      </div>

      <div className="mb-12">
        <DashboardStats stats={statsData} />
      </div>

      <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between bg-card">
          <h2 className="text-xl font-bold text-foreground">Your Events</h2>
          <span className="text-sm font-medium text-muted bg-white px-3 py-1 rounded-full border border-border shadow-sm">
            {myEvents.length} Total
          </span>
        </div>

        {myEvents.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
              <Calendar className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No events created yet</h3>
            <p className="text-muted mb-6">Create your first event to start managing RSVPs.</p>
            <Link 
              href="/create"
              className="inline-flex items-center gap-2 text-primary font-medium hover:text-primary-dark"
            >
              Create Event <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-card/50 border-b border-border text-sm font-medium text-muted uppercase tracking-wider">
                  <th className="p-4 pl-6">Event Name</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">RSVPs</th>
                  <th className="p-4 text-right pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {myEvents.map(event => {
                  const eventDate = new Date(event.date);
                  const isPast = eventDate < now;
                  const capacityPercent = getCapacityPercentage(event.rsvpCount, event.capacity);
                  
                  return (
                    <tr key={event.id} className="hover:bg-card/50 transition-colors">
                      <td className="p-4 pl-6">
                        <Link href={`/events/${event.id}`} className="font-semibold text-foreground hover:text-primary transition-colors block mb-1">
                          {event.title}
                        </Link>
                        <span className="text-xs text-muted capitalize">{event.category}</span>
                      </td>
                      <td className="p-4 text-sm text-foreground">
                        {formatDate(event.date)}
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${isPast ? 'bg-gray-100 text-gray-600' : 'bg-green-100 text-green-700'}`}>
                          {isPast ? 'Past' : 'Upcoming'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 font-medium text-foreground">
                            <Users className="w-4 h-4 text-muted" />
                            {event.rsvpCount} / {event.capacity}
                          </div>
                          <div className="w-20 h-1.5 bg-border rounded-full overflow-hidden hidden sm:block">
                            <div 
                              className={`h-full rounded-full ${capacityPercent >= 100 ? 'bg-red-500' : 'bg-primary'}`}
                              style={{ width: `${capacityPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <Link 
                          href={`/events/${event.id}`}
                          className="inline-flex items-center justify-center p-2 text-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="View Event"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
