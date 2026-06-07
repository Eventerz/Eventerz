import { SOLANA_ADVANTAGES } from "@/lib/constants";
import { Zap } from "lucide-react";

export default function WhySolana() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-6 flex items-center gap-3">
              Why <span className="text-primary flex items-center gap-2"><Zap className="w-8 h-8 fill-current" /> Solana?</span>
            </h2>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              We chose Solana because events happen in real-time. You should not have to wait minutes or pay high fees just to RSVP or check in.
            </p>
            <div className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
              Powered by Solana
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {SOLANA_ADVANTAGES.map((advantage, idx) => (
              <div
                key={idx}
                className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-colors relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {advantage.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
