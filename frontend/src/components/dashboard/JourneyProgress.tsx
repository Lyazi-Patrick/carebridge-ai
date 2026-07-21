import {
  CheckCircle2,
  Circle,
} from "lucide-react";

type Props = {
  accountCreated: boolean;
  caseCreated: boolean;
  documentsUploaded: boolean;
  hospitalVerified: boolean;
  adminApproved: boolean;
  publicCampaign: boolean;
};

export function JourneyProgress({
  accountCreated,
  caseCreated,
  documentsUploaded,
  hospitalVerified,
  adminApproved,
  publicCampaign,
}: Props) {
  const steps = [
    {
      label: "Account Created",
      complete: accountCreated,
    },
    {
      label: "Case Created",
      complete: caseCreated,
    },
    {
      label: "Documents Uploaded",
      complete: documentsUploaded,
    },
    {
      label: "Hospital Verification",
      complete: hospitalVerified,
    },
    {
      label: "Admin Approval",
      complete: adminApproved,
    },
    {
      label: "Public Campaign",
      complete: publicCampaign,
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">
        Your Care Journey
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Every fundraising request follows a transparent verification process before it becomes public.
      </p>

      <div className="mt-8 space-y-5">
        {steps.map((step) => (
          <div
            key={step.label}
            className="flex items-center gap-4"
          >
            {step.complete ? (
              <CheckCircle2
                className="text-emerald-600"
                size={24}
              />
            ) : (
              <Circle
                className="text-slate-400"
                size={24}
              />
            )}

            <span
              className={
                step.complete
                  ? "font-medium text-slate-800"
                  : "text-slate-500"
              }
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}