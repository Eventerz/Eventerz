import { Users, ShieldBan, Building2 } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    {
      icon: Users,
      title: "Fake RSVPs & Drop-offs",
      description: "Traditional platforms suffer from massive no-show rates. Free tickets mean zero commitment.",
    },
    {
      icon: ShieldBan,
      title: "No Verifiable Reputation",
      description: "Attending 100 events gives you the same standing as someone who just created an account today.",
    },
    {
      icon: Building2,
      title: "Centralized Silos",
      description: "Your event data, connections, and history are locked inside walled gardens. You don't own your network.",
    },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Events Are Broken
          </h2>
          <p className="text-lg text-muted">
            The current standard for event platforms relies on weak identities and zero accountability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center mb-6">
                <problem.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{problem.title}</h3>
              <p className="text-muted leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
