type Props = {
  status: string;
};

export function StatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    DRAFT: "bg-yellow-100 text-yellow-800",
    SUBMITTED: "bg-blue-100 text-blue-800",
    HOSPITAL_VERIFIED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  const labels: Record<string, string> = {
    DRAFT: "Draft",
    SUBMITTED: "Pending Verification",
    HOSPITAL_VERIFIED: "Hospital Verified",
    REJECTED: "Rejected",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] ?? "bg-slate-100 text-slate-700"
      }`}
    >
      {labels[status] ?? status}
    </span>
  );
}