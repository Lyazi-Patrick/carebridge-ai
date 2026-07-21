import { useState } from "react";
import type { FundraisingCase } from "../../types/api";
import { api } from "../../services/api";


type StepThreeProps = {
  item: FundraisingCase | null;
  setItem: React.Dispatch<
    React.SetStateAction<FundraisingCase | null>
  >;
};


export function StepThree({
  item,
  setItem,
}: StepThreeProps) {


const [summary,setSummary] =
useState(item?.aiSummary ?? "");

const [loading,setLoading] =
useState(false);

const [error,setError] =
useState("");



async function generateSummary(){

if(!item){

setError(
"Save your case before generating an AI summary."
);

return;

}


try{

setLoading(true);
setError("");



const {data}=await api.post(
`/cases/${item.id}/ai-summary`
);



setSummary(
data.summary
);



setItem({

...item,

aiSummary:data.summary

});



}catch(err:any){

setError(
"Unable to generate AI summary."
);

}

finally{

setLoading(false);

}

}





async function saveSummary(){

if(!item)
return;


try{


await api.patch(

`/cases/${item.id}/ai-summary`,

{
summary
}

);



setItem({

...item,

aiSummary:summary

});



}catch(err){

setError(
"Unable to save summary."
);

}

}





return (

<div className="space-y-6">


<h2 className="
text-2xl
font-bold
text-slate-900
">

AI Summary Review

</h2>



<p className="text-slate-600">

Review the generated fundraising summary before submission.

</p>



<button

type="button"

onClick={generateSummary}

disabled={loading}

className="
rounded-lg
bg-teal-600
px-5
py-3
text-white
cursor-pointer
"

>

{
loading
?
"Generating..."
:
"Generate AI Summary"
}


</button>



{
summary && (

<textarea

value={summary}

onChange={
(e)=>setSummary(e.target.value)
}

className="
mt-4
min-h-40
w-full
rounded-lg
border
border-slate-300
p-4
text-slate-900
"

 />

)

}



{
summary && (

<button

type="button"

onClick={saveSummary}

className="
rounded-lg
bg-green-600
px-5
py-3
text-white
cursor-pointer
"

>

Approve & Save Summary

</button>

)

}



{
error && (

<p className="text-red-600">

{error}

</p>

)

}



</div>

);

}