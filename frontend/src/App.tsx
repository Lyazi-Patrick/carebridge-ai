import { HeartPulse } from "lucide-react";
import { motion } from "framer-motion";
import { HealthStatus } from "./components/HealthStatus";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PatientDashboard } from "./pages/PatientDashboard";
import { CaseEditor } from "./pages/CaseEditor";

export function App() {
  return <Routes><Route path="/" element={
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-100 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-16 flex items-center gap-3" aria-label="Main navigation">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400 text-slate-950">
            <HeartPulse aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">CareBridge AI</span>
        </nav>

        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:items-end"
        >
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">Healthcare support, made trustworthy</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">Connecting medical need with verified care.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              CareBridge AI helps patients share verified treatment needs and gives donors a transparent way to help.
            </p>
          </div>
          <HealthStatus />
        </motion.section>
      </div>
    </main>
  } /><Route path="/login" element={<AuthPage mode="login" />} /><Route path="/register" element={<AuthPage mode="register" />} /><Route element={<ProtectedRoute />}><Route path="/patient" element={<PatientDashboard />} /><Route path="/patient/cases/new" element={<CaseEditor />} /><Route path="/patient/cases/:caseId" element={<CaseEditor />} /></Route></Routes>;
}
