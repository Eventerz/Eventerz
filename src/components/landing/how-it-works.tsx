import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { Wallet, Globe, MousePointerClick, Trophy } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Wallet,
  Globe,
  MousePointerClick,
  Trophy,
};

export default function HowItWorks() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted">
            Four simple steps to join the future of events.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border-light -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const Icon = iconMap[step.icon];
              return (
                <div key={idx} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-border shadow-sm flex items-center justify-center mb-6 relative group-hover:border-primary/50 transition-colors">
                    {Icon && <Icon className="w-7 h-7 text-primary" />}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center border-4 border-card">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted leading-relaxed max-w-[250px]">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
