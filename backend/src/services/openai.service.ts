import OpenAI from "openai";
import { env } from "../config/env.js";


export async function generateCaseSummary(input: {
  diagnosis:string;
  treatmentPlan:string;
  story:string;
}) {


  if(!env.OPENAI_API_KEY){

    return fallbackSummary(input);

  }



  try {


    const client = new OpenAI({
      apiKey: env.OPENAI_API_KEY,
    });



    const completion =
      await client.responses.create({

        model:"gpt-4.1-mini",

        instructions:
        `
        Write a compassionate medical fundraising summary.
        Keep it factual.
        Do not invent information.
        Maximum 120 words.
        `,


        input:
        `
        Diagnosis:
        ${input.diagnosis}


        Treatment plan:
        ${input.treatmentPlan}


        Patient story:
        ${input.story}
        `

      });



    return completion.output_text.trim();



  } catch(error:any){


    console.log(
      "OpenAI unavailable, using fallback summary"
    );


    return fallbackSummary(input);


  }

}




function fallbackSummary(input:{
 diagnosis:string;
 treatmentPlan:string;
 story:string;
}){


return `

This fundraising case is created to support medical treatment needs.

The patient requires assistance related to:
${input.diagnosis}.


The requested support will help cover:
${input.treatmentPlan}.


${input.story}


Your contribution will help provide access to necessary healthcare services.

`;

}