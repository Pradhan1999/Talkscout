import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomInterviewCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.5-flash"),
      prompt: `You are an expert technical interviewer. Generate exactly ${amount} interview questions for the following position:

      Role: ${role}
      Experience Level: ${level}
      Tech Stack: ${techstack}
      Question Focus: ${type}

      Guidelines:
      - For "technical" focus: emphasize system design, coding concepts, and tech stack proficiency
      - For "behavioural" focus: emphasize past experiences, teamwork, and situational judgment
      - For "mixed" focus: balance both equally
      - Tailor the difficulty to the experience level (junior questions should test fundamentals, senior questions should probe depth and architecture decisions)
      - Questions must be clear, specific, and directly relevant to the role and tech stack
      - Do not include question numbers, bullet points, or any additional commentary
      - Do not use special characters like slash, asterisk, or quotes within the questions, as they will be read aloud by a voice assistant

      Return only a JSON array of strings with exactly ${amount} questions, like this:
      ["Question 1", "Question 2", "Question 3"]
      `,
    });

    const interview = {
      role: role,
      type: type,
      level: level,
      techstack: techstack.split(","),
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
