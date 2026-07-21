import {
  Heart,
  Users,
  DollarSign,
  HeartHandshake,
} from "lucide-react";

type Props = {
  campaigns: number;
  patients: number;
  goal: number;
  raised: number;
};

export function StatsCards({
  campaigns,
  patients,
  goal,
  raised,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      <Card
        title="Campaigns"
        value={campaigns}
        icon={<Heart size={28} />}
      />

      <Card
        title="Patients"
        value={patients}
        icon={<Users size={28} />}
      />

      <Card
        title="Funding Goal"
        value={`$${goal.toLocaleString()}`}
        icon={<DollarSign size={28} />}
      />

      <Card
        title="Raised"
        value={`$${raised.toLocaleString()}`}
        icon={<HeartHandshake size={28} />}
      />

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div
      className="
      rounded-3xl
      bg-white
      p-7
      shadow-lg
      transition-all
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >

      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">

        {icon}

      </div>

      <p className="text-slate-500">

        {title}

      </p>

      <h2 className="mt-3 text-4xl font-bold text-slate-800">

        {value}

      </h2>

    </div>
  );
}