"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEvents } from "@/providers/event-provider";
import { CreateEventInput } from "@/lib/types";
import { CATEGORIES } from "@/lib/constants";
import { Calendar, Clock, MapPin, Image as ImageIcon, Tag, AlignLeft, Type, Users } from "lucide-react";

export default function CreateEventForm() {
  const router = useRouter();
  const { publicKey } = useWallet();
  const { createEvent } = useEvents();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateEventInput>({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    venue: "",
    isOnline: false,
    category: "conferences",
    capacity: 100,
    bannerImage: "",
    tags: [],
  });

  const [tagsInput, setTagsInput] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (name === "capacity") {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    const tagsArray = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!publicKey) return;

    try {
      setIsLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newEvent = createEvent(formData, publicKey.toBase58());
      router.push(`/events/${newEvent.id}`);
    } catch (error) {
      console.error("Failed to create event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!publicKey) {
    return (
      <div className="bg-white p-12 rounded-2xl border border-border text-center shadow-sm max-w-2xl mx-auto mt-12">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Wallet Required</h2>
        <p className="text-muted mb-8">
          You must connect your Solana wallet to create an event. This ensures authenticity and allows you to manage attendees on-chain.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8 pb-20">
      <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border">Basic Information</h2>
        
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Type className="w-4 h-4 text-muted" /> Event Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Solana Hacker House NYC"
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            />
          </div>

          {/* Category & Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4 text-muted" /> Category *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow bg-white"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-muted" /> Max Capacity *
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-muted" /> Description *
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={5}
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell people what your event is about..."
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow resize-y"
            ></textarea>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border">Date & Location</h2>
        
        <div className="space-y-6">
          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted" /> Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
              />
            </div>
            
            <div>
              <label htmlFor="startTime" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted" /> Start Time *
              </label>
              <input
                type="time"
                id="startTime"
                name="startTime"
                required
                value={formData.startTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
              />
            </div>
            
            <div>
              <label htmlFor="endTime" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted" /> End Time *
              </label>
              <input
                type="time"
                id="endTime"
                name="endTime"
                required
                value={formData.endTime}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
              />
            </div>
          </div>

          {/* Venue */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="venue" className="block text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted" /> Venue Location *
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isOnline"
                  checked={formData.isOnline}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded focus:ring-primary border-gray-300"
                />
                <span className="text-sm text-muted">This is an online event</span>
              </label>
            </div>
            <input
              type="text"
              id="venue"
              name="venue"
              required
              value={formData.venue}
              onChange={handleChange}
              placeholder={formData.isOnline ? "e.g. Zoom Link or 'Online'" : "e.g. 123 Main St, New York, NY"}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
        <h2 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border">Media & Tags</h2>
        
        <div className="space-y-6">
          {/* Banner Image URL */}
          <div>
            <label htmlFor="bannerImage" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-muted" /> Banner Image URL
            </label>
            <input
              type="url"
              id="bannerImage"
              name="bannerImage"
              value={formData.bannerImage}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            />
            <p className="text-xs text-muted mt-2">Leave blank to use a default placeholder image.</p>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted" /> Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tagsInput}
              onChange={handleTagsChange}
              placeholder="solana, defi, networking (comma separated)"
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
            />
            
            {/* Tag preview */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-card border border-border rounded-lg text-sm text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 text-muted hover:text-foreground font-medium rounded-xl"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors shadow-sm disabled:opacity-70 flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Creating...
            </>
          ) : (
            "Create Event"
          )}
        </button>
      </div>
    </form>
  );
}
