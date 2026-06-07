import { FEATURES } from "@/lib/constants";
import { Wallet, CheckCircle2, Award, Search, LayoutDashboard, QrCode } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Wallet,
  CheckCircle2,
  Award,
  Search,
  LayoutDashboard,
  QrCode,
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            The Eventerz Solution
          </h2>
          <p className="text-lg text-muted">
            Everything you need to host and attend events, powered by the speed and security of Solana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = iconMap[feature.icon];
            return (
              <div 
                key={idx} 
                className="group bg-card p-8 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                    {Icon && <Icon className="w-6 h-6" />}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
