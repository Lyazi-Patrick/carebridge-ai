type Props = {
  raised: number;
  target: number;
};

export function ProgressBar({ raised, target }: Props) {
  const percentage =
    target > 0
      ? Math.min((raised / target) * 100, 100)
      : 0;

  return (
    <div className="mt-4">
      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-teal-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-slate-600">
        ${raised.toLocaleString()} raised of ${target.toLocaleString()}
      </p>
    </div>
  );
}