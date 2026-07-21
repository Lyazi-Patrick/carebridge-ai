type Props = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isSubmitting: boolean;
};


export function WizardNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isSubmitting,
}: Props) {


return (

<div className="
mt-10
flex
justify-between
border-t
pt-6
">


<button

type="button"

onClick={onPrevious}

disabled={currentStep === 1}

className="
rounded-lg
bg-slate-200
px-5
py-2
font-medium
text-slate-800
disabled:opacity-40
cursor-pointer
"

>

Previous

</button>



{
currentStep < totalSteps ?

<button

type="button"

onClick={onNext}

className="
rounded-lg
bg-teal-600
px-6
py-2
font-semibold
text-white
hover:bg-teal-700
cursor-pointer
"

>

Next

</button>


:

<button

type="submit"

disabled={isSubmitting}

className="
rounded-lg
bg-green-600
px-6
py-2
font-semibold
text-white
hover:bg-green-700
disabled:opacity-50
cursor-pointer
"

>

{
isSubmitting
?
"Saving..."
:
"Submit"
}

</button>

}


</div>

);

}