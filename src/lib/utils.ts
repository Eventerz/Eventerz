// ──────────────────────────────────────────────
// Eventerz — Utility Functions
// ──────────────────────────────────────────────

import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Shorten a Solana wallet address for display.
 * e.g., "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU" → "7xKX...AsU"
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Format a date string for display.
 * e.g., "2024-12-15" → "Dec 15, 2024"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format time for display.
 * e.g., "14:00" → "2:00 PM"
 */
export function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":").map(Number);
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

/**
 * Format a date to relative time (e.g., "in 3 days", "2 hours ago").
 */
export function getRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffDays > 30) {
    const months = Math.floor(diffDays / 30);
    return `in ${months} month${months > 1 ? "s" : ""}`;
  }
  if (diffDays > 0) return `in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
  if (diffHours > 0) return `in ${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  if (diffDays < -30) {
    const months = Math.abs(Math.floor(diffDays / 30));
    return `${months} month${months > 1 ? "s" : ""} ago`;
  }
  if (diffDays < 0)
    return `${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""} ago`;
  return "today";
}

/**
 * Generate a deterministic avatar URL from a wallet address.
 */
export function getAvatarUrl(address: string): string {
  return `https://api.dicebear.com/9.x/identicon/svg?seed=${address}`;
}

/**
 * Generate a unique ID (for mock purposes).
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get category color by ID.
 */
export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    conferences: "#6D5DFC",
    hackathons: "#14B8A6",
    meetups: "#F59E0B",
    daos: "#EF4444",
    gaming: "#8B5CF6",
    creator: "#EC4899",
  };
  return colors[category] || "#6D5DFC";
}

/**
 * Get category label by ID.
 */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    conferences: "Conferences",
    hackathons: "Hackathons",
    meetups: "Meetups",
    daos: "DAOs",
    gaming: "Gaming",
    creator: "Creator Events",
  };
  return labels[category] || category;
}

/**
 * Calculate capacity percentage.
 */
export function getCapacityPercentage(rsvpCount: number, capacity: number): number {
  if (capacity <= 0) return 0;
  return Math.min(Math.round((rsvpCount / capacity) * 100), 100);
}
