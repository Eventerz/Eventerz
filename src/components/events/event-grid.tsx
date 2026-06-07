import { Event } from "@/lib/types";
import EventCard from "./event-card";
import { CalendarX2 } from "lucide-react";

interface EventGridProps {
  events: Event[];
  emptyMessage?: string;
}

export default function EventGrid({ events, emptyMessage = "No events found." }: EventGridProps) {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-card rounded-2xl border border-border border-dashed">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
          <CalendarX2 className="w-8 h-8 text-muted" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">No events</h3>
        <p className="text-muted max-w-md">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
