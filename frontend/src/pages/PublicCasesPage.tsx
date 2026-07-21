import { useEffect, useState } from "react";
import { api } from "../services/api";
import type { FundraisingCase } from "../types/api";
import { CaseCard } from "../components/public/CaseCard";

export function PublicCasesPage() {
  const [cases, setCases] = useState<FundraisingCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/public/cases")
      .then(({ data }) => {
        setCases(data.cases);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading verified cases...
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-2 text-4xl font-bold">
        Verified Fundraising Cases
      </h1>

      <p className="mb-8 text-slate-600">
        Help patients whose medical needs have
        been reviewed by partner hospitals.
      </p>

      {cases.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center text-slate-500">
          No verified cases are available yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item) => (
            <CaseCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}