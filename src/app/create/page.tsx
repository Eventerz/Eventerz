import CreateEventForm from "@/components/forms/create-event-form";

export default function CreateEventPage() {
  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-background">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Create an Event</h1>
        <p className="text-lg text-muted">
          Host your next conference, meetup, or hackathon on Eventerz. Manage RSVPs and build your community on-chain.
        </p>
      </div>

      <CreateEventForm />
    </div>
  );
}
