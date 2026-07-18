import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { api } from "../services/api";
import type { AuthUser } from "../types/api";

type AuthContextValue = { user: AuthUser | null; loading: boolean; signIn: (token: string, user: AuthUser) => void; signOut: () => void };
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("carebridge_token");
    if (!token) { setLoading(false); return; }
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    api.get("/auth/me").then(({ data }) => setUser(data.user)).catch(() => localStorage.removeItem("carebridge_token")).finally(() => setLoading(false));
  }, []);
  const signIn = (token: string, nextUser: AuthUser) => { localStorage.setItem("carebridge_token", token); api.defaults.headers.common.Authorization = `Bearer ${token}`; setUser(nextUser); };
  const signOut = () => { localStorage.removeItem("carebridge_token"); delete api.defaults.headers.common.Authorization; setUser(null); };
  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error("useAuth must be used within AuthProvider"); return context; }
