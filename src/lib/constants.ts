// ──────────────────────────────────────────────
// Eventerz — Constants
// ──────────────────────────────────────────────

import { CategoryInfo } from "./types";

export const APP_NAME = "Eventerz";
export const APP_TAGLINE = "Everything is On-chain, Why Not Your Events?";
export const APP_DESCRIPTION =
  "A wallet-native event platform built on Solana. Discover events, RSVP on-chain, build your reputation.";

export const SIGN_MESSAGE = "Welcome to Eventerz";

export const SOLANA_NETWORK = "devnet";
export const SOLANA_RPC_URL = "https://api.devnet.solana.com";

export const NAV_LINKS = [
  { label: "Events", href: "/events" },
  { label: "Create", href: "/create" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Profile", href: "/profile" },
] as const;

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "conferences",
    label: "Conferences",
    icon: "Mic2",
    color: "#6D5DFC",
    count: 12,
  },
  {
    id: "hackathons",
    label: "Hackathons",
    icon: "Code2",
    color: "#14B8A6",
    count: 8,
  },
  {
    id: "meetups",
    label: "Meetups",
    icon: "Users",
    color: "#F59E0B",
    count: 24,
  },
  {
    id: "daos",
    label: "DAOs",
    icon: "Vote",
    color: "#EF4444",
    count: 6,
  },
  {
    id: "gaming",
    label: "Gaming",
    icon: "Gamepad2",
    color: "#8B5CF6",
    count: 15,
  },
  {
    id: "creator",
    label: "Creator Events",
    icon: "Palette",
    color: "#EC4899",
    count: 10,
  },
];

export const FAQ_ITEMS = [
  {
    question: "What is Eventerz?",
    answer:
      "Eventerz is a wallet-native event platform built on Solana. Connect your wallet to discover events, RSVP, manage attendance, and build your on-chain reputation.",
  },
  {
    question: "Do I need a Solana wallet to use Eventerz?",
    answer:
      "Yes, you'll need a Solana wallet like Phantom, Backpack, or Solflare. Connecting your wallet is how you authenticate and interact with the platform — no email or password required.",
  },
  {
    question: "Is it free to RSVP for events?",
    answer:
      "RSVPs on Eventerz are free during our MVP phase. In the future, organizers will be able to set ticket prices in SOL or SPL tokens.",
  },
  {
    question: "How does on-chain attendance work?",
    answer:
      "When you attend an event and check in via QR code, your attendance is recorded on the Solana blockchain. This builds your verifiable reputation as a community member.",
  },
  {
    question: "Can I create my own events?",
    answer:
      "Absolutely! Any wallet-connected user can create events. Just fill out the event form and your event will be live for the community to discover.",
  },
  {
    question: "What wallets are supported?",
    answer:
      "We currently support Phantom, Backpack, and Solflare. More wallets will be added soon.",
  },
  {
    question: "Is my data stored on-chain?",
    answer:
      "Currently, event data is stored locally for the MVP. We're building toward full on-chain storage using Arweave/IPFS for data and Solana for attestations.",
  },
];

export const FEATURES = [
  {
    title: "Wallet-First Identity",
    description:
      "No emails. No passwords. Your Solana wallet is your identity. Connect once and you're in.",
    icon: "Wallet",
  },
  {
    title: "On-Chain RSVPs",
    description:
      "Every RSVP is a verifiable commitment. No more ghost attendees or fake signups.",
    icon: "CheckCircle2",
  },
  {
    title: "Community Reputation",
    description:
      "Build your on-chain attendance record. Earn badges. Prove your community involvement.",
    icon: "Award",
  },
  {
    title: "Event Discovery",
    description:
      "Find conferences, hackathons, meetups, and more. Filter by category, date, or popularity.",
    icon: "Search",
  },
  {
    title: "Organizer Tools",
    description:
      "Create events, manage attendees, view analytics. Everything you need to run successful events.",
    icon: "LayoutDashboard",
  },
  {
    title: "QR Check-In",
    description:
      "Verify attendance in person with QR codes. Fast, frictionless, and fraud-proof.",
    icon: "QrCode",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Connect Wallet",
    description: "Link your Solana wallet — Phantom, Backpack, or Solflare.",
    icon: "Wallet",
  },
  {
    step: 2,
    title: "Discover Events",
    description:
      "Browse conferences, hackathons, meetups, and community events.",
    icon: "Globe",
  },
  {
    step: 3,
    title: "RSVP On-Chain",
    description: "Reserve your spot with a verifiable on-chain commitment.",
    icon: "MousePointerClick",
  },
  {
    step: 4,
    title: "Attend & Earn",
    description:
      "Check in at events and build your reputation with attendance badges.",
    icon: "Trophy",
  },
];

export const SOLANA_ADVANTAGES = [
  {
    title: "Sub-second Finality",
    description:
      "Transactions confirm in under a second. RSVP and check-in are instant.",
  },
  {
    title: "Near-zero Fees",
    description:
      "Solana transactions cost fractions of a cent. No more expensive gas fees.",
  },
  {
    title: "Scalable Infrastructure",
    description:
      "Built to handle thousands of events and millions of attendees without breaking a sweat.",
  },
  {
    title: "Rich Ecosystem",
    description:
      "Tap into the Solana ecosystem — NFT tickets, SPL token gating, DAO governance, and more.",
  },
];
