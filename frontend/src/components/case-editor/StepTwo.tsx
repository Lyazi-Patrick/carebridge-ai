import type { FundraisingCase } from "../../types/api";

type StepTwoProps = {
  item: FundraisingCase | null;
  upload: (files: FileList | null) => Promise<void>;
};

export function StepTwo({
  item,
  upload,
}: StepTwoProps) {

  return (
    <div className="space-y-6">

      <h2 className="text-2xl font-bold text-slate-900">
        Medical Documents
      </h2>


      <p className="text-slate-600">
        Upload medical reports, prescriptions, or hospital documents.
      </p>


      <input
        type="file"
        multiple
        accept="application/pdf,image/png,image/jpeg"
        onChange={(e) => upload(e.target.files)}
        className="
          block
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          p-3
          text-slate-900
          cursor-pointer
        "
      />


      {!item && (
        <div className="
          rounded-lg
          bg-yellow-50
          p-3
          text-yellow-700
        ">
          Save your case before uploading documents.
        </div>
      )}


      <div className="space-y-3">

        {
          item?.documents && item.documents.length > 0 ? (

            item.documents.map((doc) => (

              <div
                key={doc.id}
                className="
                  rounded-lg
                  bg-slate-100
                  p-3
                  text-slate-800
                "
              >
                📄 {doc.fileName}
              </div>

            ))

          ) : (

            <p className="text-slate-500">
              No documents uploaded yet.
            </p>

          )
        }

      </div>


    </div>
  );
}