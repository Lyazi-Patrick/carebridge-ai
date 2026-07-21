/*import type { FundraisingCase } from "../types/api";*/
type MedicalDocument = { id: string; fileName: string; mimeType: string; secureUrl: string };
type FundraisingCase = { id: string; title: string; diagnosis: string; treatmentPlan: string; story: string; targetAmount: string | number; raisedAmount: string | number; status: string; aiSummary?: string | null; documents: MedicalDocument[];patient?: {
  user?: {
    fullName:string;
    email:string;
  }
};};

export const dummyCampaigns: FundraisingCase[] = [

  {
    id: "demo-001",
    title: "Help Sarah Receive Urgent Cancer Treatment",
    diagnosis: "Breast Cancer Stage II",
    treatmentPlan:
      "Chemotherapy sessions followed by surgery and continuous medical monitoring.",
    story:
      "Sarah is a young mother who needs urgent treatment to continue caring for her family. Your support will help cover medical expenses and treatment costs.",
    targetAmount: 8500,
    raisedAmount: 5200,
    status: "HOSPITAL_VERIFIED",
    aiSummary:
      "Sarah requires financial support for cancer treatment. Her medical documents have been reviewed and verified by a hospital. Donations will assist with chemotherapy, surgery, and related care.",
    documents: [],
    patient: {
      user: {
        fullName: "Sarah Nakato",
        email: "sarah@example.com",
      },
    },
  },


  {
    id: "demo-002",
    title: "Support David's Kidney Treatment Journey",
    diagnosis: "Chronic Kidney Disease",
    treatmentPlan:
      "Regular dialysis sessions and specialist kidney care.",
    story:
      "David requires ongoing treatment and dialysis support. The financial burden has made it difficult for his family to maintain his medical schedule.",
    targetAmount: 12000,
    raisedAmount: 7300,
    status: "HOSPITAL_VERIFIED",
    aiSummary:
      "David has a verified kidney condition requiring regular dialysis treatment. Contributions will support medical procedures and essential healthcare costs.",
    documents: [],
    patient: {
      user: {
        fullName: "David Okello",
        email: "david@example.com",
      },
    },
  },


  {
    id: "demo-003",
    title: "Help Baby Emma Access Heart Surgery",
    diagnosis: "Congenital Heart Disease",
    treatmentPlan:
      "Specialized heart surgery and post-operative care.",
    story:
      "Baby Emma was born with a heart condition requiring specialized surgery. Her family is seeking assistance to access life-saving treatment.",
    targetAmount: 15000,
    raisedAmount: 9100,
    status: "HOSPITAL_VERIFIED",
    aiSummary:
      "Emma's medical condition requires specialized cardiac surgery. Hospital verification confirms the need for treatment support.",
    documents: [],
    patient: {
      user: {
        fullName: "Emma's Family",
        email: "family@example.com",
      },
    },
  },


  {
    id: "demo-004",
    title: "Emergency Accident Recovery Support",
    diagnosis: "Multiple Bone Fractures",
    treatmentPlan:
      "Surgery, physiotherapy, and rehabilitation.",
    story:
      "After a serious accident, Michael needs support to cover surgery and rehabilitation expenses.",
    targetAmount: 6000,
    raisedAmount: 2800,
    status: "HOSPITAL_VERIFIED",
    aiSummary:
      "Michael requires medical assistance following accident-related injuries. Verified support will help cover surgery and recovery expenses.",
    documents: [],
    patient: {
      user: {
        fullName: "Michael Kato",
        email: "michael@example.com",
      },
    },
  },

];