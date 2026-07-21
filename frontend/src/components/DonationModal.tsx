import { useState } from "react";
import { X, HeartHandshake, Heart } from "lucide-react";

type DonationModalProps = {
  open: boolean;
  caseTitle: string;
  onClose: () => void;
};


export function DonationModal({
  open,
  caseTitle,
  onClose,
}: DonationModalProps) {


  const [amount, setAmount] = useState("");
  const [success, setSuccess] = useState(false);


  if (!open) return null;


  function donate(){

    if(!amount) return;

    setSuccess(true);

  }



  return (

<div
className="
fixed
inset-0
z-50
flex
items-center
justify-center
bg-black/60
p-5
"
>


<div
className="
relative
w-full
max-w-lg
rounded-3xl
bg-white
p-8
shadow-2xl
"
>


<button

onClick={onClose}

className="
absolute
right-5
top-5
rounded-full
p-2
text-slate-600
hover:bg-slate-100
hover:text-slate-900
"

>

<X size={26}/>

</button>




{
success ? (

<div className="text-center">


<HeartHandshake
size={70}
className="mx-auto text-teal-600"
/>


<h2 className="
mt-5
text-3xl
font-bold
text-slate-900
">

Thank you for your kindness

</h2>


<p className="
mt-3
text-slate-600
">

Your donation can make a real difference.

</p>



<button

onClick={onClose}

className="
mt-8
rounded-xl
bg-teal-600
px-8
py-3
font-semibold
text-white
hover:bg-teal-700
"

>

Close

</button>



</div>


) : (


<>


<div className="flex items-center gap-3">

<Heart
className="text-teal-600"
size={32}
/>


<h2 className="
text-3xl
font-bold
text-slate-900
">

Support This Case

</h2>


</div>




<div className="
mt-8
rounded-xl
bg-slate-50
p-5
">


<p className="
text-sm
font-medium
uppercase
tracking-wide
text-slate-500
">

You are supporting

</p>



<h3 className="
mt-2
text-xl
font-bold
text-slate-900
">

{caseTitle}

</h3>


</div>





<h3 className="
mt-7
text-lg
font-semibold
text-slate-900
">

Choose donation amount

</h3>




<div className="
mt-4
grid
grid-cols-3
gap-4
">


{
["10","25","50"].map(value=>(

<button

key={value}

onClick={()=>setAmount(value)}

className={`
rounded-xl
border-2
px-4
py-4
text-lg
font-bold
transition

${
amount===value
?
"border-teal-600 bg-teal-50 text-teal-700"
:
"border-slate-200 text-slate-700 hover:border-teal-400"
}

`}

>

USD {value}

</button>


))
}


</div>





<div className="mt-6">


<label className="
text-sm
font-medium
text-slate-700
">

Or enter custom amount

</label>


<div className="mt-2 flex">


<span className="
flex
items-center
rounded-l-xl
bg-slate-100
px-4
font-bold
text-slate-700
">

USD

</span>


<input

value={amount}

onChange={(e)=>
setAmount(e.target.value)
}

placeholder="Enter amount"

className="
w-full
rounded-r-xl
border
border-slate-300
p-4
text-lg
text-slate-900
outline-none
focus:border-teal-600
"

/>


</div>


</div>





<button

onClick={donate}

className="
mt-8
w-full
rounded-xl
bg-teal-600
py-4
text-lg
font-bold
text-white
hover:bg-teal-700
"

>

Donate Now

</button>


</>


)


}


</div>


</div>


);

}