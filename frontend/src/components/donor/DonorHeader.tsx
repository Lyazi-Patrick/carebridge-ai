import {
  HeartPulse,
  LogOut,
  UserCircle
} from "lucide-react";


export function DonorHeader() {


function logout(){

  localStorage.removeItem("token");

  window.location.href="/login";

}


return (

<header
className="
sticky
top-0
z-40
border-b
bg-white
shadow-sm
"
>


<div
className="
mx-auto
max-w-7xl
px-8
py-4
flex
items-center
justify-between
"
>


{/* Brand */}

<div className="flex items-center gap-3">


<div
className="
rounded-xl
bg-teal-600
p-3
text-white
"
>

<HeartPulse size={26}/>

</div>


<div>

<h1
className="
text-xl
font-bold
text-slate-900
"
>
CareBridge AI
</h1>


<p
className="
text-sm
text-slate-500
"
>
Donor Portal
</p>


</div>


</div>




{/* Navigation */}

<nav
className="
hidden
md:flex
items-center
gap-8
text-sm
font-medium
text-slate-600
"
>

<a
className="
hover:text-teal-600
cursor-pointer
"
>
Explore Cases
</a>


<a
className="
hover:text-teal-600
cursor-pointer
"
>
My Donations
</a>


<a
className="
hover:text-teal-600
cursor-pointer
"
>
Impact
</a>


</nav>




{/* User section */}

<div
className="
flex
items-center
gap-4
"
>


<div
className="
hidden
sm:flex
items-center
gap-2
text-slate-700
"
>

<UserCircle
size={30}
/>


<span
className="
font-medium
"
>
Donor
</span>


</div>



<button

onClick={logout}

className="
flex
items-center
gap-2
rounded-xl
bg-red-50
px-4
py-2
font-semibold
text-red-600
hover:bg-red-100
transition
"

>

<LogOut size={18}/>

Logout

</button>


</div>



</div>


</header>

);


}