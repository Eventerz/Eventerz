"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { Event, CreateEventInput, RSVP } from "@/lib/types";
import { MOCK_EVENTS, MOCK_RSVPS } from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

const STORAGE_KEY = "eventerz-mvp-state";

function loadStoredState() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as {
      events?: Event[];
      rsvps?: RSVP[];
    };

    return {
      events: Array.isArray(parsed.events) && parsed.events.length > 0 ? parsed.events : MOCK_EVENTS,
      rsvps: Array.isArray(parsed.rsvps) && parsed.rsvps.length > 0 ? parsed.rsvps : MOCK_RSVPS,
    };
  } catch (error) {
    console.error("Failed to load Eventerz state:", error);
    return null;
  }
}

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
  const [events, setEvents] = useState<Event[]>(
    () => loadStoredState()?.events ?? MOCK_EVENTS
  );
  const [rsvps, setRsvps] = useState<RSVP[]>(
    () => loadStoredState()?.rsvps ?? MOCK_RSVPS
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ events, rsvps })
      );
    } catch (error) {
      console.error("Failed to persist Eventerz state:", error);
    }
  }, [events, rsvps]);

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
          displayName: `${organizerAddress.slice(0, 4)}...${organizerAddress.slice(-4)}`,
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

  const rsvpToEvent = useCallback((eventId: string, walletAddress: string) => {
    const newRsvp: RSVP = {
      id: `rsvp-${generateId()}`,
      eventId,
      walletAddress,
      timestamp: new Date().toISOString(),
      status: "confirmed",
    };

    setRsvps((prev) => [...prev, newRsvp]);
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
  }, []);

  const cancelRsvp = useCallback((eventId: string, walletAddress: string) => {
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
  }, []);

  const isRsvped = useCallback(
    (eventId: string, walletAddress: string) =>
      rsvps.some(
        (r) =>
          r.eventId === eventId &&
          r.walletAddress === walletAddress &&
          r.status === "confirmed"
      ),
    [rsvps]
  );

  const getEventById = useCallback(
    (id: string) => events.find((event) => event.id === id),
    [events]
  );

  const getEventsByOrganizer = useCallback(
    (walletAddress: string) =>
      events.filter((event) => event.organizer.walletAddress === walletAddress),
    [events]
  );

  const getEventsByAttendee = useCallback(
    (walletAddress: string) =>
      events.filter((event) => event.attendees.includes(walletAddress)),
    [events]
  );

  const searchEvents = useCallback(
    (query: string) => {
      const lower = query.toLowerCase();
      return events.filter(
        (event) =>
          event.title.toLowerCase().includes(lower) ||
          event.description.toLowerCase().includes(lower) ||
          event.venue.toLowerCase().includes(lower) ||
          event.tags.some((tag) => tag.toLowerCase().includes(lower))
      );
    },
    [events]
  );

  const filterByCategory = useCallback(
    (category: string) => {
      if (category === "all") return events;
      return events.filter((event) => event.category === category);
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
