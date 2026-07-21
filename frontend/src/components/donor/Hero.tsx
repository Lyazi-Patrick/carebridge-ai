import {
  HeartHandshake,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600">

      {/* Background circles */}

      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-8 py-20">

        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm text-white backdrop-blur">

            <ShieldCheck size={18} />

            Hospital Verified Campaigns

          </div>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight text-white">

            Give Hope.

            <br />

            Save Lives.

          </h1>

          <p className="mt-6 text-xl leading-8 text-teal-100">

            Every fundraising campaign on CareBridge AI has been
            reviewed by medical professionals before becoming
            available for donations.

            Your generosity reaches people who genuinely need help.

          </p>

          <div className="mt-10 flex flex-wrap gap-5">

            <button className="rounded-xl bg-white px-8 py-4 font-bold text-teal-700 transition hover:scale-105">

              Donate Today

            </button>

            <button className="flex items-center gap-2 rounded-xl border border-white/40 px-8 py-4 text-white transition hover:bg-white/10">

              Learn More

              <ArrowRight size={18} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}