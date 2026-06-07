"use client";

// ──────────────────────────────────────────────
// Eventerz — Event Context Provider
// ──────────────────────────────────────────────

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { Event, CreateEventInput, RSVP } from "@/lib/types";
import { MOCK_EVENTS, MOCK_RSVPS } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface EventContextValue {
  events: Event[];
  rsvps: RSVP[];
  createEvent: (input: CreateEventInput, organizerAddress: string) => Event;
  rsvpToEvent: (eventId: string, walletAddress: string) => void;
  cancelRsvp: (eventId: string, walletAddress: string) => void;
  isRsvped: (eventId: string, walletAddress: string) => boolean;
  getEventById: (id: string) => Event | undefined;
  getEventsByOrganizer: (walletAddress: string) => Event[];
  getEventsByAttendee: (walletAddress: string) => Event[];
  searchEvents: (query: string) => Event[];
  filterByCategory: (category: string) => Event[];
}

const EventContext = createContext<EventContextValue | null>(null);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [rsvps, setRsvps] = useState<RSVP[]>(MOCK_RSVPS);

  const createEvent = useCallback(
    (input: CreateEventInput, organizerAddress: string): Event => {
      const newEvent: Event = {
        id: `evt-${generateId()}`,
        title: input.title,
        description: input.description,
        bannerImage:
          input.bannerImage ||
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
        date: input.date,
        startTime: input.startTime,
        endTime: input.endTime,
        venue: input.venue,
        isOnline: input.isOnline,
        category: input.category,
        capacity: input.capacity,
        rsvpCount: 0,
        organizer: {
          walletAddress: organizerAddress,
          displayName: organizerAddress.slice(0, 8) + "...",
          avatar: `https://api.dicebear.com/9.x/identicon/svg?seed=${organizerAddress}`,
        },
        attendees: [],
        schedule: [],
        tags: input.tags || [],
        createdAt: new Date().toISOString().split("T")[0],
        isFeatured: false,
      };

      setEvents((prev) => [newEvent, ...prev]);
      return newEvent;
    },
    []
  );

  const rsvpToEvent = useCallback(
    (eventId: string, walletAddress: string) => {
      // Add RSVP
      const newRsvp: RSVP = {
        id: `rsvp-${generateId()}`,
        eventId,
        walletAddress,
        timestamp: new Date().toISOString(),
        status: "confirmed",
      };
      setRsvps((prev) => [...prev, newRsvp]);

      // Update event
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId
            ? {
                ...event,
                rsvpCount: event.rsvpCount + 1,
                attendees: [...event.attendees, walletAddress],
              }
            : event
        )
      );
    },
    []
  );

  const cancelRsvp = useCallback(
    (eventId: string, walletAddress: string) => {
      setRsvps((prev) =>
        prev.filter(
          (r) => !(r.eventId === eventId && r.walletAddress === walletAddress)
        )
      );

      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId
            ? {
                ...event,
                rsvpCount: Math.max(0, event.rsvpCount - 1),
                attendees: event.attendees.filter((a) => a !== walletAddress),
              }
            : event
        )
      );
    },
    []
  );

  const isRsvped = useCallback(
    (eventId: string, walletAddress: string) => {
      return rsvps.some(
        (r) =>
          r.eventId === eventId &&
          r.walletAddress === walletAddress &&
          r.status === "confirmed"
      );
    },
    [rsvps]
  );

  const getEventById = useCallback(
    (id: string) => {
      return events.find((e) => e.id === id);
    },
    [events]
  );

  const getEventsByOrganizer = useCallback(
    (walletAddress: string) => {
      return events.filter(
        (e) => e.organizer.walletAddress === walletAddress
      );
    },
    [events]
  );

  const getEventsByAttendee = useCallback(
    (walletAddress: string) => {
      return events.filter((e) => e.attendees.includes(walletAddress));
    },
    [events]
  );

  const searchEvents = useCallback(
    (query: string) => {
      const lower = query.toLowerCase();
      return events.filter(
        (e) =>
          e.title.toLowerCase().includes(lower) ||
          e.description.toLowerCase().includes(lower) ||
          e.venue.toLowerCase().includes(lower) ||
          e.tags.some((t) => t.toLowerCase().includes(lower))
      );
    },
    [events]
  );

  const filterByCategory = useCallback(
    (category: string) => {
      if (category === "all") return events;
      return events.filter((e) => e.category === category);
    },
    [events]
  );

  return (
    <EventContext.Provider
      value={{
        events,
        rsvps,
        createEvent,
        rsvpToEvent,
        cancelRsvp,
        isRsvped,
        getEventById,
        getEventsByOrganizer,
        getEventsByAttendee,
        searchEvents,
        filterByCategory,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider");
  }
  return context;
}
