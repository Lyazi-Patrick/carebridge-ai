import {
  FileText,
  Clock3,
  CheckCircle2,
  Globe,
} from "lucide-react";

type Props = {
  totalCases: number;
  drafts: number;
  submitted: number;
  publicCases: number;
};

export function StatsCards({
  totalCases,
  drafts,
  submitted,
  publicCases,
}: Props) {
  const cards = [
    {
      title: "Total Cases",
      value: totalCases,
      icon: FileText,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Drafts",
      value: drafts,
      icon: Clock3,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      title: "Submitted",
      value: submitted,
      icon: CheckCircle2,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Public",
      value: publicCases,
      icon: Globe,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-4xl font-bold text-slate-800">
                  {card.value}
                </h2>
              </div>

              <div
                className={`rounded-xl p-3 ${card.bg}`}
              >
                <Icon
                  className={card.color}
                  size={28}
                />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}