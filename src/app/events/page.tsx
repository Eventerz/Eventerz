"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEvents } from "@/providers/event-provider";
import EventGrid from "@/components/events/event-grid";
import CategoryFilter from "@/components/events/category-filter";
import SearchBar from "@/components/events/search-bar";

function EventsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { events } = useEvents();
  
  const categoryParam = searchParams.get("category") || "all";
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === "all") {
      router.push("/events");
    } else {
      router.push(`/events?category=${newCategory}`);
    }
  };

  const filteredEvents = useMemo(() => {
    let result = events;

    // Apply category filter
    if (categoryParam !== "all") {
      result = result.filter(e => e.category === categoryParam);
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(e => 
        e.title.toLowerCase().includes(lowerQuery) ||
        e.description.toLowerCase().includes(lowerQuery) ||
        e.venue.toLowerCase().includes(lowerQuery) ||
        e.tags.some(t => t.toLowerCase().includes(lowerQuery))
      );
    }

    return result;
  }, [events, categoryParam, searchQuery]);

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-10 items-start md:items-center justify-between">
        <div className="w-full md:w-auto overflow-hidden">
          <CategoryFilter 
            selectedCategory={categoryParam} 
            onCategoryChange={handleCategoryChange} 
          />
        </div>
        
        <div className="w-full md:w-auto shrink-0 md:min-w-[320px]">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search events, venues, tags..."
          />
        </div>
      </div>

      <EventGrid 
        events={filteredEvents} 
        emptyMessage={
          searchQuery 
            ? `No events found matching "${searchQuery}" in this category.`
            : "No events found in this category."
        }
      />
    </>
  );
}

export default function EventsPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4">Discover Events</h1>
        <p className="text-lg text-muted">
          Find and RSVP to the best Web3 events happening around the world.
        </p>
      </div>

      <Suspense fallback={<div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>}>
        <EventsContent />
      </Suspense>
    </div>
  );
}
