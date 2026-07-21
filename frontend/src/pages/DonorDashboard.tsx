import { useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import type { FundraisingCase } from "../types/api";
import { dummyCampaigns } from "../components/donor/DummyCampaigns";
import { DonationModal } from "../components/DonationModal";
import { DonorHeader } from "../components/donor/DonorHeader";
import { Hero } from "../components/donor/Hero";
import { StatsCards } from "../components/donor/StatsCards";
import { SearchBar } from "../components/donor/SearchBar";
import { CampaignCard } from "../components/donor/CampaignCard";
export function DonorDashboard() {
  const [cases, setCases] = useState<FundraisingCase[]>(dummyCampaigns);
  
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCase, setSelectedCase] =
    useState<FundraisingCase | null>(null);
  const demoCases: FundraisingCase[] = dummyCampaigns;

  async function loadCases() {
    try {

    const { data } = await api.get("/cases/public");
    

    if (data.cases && data.cases.length > 0) {

      setCases(data.cases);

    } else {

      setCases(dummyCampaigns);

    }


  } catch (error) {

    console.log("API FAILED");
    console.log(error);

    setCases(dummyCampaigns);

  } finally {

    setLoading(false);

  }
  }

  useEffect(() => {
    loadCases();
  }, []);

  const displayCases =
  cases.length > 0 ? cases : demoCases;
  const filteredCases = useMemo(() => {
    return displayCases.filter((item) => {
      const q = search.toLowerCase();

      return (
        item.title.toLowerCase().includes(q) ||
        item.diagnosis.toLowerCase().includes(q) ||
        item.patient?.user?.fullName
          ?.toLowerCase()
          .includes(q)
      );
    });
  }, [displayCases, search]);

  const totalGoal = displayCases.reduce(
    (sum, item) => sum + Number(item.targetAmount),
    0
  );

  const totalRaised = displayCases.reduce(
    (sum, item) => sum + Number(item.raisedAmount),
    0
  );

  if (loading) {
     return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">

      <div className="text-center">

        <div className="
          mx-auto
          h-14
          w-14
          animate-spin
          rounded-full
          border-4
          border-teal-600
          border-t-transparent
        " />

        <p className="mt-6 text-lg text-slate-600">
          Loading verified campaigns...
        </p>

      </div>

    </div>
  );
  }

  return (

<div className="min-h-screen bg-slate-50">


  <DonorHeader />


  <main className="
    mx-auto
    max-w-7xl
    px-8
    py-10
  ">


    <Hero />


    <div className="mt-10">

      <StatsCards
        campaigns={displayCases.length}
        patients={displayCases.length}
        goal={totalGoal}
        raised={totalRaised}
      />

    </div>



    <div className="mt-10">

      <SearchBar
        value={search}
        onChange={setSearch}
      />

    </div>




    <div className="
      mt-10
      grid
      gap-8
      lg:grid-cols-2
    ">


      {
        filteredCases.map((item)=>(

          <CampaignCard

            key={item.id}

            item={item}

            onDonate={setSelectedCase}

          />

        ))
      }


    </div>




    {
      filteredCases.length === 0 && (

        <div className="
          mt-10
          rounded-xl
          bg-white
          p-10
          text-center
          shadow
        ">

          <h2 className="
            text-xl
            font-bold
            text-slate-900
          ">

            No verified campaigns available

          </h2>


          <p className="mt-2 text-slate-500">

            Please check again later.

          </p>


        </div>

      )
    }



    <DonationModal

      open={Boolean(selectedCase)}

      caseTitle={selectedCase?.title ?? ""}

      onClose={() => setSelectedCase(null)}

    />


  </main>


</div>

);
  
}

