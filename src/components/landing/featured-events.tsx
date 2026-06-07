import Link from "next/link";
import Image from "next/image";
import { MOCK_EVENTS } from "@/lib/mock-data";
import { formatDate, formatTime, getCategoryColor, getCategoryLabel } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

export default function FeaturedEvents() {
  const featuredEvents = MOCK_EVENTS.filter(event => event.isFeatured).slice(0, 3);

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Featured Events
            </h2>
            <p className="text-lg text-muted">
              Don't miss out on these upcoming top-tier events.
            </p>
          </div>
          <Link 
            href="/events"
            className="px-6 py-3 bg-card text-foreground font-medium rounded-xl border border-border hover:border-primary/30 hover:bg-card-hover transition-all"
          >
            View all events
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <Link 
              key={event.id} 
              href={`/events/${event.id}`}
              className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
            >
              {/* Banner Image */}
              <div className="relative h-48 w-full overflow-hidden bg-muted/10">
                <Image
                  src={event.bannerImage}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute top-4 right-4">
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm shadow-sm"
                    style={{ color: getCategoryColor(event.category) }}
                  >
                    {getCategoryLabel(event.category)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {event.title}
                </h3>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="truncate">{event.isOnline ? "Online Event" : event.venue}</span>
                  </div>
                </div>

                {/* Footer section of card */}
                <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-primary/10 overflow-hidden">
                         <img src={event.organizer.avatar} alt="Organizer" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground ml-1">
                      By {event.organizer.displayName}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-sm font-medium text-muted bg-card px-2.5 py-1 rounded-md">
                    <Users className="w-4 h-4" />
                    <span>{event.rsvpCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
