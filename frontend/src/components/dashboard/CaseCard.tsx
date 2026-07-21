import type { FundraisingCase } from "../../types/api";


type Props = {
  item: FundraisingCase;
};


export function CaseCard({ item }: Props) {


return (

<div className="rounded-xl bg-white p-5 shadow">


<h3 className="text-xl font-semibold text-slate-900">
{item.title}
</h3>


<p className="mt-2 text-slate-600">
{item.diagnosis}
</p>


<div className="mt-4 flex justify-between">

<span className="text-sm text-slate-500">
Status:
</span>


<span className="font-medium">
{item.status.replace("_"," ")}
</span>


</div>


<div className="mt-4">

<p>
Goal:
${Number(item.targetAmount).toLocaleString()}
</p>


</div>


</div>

);


}