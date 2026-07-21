import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, FileText, Clock, CheckCircle } from "lucide-react";

import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import type { FundraisingCase } from "../types/api";

import { CaseCard } from "../components/dashboard/CaseCard";
import { EmptyState } from "../components/dashboard/EmptyState";


export function PatientDashboard(){

const {user, signOut}=useAuth();

const [cases,setCases]=useState<FundraisingCase[]>([]);
const [error,setError]=useState("");


useEffect(()=>{

api.get("/cases/mine")
.then(({data})=>{
setCases(data.cases);
})
.catch(()=>{
setError(
"Unable to load your fundraising cases."
);
});

},[]);



const activeCases =
cases.filter(
item=>item.status==="DRAFT" ||
item.status==="SUBMITTED"
);


const verifiedCases =
cases.filter(
item=>item.status==="HOSPITAL_VERIFIED"
);



return (

<div className="
min-h-screen
bg-slate-100
p-6
">


<div className="
mx-auto
max-w-6xl
">


{/* Header */}

<div className="
flex
items-center
justify-between
mb-8
">


<div>

<h1 className="
text-3xl
font-bold
text-slate-900
">

Welcome, {user?.fullName}

</h1>


<p className="
text-slate-600
mt-2
">

Manage your medical fundraising requests.

</p>


</div>



<button
onClick={signOut}
className="
rounded-lg
bg-slate-800
px-4
py-2
text-white
cursor-pointer
"
>

Sign out

</button>


</div>





{/* Stats */}

<div className="
grid
gap-5
md:grid-cols-3
mb-8
">


<DashboardCard
icon={<FileText/>}
title="Total Cases"
value={cases.length}
/>


<DashboardCard
icon={<Clock/>}
title="Pending Review"
value={
cases.filter(
c=>c.status==="SUBMITTED"
).length
}
/>


<DashboardCard
icon={<CheckCircle/>}
title="Verified Cases"
value={
verifiedCases.length
}
/>


</div>






{/* Action */}

<div className="
mb-8
flex
justify-end
">


<Link

to="/patient/cases/new"

className="
flex
items-center
gap-2
rounded-xl
bg-teal-600
px-5
py-3
font-semibold
text-white
hover:bg-teal-700
cursor-pointer
"

>

<PlusCircle size={20}/>

Create fundraising case

</Link>


</div>







{error && (

<p className="
rounded-lg
bg-red-100
p-4
text-red-700
">

{error}

</p>

)}






{/* Cases */}

<section>

<h2 className="
mb-4
text-xl
font-bold
">

Your fundraising cases

</h2>



{
cases.length===0 ?

<EmptyState/>

:

<div className="
grid
gap-5
md:grid-cols-2
">

{

cases.map(item=>(

<CaseCard

key={item.id}

item={item}

/>

))

}

</div>

}



</section>




</div>

</div>

)

}




function DashboardCard({

icon,
title,
value

}:{
icon:React.ReactNode;
title:string;
value:number;

}){


return (

<div className="
rounded-2xl
bg-white
p-6
shadow-sm
">


<div className="
text-teal-600
">

{icon}

</div>


<p className="
mt-4
text-3xl
font-bold
">

{value}

</p>


<p className="
text-slate-600
">

{title}

</p>



</div>

)

}