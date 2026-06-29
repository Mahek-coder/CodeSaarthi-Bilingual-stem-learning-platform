import { callGemini } from "./gemini";

export async function generateQuiz(topic) {
  const prompt = `
Create a quiz on "${topic}".
Return ONLY JSON in this format:

{
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    }
  ]
}
Make 5 questions. Keep it simple for students.
`;

  const response = await callGemini(prompt);

  try {
    return JSON.parse(response);
  } catch (error) {
    console.error("Quiz parse error:", error);
    return null;
  }
}