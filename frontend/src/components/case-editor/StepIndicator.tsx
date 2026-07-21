type StepIndicatorProps = {
  currentStep: number;
};

const steps = [
  "Medical Details",
  "Documents",
  "AI Summary",
  "Review",
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">

        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const completed = stepNumber < currentStep;
          const active = stepNumber === currentStep;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`
                    flex h-10 w-10 items-center justify-center
                    rounded-full border-2 font-semibold
                    transition-all
                    ${
                      active || completed
                        ? "border-teal-600 bg-teal-600 text-white"
                        : "border-slate-300 bg-white text-slate-500"
                    }
                  `}
                >
                  {stepNumber}
                </div>

                <span
                  className={`
                    mt-2 text-xs text-center
                    ${
                      active || completed
                        ? "font-semibold text-teal-700"
                        : "text-slate-500"
                    }
                  `}
                >
                  {step}
                </span>

              </div>


              {index !== steps.length - 1 && (
                <div
                  className={`
                    mx-3 h-1 flex-1 rounded
                    ${
                      completed
                        ? "bg-teal-600"
                        : "bg-slate-300"
                    }
                  `}
                />
              )}

            </div>
          );
        })}

      </div>

      <p className="mt-4 text-center text-sm text-slate-500">
        Step {currentStep} of {steps.length}
      </p>

    </div>
  );
}