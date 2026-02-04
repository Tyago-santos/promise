import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <main className="bg-background">
      <section>
        <div></div>
      </section>
    </main>
  );
}
