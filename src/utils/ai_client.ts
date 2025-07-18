import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

type PromptParams = {
  system: string;
  user: string;
  temperature?: number;
  max_tokens?: number;
};

export async function sendPrompt({
  system,
  user,
  temperature = 0.8,
  max_tokens = 300
}: PromptParams): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ],
      temperature,
      max_tokens
    });

    return response.choices[0].message.content?.trim() || "";
  } catch (error) {
    console.error("AI request failed:", error);
    throw new Error("Failed to generate AI response");
  }
}
