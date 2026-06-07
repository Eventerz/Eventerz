import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { Mic2, Code2, Users, Vote, Gamepad2, Palette } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Mic2,
  Code2,
  Users,
  Vote,
  Gamepad2,
  Palette,
};

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
              Explore Categories
            </h2>
            <p className="text-lg text-muted">
              Find the perfect event for your interests.
            </p>
          </div>
          <Link 
            href="/events"
            className="text-primary font-medium hover:text-primary-dark transition-colors"
          >
            View all categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORIES.map((category) => {
            const Icon = iconMap[category.icon];
            return (
              <Link 
                key={category.id} 
                href={`/events?category=${category.id}`}
                className="group bg-white p-6 rounded-2xl border border-border hover:shadow-md transition-all duration-300"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1"
                  style={{ backgroundColor: `${category.color}15`, color: category.color }}
                >
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {category.label}
                </h3>
                <p className="text-sm text-muted">
                  {category.count} events
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
