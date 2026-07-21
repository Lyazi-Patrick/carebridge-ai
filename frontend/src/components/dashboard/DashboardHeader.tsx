import { HeartPulse, LogOut } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export function DashboardHeader() {
  const { user, signOut } = useAuth();

  return (
    <header className="mb-10 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-teal-600 to-cyan-600 p-8 text-white shadow-lg md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="rounded-2xl bg-white/20 p-4">
          <HeartPulse size={34} />
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-teal-100">
            CareBridge AI
          </p>

          <h1 className="text-3xl font-bold">
            Welcome back, {user?.fullName} 👋
          </h1>

          <p className="mt-2 text-teal-100">
            Manage your healthcare fundraising campaigns from one secure
            dashboard.
          </p>
        </div>
      </div>

      <button
        onClick={signOut}
        className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-teal-700 transition hover:bg-slate-100"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </header>
  );
}