import {
  ShieldCheck,
  HeartHandshake,
  DollarSign,
  User,
} from "lucide-react";

import type { FundraisingCase } from "../../types/api";

type Props = {
  item: FundraisingCase;
  onDonate: (item: FundraisingCase) => void;
};

export function CampaignCard({
  item,
  onDonate,
}: Props) {

  const goal = Number(item.targetAmount);
  const raised = Number(item.raisedAmount);

  const progress =
    goal === 0
      ? 0
      : Math.min(100, (raised / goal) * 100);

  return (

    <div
      className="
      group
      overflow-hidden
      rounded-3xl
      bg-white
      shadow-lg
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      "
    >

      {/* Banner */}

      <div className="relative h-44 bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600">

        <div className="absolute right-5 top-5">

          <span
            className="
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            text-teal-700
            "
          >
            <ShieldCheck size={16} />
            Verified
          </span>

        </div>

        <div className="absolute bottom-6 left-6">

          <h2 className="text-3xl font-bold text-white">

            {item.title}

          </h2>

        </div>

      </div>

      {/* Content */}

      <div className="space-y-6 p-7">

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-slate-100 p-3">

            <User size={18} />

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Patient
            </p>

            <h3 className="mt-1 text-xl font-bold text-slate-900">
              {item.patient?.user?.fullName || "Patient Name Unavailable"}
            </h3>

          </div>

        </div>

        <div>

          <p className="text-sm font-semibold text-slate-500">

            Diagnosis

          </p>

          <p className="mt-2 text-slate-700">

            {item.diagnosis}

          </p>

        </div>

        <div>

          <p className="text-sm font-semibold text-slate-500">

            AI Summary

          </p>

          <p className="mt-2 leading-7 text-slate-600">

            {item.aiSummary}

          </p>

        </div>

        {/* Progress */}

       <div className="mt-6">

          <div className="flex items-end justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Raised
              </p>

              <p className="text-2xl font-bold text-teal-700">
                ${Number(item.raisedAmount).toLocaleString()}
              </p>

            </div>


            <div className="text-right">

              <p className="text-sm text-slate-500">
                Goal
              </p>

              <p className="font-semibold text-slate-800">
                ${Number(item.targetAmount).toLocaleString()}
              </p>

            </div>


          </div>


          <div className="mt-4 h-3 rounded-full bg-slate-200">

            <div
              className="
              h-3
              rounded-full
              bg-teal-600
              "
              style={{
                width:`${progress}%`
              }}
            />

          </div>


          <p className="mt-2 text-sm text-slate-500">

            {Math.round(progress)}% funded

          </p>


        </div>
        {/* Footer */}

        <div className="flex gap-4">

          <button
            onClick={() => onDonate(item)}
            className="
            flex-1
            rounded-xl
            bg-teal-600
            py-3
            font-semibold
            text-white
            transition
            hover:bg-teal-700
            "
          >
            <span className="flex items-center justify-center gap-2">

              <HeartHandshake size={18} />

              Donate

            </span>

          </button>

          <button
            className="
            rounded-xl
            border
            border-slate-300
            px-5
            transition
            hover:bg-slate-100
            text-slate-900
            "
          >
            <DollarSign />
          </button>

        </div>

      </div>

    </div>

  );
}