import { HeartPulse, ShieldCheck, FileCheck, HandHeart } from "lucide-react";
import { motion } from "framer-motion";
import { Routes, Route, Link } from "react-router-dom";

import { HealthStatus } from "./components/HealthStatus";
import { AuthPage } from "./pages/AuthPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PatientDashboard } from "./pages/PatientDashboard";
import { CaseEditor } from "./pages/CaseEditor";
import { PublicCasesPage } from "./pages/PublicCasesPage";
import { HospitalDashboard } from "./pages/HospitalDashboard";
import { DonorDashboard } from "./pages/DonorDashboard";

function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-8 py-20">

        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          <motion.div
            initial={{opacity:0, y:20}}
            animate={{opacity:1, y:0}}
          >

            <div className="mb-5 flex items-center gap-2 text-teal-300">
              <HeartPulse size={24}/>
              <span className="font-semibold">
                Healthcare support made trustworthy
              </span>
            </div>


            <h1 className="text-5xl font-bold leading-tight">
              Connecting medical needs
              with verified support.
            </h1>


            <p className="mt-6 text-lg text-slate-300">
              CareBridge AI helps patients create
              verified medical fundraising cases,
              while donors support people who
              genuinely need help.
            </p>


            <div className="mt-8 flex gap-4">

              <Link
                to="/register"
                className="
                rounded-xl
                bg-teal-500
                px-6
                py-3
                font-semibold
                text-white
                hover:bg-teal-600
                cursor-pointer
                "
              >
                Start Fundraising
              </Link>


              <Link
                to="/fundraisers"
                className="
                rounded-xl
                border
                border-slate-500
                px-6
                py-3
                font-semibold
                hover:bg-white/10
                cursor-pointer
                "
              >
                Browse Cases
              </Link>

            </div>

          </motion.div>


          <HealthStatus />

        </div>

      </section>



      {/* How it works */}
      <section className="bg-white px-8 py-20 text-slate-900">

        <h2 className="text-center text-3xl font-bold">
          How CareBridge AI Works
        </h2>


        <div className="
        mx-auto
        mt-12
        grid
        max-w-5xl
        gap-8
        md:grid-cols-3
        ">


          <Feature
            icon={<FileCheck/>}
            title="Create a Case"
            text="Patients describe their medical needs and treatment requirements."
          />


          <Feature
            icon={<ShieldCheck/>}
            title="Hospital Verification"
            text="Medical documents are reviewed before fundraising becomes public."
          />


          <Feature
            icon={<HandHeart/>}
            title="Receive Support"
            text="Donors discover verified cases and provide assistance."
          />


        </div>

      </section>


      {/* CTA */}
      <section className="px-8 py-16 text-center">

        <h2 className="text-3xl font-bold">
          Ready to make healthcare support transparent?
        </h2>


        <Link
          to="/fundraisers"
          className="
          mt-8
          inline-block
          rounded-xl
          bg-teal-500
          px-8
          py-3
          font-semibold
          cursor-pointer
          "
        >
          View Verified Cases
        </Link>


      </section>


    </main>
  );
}


function Feature({
  icon,
  title,
  text,
}:{
  icon:React.ReactNode;
  title:string;
  text:string;
}){

return(
<div className="
rounded-2xl
border
p-6
shadow-sm
">

<div className="text-teal-600">
{icon}
</div>

<h3 className="mt-4 text-xl font-semibold">
{title}
</h3>

<p className="mt-2 text-slate-600">
{text}
</p>

</div>
)

}



export function App(){

return (

<Routes>

<Route
path="/"
element={<LandingPage/>}
/>


<Route
path="/login"
element={<AuthPage mode="login"/>}
/>


<Route
path="/register"
element={<AuthPage mode="register"/>}
/>


<Route
path="/fundraisers"
element={<PublicCasesPage/>}
/>


<Route element={<ProtectedRoute/>}>

<Route
path="/patient"
element={<PatientDashboard/>}
/>

<Route
path="/hospital"
element={<HospitalDashboard/>}
/>

<Route
path="/patient/cases/new"
element={<CaseEditor/>}
/>


<Route
path="/patient/cases/:caseId"
element={<CaseEditor/>}
/>

<Route
  path="/donor"
  element={<DonorDashboard />}
/>


</Route>


</Routes>

);

}