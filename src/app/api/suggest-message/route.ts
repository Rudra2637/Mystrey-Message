import { streamText } from "ai";
import { google } from "@ai-sdk/google";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  
  try {
    const prompt = `
      Generate exactly three open-ended and engaging questions.
      Output only the questions in this strict format:
      Question 1||Question 2||Question 3
      Do not include any explanations, introductions, or extra text.
      Make sure each set of questions is unique and suitable for a diverse anonymous audience.
    `;

    const result = await streamText({
      model: google("gemini-2.5-flash-lite-preview-09-2025"), // ✅ no "models/" prefix for v1
      prompt,
      temperature: 0.8,
      topP: 0.9,
    });

    const output = await result.text;
    return NextResponse.json({ completion: output });
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// import { google } from '@ai-sdk/google';
// import {StreamingTextResponse} from 'ai'
// import { NextResponse } from 'next/server';

// export const runtime = 'edge';

// // Gemini client
// const gemini = google({
//   apiKey: process.env.GOOGLE_API_KEY!,
// });

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     // Similar to openai.chat.completions.create
//     const response = await gemini.chat.completions.create({
//       model: 'models/gemini-1.5-flash',
//       messages: [
//         { role: 'user', content: prompt }
//       ],
//       stream: true,
//     });

//     return new StreamingTextResponse(response.toAIStream());
//   } catch (error: any) {
//     console.error('An unexpected error occurred:', error);
//     return NextResponse.json(
//       { name: error.name, message: error.message, stack: error.stack },
//       { status: 500 }
//     );
//   }
// }

