import { Hospital, LogOut, Bell } from "lucide-react";

export function HospitalHeader(){

return (

<header className="
bg-gradient-to-r
from-teal-800
to-emerald-700
text-white
shadow-lg
">

<div className="
mx-auto
flex
max-w-7xl
items-center
justify-between
px-8
py-6
">


<div className="flex items-center gap-4">

<div className="
rounded-xl
bg-white/20
p-3
">

<Hospital size={32}/>

</div>


<div>

<h1 className="text-2xl font-bold">
CareBridge Hospital Portal
</h1>

<p className="text-teal-100">
Medical verification center
</p>

</div>


</div>



<div className="flex items-center gap-5">


<button
className="
rounded-full
bg-white/20
p-3
hover:bg-white/30
"
>

<Bell/>

</button>



<button
className="
flex
items-center
gap-2
rounded-xl
bg-white
px-5
py-3
font-semibold
text-teal-700
hover:bg-teal-50
"
>

<LogOut size={18}/>

Logout

</button>


</div>


</div>


</header>

)

}