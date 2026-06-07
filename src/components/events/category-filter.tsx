"use client";

import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        onClick={() => onCategoryChange("all")}
        className={cn(
          "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
          selectedCategory === "all"
            ? "bg-primary text-white shadow-md"
            : "bg-card text-muted hover:bg-border hover:text-foreground border border-border"
        )}
      >
        All Events
      </button>
      
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
            selectedCategory === category.id
              ? "bg-primary text-white shadow-md border-primary"
              : "bg-card text-muted hover:bg-border hover:text-foreground border-border"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
