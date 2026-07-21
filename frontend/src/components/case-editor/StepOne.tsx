import type { UseFormReturn } from "react-hook-form";
import type { CaseInput } from "@carebridge/shared";

type StepOneProps = {
  form: UseFormReturn<CaseInput>;
};


export function StepOne({ form }: StepOneProps) {

  const {
    register,
    formState: { errors },
  } = form;


  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Medical Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Tell us about the medical condition and treatment required.
        </p>
      </div>


      <Field
        label="Case Title"
        error={errors.title?.message}
      >
        <input
          {...register("title")}
          placeholder="Example: Help Sarah receive cancer treatment"
          className="input-field"
        />
      </Field>



      <Field
        label="Diagnosis"
        error={errors.diagnosis?.message}
      >
        <textarea
          {...register("diagnosis")}
          placeholder="Describe the medical diagnosis"
          className="input-field min-h-28"
        />
      </Field>



      <Field
        label="Treatment Plan"
        error={errors.treatmentPlan?.message}
      >
        <textarea
          {...register("treatmentPlan")}
          placeholder="Explain the required treatment"
          className="input-field min-h-28"
        />
      </Field>



      <Field
        label="Your Story"
        error={errors.story?.message}
      >
        <textarea
          {...register("story")}
          placeholder="Share the patient's story and situation"
          className="input-field min-h-40"
        />
      </Field>



      <Field
        label="Funding Goal (USD)"
        error={errors.targetAmount?.message}
      >
        <input
          type="number"
          {...register("targetAmount", {
            valueAsNumber: true,
          })}
          placeholder="Example: 5000"
          className="input-field"
        />
      </Field>


    </div>
  );
}



function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {

  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>


      {children}


      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  );
}