import { DashboardStats as Stats } from "@/lib/types";
import { Calendar, Users, Clock, TrendingUp } from "lucide-react";

interface DashboardStatsProps {
  stats: Stats;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statItems = [
    {
      label: "Total Events",
      value: stats.totalEvents.toLocaleString(),
      icon: Calendar,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Total RSVPs",
      value: stats.totalRSVPs.toLocaleString(),
      icon: Users,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Upcoming Events",
      value: stats.upcomingEvents.toLocaleString(),
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Avg. Attendance",
      value: `${stats.averageAttendance}%`,
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, idx) => (
        <div 
          key={idx}
          className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
            <item.icon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted mb-1">{item.label}</p>
            <p className="text-3xl font-bold text-foreground">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
