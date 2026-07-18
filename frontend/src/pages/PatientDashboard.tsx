import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import type { FundraisingCase } from "../types/api";

export function PatientDashboard() {
  const { user, signOut } = useAuth(); const [cases, setCases] = useState<FundraisingCase[]>([]); const [error, setError] = useState("");
  useEffect(() => { api.get("/cases/mine").then(({ data }) => setCases(data.cases)).catch((err) => setError(err.response?.data?.error?.message ?? "Could not load your cases.")); }, []);
  return <main className="min-h-screen bg-slate-50 p-6 text-slate-900"><header className="mx-auto flex max-w-5xl items-center justify-between"><div><p className="text-sm font-semibold text-teal-700">CareBridge AI</p><h1 className="text-2xl font-bold">Hello, {user?.fullName}</h1></div><button className="text-sm font-semibold text-slate-600" onClick={signOut}>Sign out</button></header><section className="mx-auto mt-10 max-w-5xl"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold">Your fundraising cases</h2><p className="mt-1 text-slate-600">Create and manage medically verified support requests.</p></div><Link className="rounded-lg bg-teal-700 px-4 py-3 text-sm font-semibold text-white" to="/patient/cases/new">Create a case</Link></div>{error && <p className="mt-5 text-rose-700">{error}</p>}<div className="mt-6 grid gap-4">{cases.length ? cases.map((item) => <Link key={item.id} to={`/patient/cases/${item.id}`} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex justify-between gap-4"><div><h3 className="font-semibold">{item.title}</h3><p className="mt-1 text-sm text-slate-600">{item.diagnosis}</p></div><span className="h-fit rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">{item.status.replace("_", " ")}</span></div></Link>) : <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-slate-600">You have not created a fundraising case yet.</div>}</div></section></main>;
}
