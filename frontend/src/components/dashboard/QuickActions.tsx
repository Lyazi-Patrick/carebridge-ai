import { Link } from "react-router-dom";
import {
  PlusCircle,
  Globe,
  User,
  ArrowRight,
} from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Create Fundraising Case",
      description:
        "Start a new verified healthcare fundraising campaign.",
      icon: PlusCircle,
      link: "/patient/cases/new",
      color: "bg-teal-600",
    },
    {
      title: "Browse Public Campaigns",
      description:
        "See verified campaigns that are open for donations.",
      link: "/campaigns",
      icon: Globe,
      color: "bg-blue-600",
    },
    {
      title: "My Profile",
      description:
        "Manage your personal information and account.",
      link: "/patient/profile",
      icon: User,
      color: "bg-purple-600",
    },
  ];

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-slate-800">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`inline-flex rounded-xl p-4 text-white ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-5 text-xl font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {action.description}
              </p>

              <div className="mt-6 flex items-center gap-2 font-semibold text-teal-700">
                Open

                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}