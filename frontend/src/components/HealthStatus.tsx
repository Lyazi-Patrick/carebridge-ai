import { useEffect, useState, type ReactNode } from "react";
import { CheckCircle2, CircleAlert, LoaderCircle } from "lucide-react";
import { healthResponseSchema, type HealthResponse } from "@carebridge/shared";
import { api } from "../services/api";

type State =
  | { status: "loading" }
  | { status: "connected"; health: HealthResponse }
  | { status: "error" };

export function HealthStatus() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let active = true;

    api.get("/health")
      .then(({ data }) => {
        const health = healthResponseSchema.parse(data);
        if (active) setState({ status: "connected", health });
      })
      .catch(() => {
        if (active) setState({ status: "error" });
      });

    return () => { active = false; };
  }, []);

  if (state.status === "loading") {
    return <StatusCard icon={<LoaderCircle className="animate-spin" />} title="Connecting to CareBridge API" detail="Checking the local backend…" />;
  }

  if (state.status === "error") {
    return <StatusCard icon={<CircleAlert />} title="Backend unavailable" detail="Start the API with npm run dev from the project root." error />;
  }

  return <StatusCard icon={<CheckCircle2 />} title="Frontend and backend connected" detail={`API responded at ${new Date(state.health.timestamp).toLocaleTimeString()}.`} />;
}

function StatusCard({ icon, title, detail, error = false }: { icon: ReactNode; title: string; detail: string; error?: boolean }) {
  return (
    <aside className={`rounded-2xl border p-6 shadow-2xl ${error ? "border-rose-400/30 bg-rose-400/10 text-rose-100" : "border-teal-400/30 bg-teal-400/10 text-teal-50"}`}>
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-950/30">{icon}</div>
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 opacity-80">{detail}</p>
    </aside>
  );
}
