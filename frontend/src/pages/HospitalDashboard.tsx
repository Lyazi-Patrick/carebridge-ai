import { useEffect, useState } from "react";
import {
  CheckCircle2,
  XCircle,
  FileText,
  User,
  HeartPulse,
  DollarSign,
  ClipboardCheck,
  Clock,
} from "lucide-react";

import { api } from "../services/api";
import type { FundraisingCase } from "../types/api";
import { HospitalHeader } from "../components/hospital/HospitalHeader";

export function HospitalDashboard() {
  const [cases, setCases] = useState<FundraisingCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadCases() {
    try {
      setLoading(true);

      const { data } = await api.get("/cases/hospital/pending");

      setCases(data.cases);
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ??
          "Failed to load pending cases."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCases();
  }, []);

  async function verifyCase(id: string) {
    try {
      await api.patch(`/cases/hospital/${id}/verify`);
      loadCases();
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ??
          "Verification failed."
      );
    }
  }

  async function rejectCase(id: string) {
    try {
      await api.patch(`/cases/hospital/${id}/reject`);
      loadCases();
    } catch (err: any) {
      setError(
        err.response?.data?.error?.message ??
          "Rejection failed."
      );
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <div className="text-lg font-semibold text-slate-700">
          Loading verification dashboard...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">

      {/* Header */}

      <HospitalHeader />

      {/* Statistics */}

      <div className="mx-auto mt-8 grid max-w-7xl gap-6 px-8 md:grid-cols-3">

        <StatCard
          title="Pending Cases"
          value={cases.length}
          icon={<Clock size={28} />}
          color="bg-amber-500"
        />

        <StatCard
          title="Documents"
          value={cases.reduce(
            (sum, c) => sum + c.documents.length,
            0
          )}
          icon={<FileText size={28} />}
          color="bg-blue-500"
        />

        <StatCard
          title="Ready for Review"
          value={cases.length}
          icon={<CheckCircle2 size={28} />}
          color="bg-green-600"
        />
        <StatCard
          title="Approved Cases"
          value={0}
          icon={<CheckCircle2 size={28}/>}
          color="bg-teal-600"
        />

      </div>

      <div className="mx-auto max-w-7xl px-8 py-8">

        {error && (

          <div className="mb-6 rounded-xl bg-red-100 p-4 text-red-700">
            {error}
          </div>

        )}

        {cases.length === 0 && (

          <div className="rounded-xl bg-white p-10 text-center shadow">

            <CheckCircle2
              size={60}
              className="mx-auto text-green-600"
            />

            <h2 className="mt-4 text-2xl font-bold text-slate-800">
              No Pending Cases
            </h2>

            <p className="mt-2 text-slate-500">
              Every submitted request has already been reviewed.
            </p>

          </div>

        )}

        <div className="space-y-8">

          {cases.map((item) => (

            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow-lg"
            >

              {/* Card Header */}

              <div className="flex items-center justify-between bg-slate-50 px-6 py-4 border-b">

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    {item.title}
                  </h2>

                  <span className="
                  inline-flex
                  items-center
                  rounded-full
                  bg-amber-100
                  px-3
                  py-1
                  text-sm
                  font-semibold
                  text-amber-700
                  ">

                  <Clock size={14} className="mr-1"/>

                  Awaiting Review

                  </span>

                </div>

                <HeartPulse
                  size={34}
                  className="text-red-500"
                />

              </div>

              <div className="grid gap-8 p-6 lg:grid-cols-2">

                <div className="space-y-4">

                  <InfoRow
                    icon={<User size={18} />}
                    label="Patient"
                    value={
                      item.patient?.user?.fullName ??
                      "Unknown"
                    }
                  />

                  <InfoRow
                    icon={<HeartPulse size={18} />}
                    label="Diagnosis"
                    value={item.diagnosis}
                  />

                  <InfoRow
                    icon={<ClipboardCheck size={18} />}
                    label="Treatment"
                    value={item.treatmentPlan}
                  />

                  <InfoRow
                    icon={<DollarSign size={18} />}
                    label="Funding Goal"
                    value={`$${Number(
                      item.targetAmount
                    ).toLocaleString()}`}
                  />

                </div>

                <div>

                  <div className="mb-3 flex items-center justify-between">

                  <h3 className="font-semibold text-slate-700">
                  Medical Documents
                  </h3>


                  <span className="
                  rounded-full
                  bg-teal-100
                  px-3
                  py-1
                  text-sm
                  font-semibold
                  text-teal-700
                  ">

                  {item.documents.length} Files

                  </span>


                  </div>

                  {item.documents.length ? (

                    <div className="space-y-2">

                      {item.documents.map((doc) => (

                        <a
                          key={doc.id}
                          href={doc.secureUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 rounded-lg border bg-slate-50 p-3 hover:bg-teal-50"
                        >

                          <FileText
                            size={18}
                            className="text-teal-600"
                          />

                          <span className="text-sm text-slate-700">
                            {doc.fileName}
                          </span>

                        </a>

                      ))}

                    </div>

                  ) : (

                    <p className="text-slate-500">
                      No documents uploaded.
                    </p>

                  )}

                </div>

              </div>

              <div className="flex gap-4 border-t bg-slate-50 px-6 py-5">

                <button
                  onClick={() => verifyCase(item.id)}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                >
                  <CheckCircle2 size={18} />
                  Verify Case
                </button>

                <button
                  onClick={() => rejectCase(item.id)}
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                >
                  <XCircle size={18} />
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-5xl font-extrabold tracking-tight text-slate-900">
            {value}
          </h2>

        </div>

        <div
          className={`${color} flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-md`}
        >
          {icon}
        </div>

      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-teal-600">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}