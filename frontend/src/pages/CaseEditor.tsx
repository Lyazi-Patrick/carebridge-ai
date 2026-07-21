import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  caseSchema,
  type CaseInput,
} from "@carebridge/shared";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { api } from "../services/api";
import type { FundraisingCase } from "../types/api";

import { StepIndicator } from "../components/case-editor/StepIndicator";
import { WizardNavigation } from "../components/case-editor/WizardNavigation";
import { StepOne } from "../components/case-editor/StepOne";
import { StepTwo } from "../components/case-editor/StepTwo";
import { StepThree } from "../components/case-editor/StepThree";
import { StepFour } from "../components/case-editor/StepFour";


const TOTAL_STEPS = 4;


export function CaseEditor() {

  const { caseId } = useParams();

  const navigate = useNavigate();

  const editing = Boolean(caseId);


  const [currentStep,setCurrentStep] = useState(1);

  const [item,setItem] =
    useState<FundraisingCase | null>(null);

  const [error,setError] =
    useState("");



  const form = useForm<CaseInput>({
    resolver:zodResolver(caseSchema),

    defaultValues:{
      title:"",
      diagnosis:"",
      treatmentPlan:"",
      story:"",
      targetAmount:0
    }
  });



  useEffect(()=>{

    if(!caseId) return;


    api.get(`/cases/${caseId}`)
    .then(({data})=>{

      const current=data.case;

      setItem(current);


      form.reset({

        title:current.title,

        diagnosis:current.diagnosis,

        treatmentPlan:current.treatmentPlan,

        story:current.story,

        targetAmount:Number(
          current.targetAmount
        )

      });


    })
    .catch(()=>{

      setError(
        "Unable to load case."
      );

    });


  },[caseId,form]);





  async function saveCase(values:CaseInput){

    try{

      setError("");

      const response =
        editing

        ? await api.patch(
            `/cases/${caseId}`,
            values
          )

        : await api.post(
            "/cases",
            values
          );


      setItem(
        response.data.case
      );


      if(!editing){

        navigate(
          `/patient/cases/${response.data.case.id}`,
          {
            replace:true
          }
        );

      }


    }
    catch(err:any){

      setError(
        err.response?.data?.error?.message ??
        "Unable to save case."
      );

    }

  }





  async function upload(files:FileList|null){

    if(!item || !files?.length)
      return;


    try{

      const formData=new FormData();


      Array.from(files)
      .forEach(file=>{

        formData.append(
          "documents",
          file
        );

      });



      const {data}=await api.post(

        `/cases/${item.id}/documents`,

        formData,

        {
          headers:{
            "Content-Type":
            "multipart/form-data"
          }
        }

      );



      setItem({

        ...item,

        documents:[
          ...item.documents,
          ...data.documents
        ]

      });


    }
    catch(err:any){

      setError(

        err.response?.data?.error?.message ??
        "Upload failed."

      );

    }

  }






 async function nextStep(){

if(currentStep === 3 && item){

try{

const {data} = await api.get(
`/cases/${item.id}`
);


setItem(data.case);


}catch(error){

console.log(
"Unable to refresh case",
error
);

}

}


setCurrentStep(previous=>{

if(previous < TOTAL_STEPS){

return previous + 1;

}

return previous;

});

}





  function previousStep(){

    setCurrentStep(
      previous=>{

        if(previous>1){

          return previous-1;

        }

        return previous;

      }
    );

  }







  function submitComplete(){

    navigate("/patient");

  }






return (

<div className="
min-h-screen
bg-slate-100
py-10
px-4
">


<div className="
mx-auto
max-w-5xl
">


<Link

to="/patient"

className="
text-sm
font-medium
text-teal-700
hover:underline
"

>

← Back to dashboard

</Link>




<div className="
mt-6
rounded-2xl
bg-white
p-8
shadow-lg
">


<h1
className="
text-3xl
font-bold
text-slate-900
mb-8
"
>

{
editing
?
"Edit Fundraising Case"
:
"Create Fundraising Case"
}

</h1>




<StepIndicator
currentStep={currentStep}
/>




{
error &&

<div
className="
mt-5
rounded-lg
bg-red-100
p-3
text-red-700
"
>

{error}

</div>

}




<form

className="
mt-8
"

onSubmit={

form.handleSubmit(
saveCase
)

}

>




{
currentStep===1 &&

<StepOne
form={form}
/>

}




{
currentStep===2 &&

<StepTwo

item={item}

upload={upload}

/>

}




{
currentStep===3 &&

<StepThree

item={item}

setItem={setItem}

/>

}




{
currentStep===4 &&

<StepFour

item={item}

onSubmitted={submitComplete}

/>

}





<WizardNavigation

currentStep={currentStep}

totalSteps={TOTAL_STEPS}

onNext={nextStep}

onPrevious={previousStep}

isSubmitting={
form.formState.isSubmitting
}

/>




</form>



</div>


</div>


</div>

);


}