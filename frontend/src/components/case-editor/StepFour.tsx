import type { FundraisingCase } from "../../types/api";
import { api } from "../../services/api";
import { useState } from "react";


type StepFourProps = {
  item: FundraisingCase | null;
  onSubmitted: () => void;
};



export function StepFour({
  item,
  onSubmitted,
}: StepFourProps) {

  console.log("STEP FOUR CURRENT ITEM:", item);
  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");



  async function submitCase() {

    if (!item) {
      setError(
        "Please save your case first."
      );
      return;
    }


    if (!item.documents.length) {
      setError(
        "Please upload at least one medical document."
      );
      return;
    }


    if (!item.aiSummary) {
      setError(
        "Please generate and approve an AI summary."
      );
      return;
    }


    try {

      setLoading(true);
      setError("");


      await api.post(
        `/cases/${item.id}/submit`
      );


      onSubmitted();


    } catch(err:any){

      setError(
        err.response?.data?.error?.message ??
        "Unable to submit case."
      );

    } finally {

      setLoading(false);

    }

  }





  return (

    <div className="space-y-8">


      <div>

        <h2 className="text-xl font-semibold text-slate-800">
          Review Your Fundraising Case
        </h2>


        <p className="mt-1 text-sm text-slate-500">
          Check everything before sending your request
          for hospital verification.
        </p>

      </div>





      {!item && (

        <div className="
          rounded-lg
          bg-yellow-50
          p-4
          text-yellow-700
        ">
          Save your case details first.
        </div>

      )}





      {item && (

        <div className="space-y-5">


          <ReviewCard
            title="Case Title"
            value={item.title}
          />



          <ReviewCard
            title="Diagnosis"
            value={item.diagnosis}
          />



          <ReviewCard
            title="Treatment Plan"
            value={item.treatmentPlan}
          />



          <ReviewCard
            title="Funding Goal"
            value={`$${item.targetAmount}`}
          />




          <div
            className="
              rounded-xl
              border
              p-5
            "
          >

            <h3 className="font-semibold">
              Medical Documents
            </h3>


            <p className="mt-2 text-sm text-slate-600">

              {item.documents.length}
              {" "}
              document(s) uploaded

            </p>


          </div>





          <div
            className="
              rounded-xl
              border
              p-5
            "
          >

            <h3 className="font-semibold">
              AI Donor Summary
            </h3>


            <p className="
              mt-3
              text-sm
              leading-6
              text-slate-600
            ">
              {item.aiSummary ??
              "No AI summary created yet."}
            </p>


          </div>




          <div
            className="
              rounded-xl
              bg-teal-50
              p-5
            "
          >

            <h3 className="font-semibold text-teal-800">
              Verification Process
            </h3>


            <ol className="
              mt-3
              list-decimal
              space-y-1
              pl-5
              text-sm
              text-teal-700
            ">

              <li>
                Hospital reviews medical documents
              </li>

              <li>
                Hospital confirms authenticity
              </li>

              <li>
                Admin approves fundraising campaign
              </li>

              <li>
                Case becomes visible to donors
              </li>

            </ol>

          </div>




        </div>

      )}






      <button
        type="button"
        onClick={submitCase}
        disabled={loading}
        className="
          rounded-lg
          bg-teal-600
          px-6
          py-3
          font-semibold
          text-white
          hover:bg-teal-700
          disabled:opacity-50
        "
      >

        {
          loading
          ? "Submitting..."
          : "Submit For Verification"
        }

      </button>





      {error && (

        <p className="text-sm text-red-600">
          {error}
        </p>

      )}



    </div>

  );
}




function ReviewCard({
  title,
  value,
}:{
  title:string;
  value:string;
}) {


  return (

    <div
      className="
        rounded-xl
        border
        p-5
      "
    >

      <h3 className="font-semibold">
        {title}
      </h3>


      <p className="
        mt-2
        text-sm
        text-slate-600
      ">
        {value}
      </p>


    </div>

  );

}