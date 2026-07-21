import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchBar({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative">

      <Search
        className="absolute left-5 top-5 text-slate-400"
        size={22}
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search campaigns, patients or diagnosis..."
        className="
        w-full
        rounded-2xl
        border
        border-slate-200
        bg-white
        py-5
        pl-14
        pr-6
        shadow-lg
        focus:border-teal-500
        focus:outline-none
        "
      />

    </div>
  );
}