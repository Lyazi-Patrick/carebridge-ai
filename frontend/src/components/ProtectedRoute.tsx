import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <p className="p-8 text-slate-600">Loading your account…</p>;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "PATIENT") return <p className="p-8 text-slate-700">Your role dashboard will be available in a later phase.</p>;
  return <Outlet />;
}
