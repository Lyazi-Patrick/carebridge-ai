import type { FundraisingCase } from "../../types/api";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

type Props = {
  item: FundraisingCase;
};

export function CaseCard({ item }: Props) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">
          {item.title}
        </h2>

        <StatusBadge status={item.status} />
      </div>

      <p className="mt-3 text-slate-600">
        {item.diagnosis}
      </p>

      <p className="mt-4 line-clamp-3 text-sm text-slate-500">
        {item.story}
      </p>

      <ProgressBar
        raised={Number(item.raisedAmount)}
        target={Number(item.targetAmount)}
      />

      <button
        className="
          mt-6
          w-full
          rounded-lg
          bg-teal-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-teal-700
        "
      >
        View Case
      </button>
    </article>
  );
}