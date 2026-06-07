import Link from "next/link";
import Image from "next/image";
import { Event } from "@/lib/types";
import { formatDate, formatTime, getCategoryColor, getCategoryLabel, getCapacityPercentage } from "@/lib/utils";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const capacityPercent = getCapacityPercentage(event.rsvpCount, event.capacity);
  const isFull = capacityPercent >= 100;

  return (
    <Link 
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
        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
          <span 
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/95 backdrop-blur-sm shadow-sm"
            style={{ color: getCategoryColor(event.category) }}
          >
            {getCategoryLabel(event.category)}
          </span>
          {isFull && (
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-500 text-white shadow-sm">
              Sold Out
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <div className="space-y-3 mb-6 flex-grow">
          <div className="flex items-center gap-3 text-sm text-muted">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <Clock className="w-4 h-4 text-primary shrink-0" />
            <span>{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">{event.isOnline ? "Online Event" : event.venue}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mb-6 space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-muted">
            <span>{event.rsvpCount.toLocaleString()} attending</span>
            <span>{event.capacity.toLocaleString()} cap</span>
          </div>
          <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isFull ? 'bg-red-500' : 'bg-primary'}`}
              style={{ width: `${capacityPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Footer section of card */}
        <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full border border-border bg-primary/10 overflow-hidden shrink-0">
               <img src={event.organizer.avatar} alt={event.organizer.displayName} className="w-full h-full object-cover" />
            </div>
            <span className="text-sm font-medium text-foreground truncate max-w-[120px]">
              {event.organizer.displayName}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-sm font-medium text-primary bg-primary/5 px-3 py-1.5 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
            <span>View</span>
            <span className="text-lg leading-none transform group-hover:translate-x-1 transition-transform">&rarr;</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
