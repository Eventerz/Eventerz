// ──────────────────────────────────────────────
// Eventerz — TypeScript Interfaces
// ──────────────────────────────────────────────

export type EventCategory =
  | "conferences"
  | "hackathons"
  | "meetups"
  | "daos"
  | "gaming"
  | "creator";

export interface User {
  walletAddress: string;
  displayName: string;
  avatar: string;
  bio: string;
  joinedAt: string;
  eventsAttended: string[];
  eventsCreated: string[];
  reputationScore: number;
  badges: Badge[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  bannerImage: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  isOnline: boolean;
  category: EventCategory;
  capacity: number;
  rsvpCount: number;
  organizer: EventOrganizer;
  attendees: string[];
  schedule: ScheduleItem[];
  tags: string[];
  createdAt: string;
  isFeatured: boolean;
}

export interface EventOrganizer {
  walletAddress: string;
  displayName: string;
  avatar: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  speaker?: string;
}

export interface RSVP {
  id: string;
  eventId: string;
  walletAddress: string;
  timestamp: string;
  status: "confirmed" | "cancelled" | "waitlisted";
}

export interface Attendance {
  id: string;
  eventId: string;
  walletAddress: string;
  checkedInAt: string;
  verifiedOnChain: boolean;
  txHash?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
  tier: "bronze" | "silver" | "gold" | "diamond";
}

export interface DashboardStats {
  totalEvents: number;
  totalRSVPs: number;
  upcomingEvents: number;
  averageAttendance: number;
}

export interface CreateEventInput {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  venue: string;
  isOnline: boolean;
  category: EventCategory;
  capacity: number;
  bannerImage: string;
  tags: string[];
}

export interface CategoryInfo {
  id: EventCategory;
  label: string;
  icon: string;
  color: string;
  count: number;
}
