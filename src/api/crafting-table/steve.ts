import { APIRoute } from "astro";
import { sendPrompt } from "../../utils/ai_client";
import * as fs from "fs/promises";
import * as path from "path";


const TEMPERATURE_BY_PLATFORM = {
  instagram_tiktok: 0.9,
  linkedin: 0.4,
  facebook: 0.6,
  newsletter: 0.5
};

function fillPrompt(template: string, idea: string, event: any): string {
  return template
    .replace("{idea}", idea)
    .replace("{event_name}", event.event_name)
    .replace("{date}", event.date)
    .replace("{location}", event.location);
}

// POST /api/steve/captions
// Endpoint for chat interaction - generates captions for different platforms
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { 
        // idea, event_info, session_id 
    } = body;

    if (!idea || !event_info || !session_id) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 });
    }

    const promptsPath = path.resolve("components/Collectr/prompts.json");
    const rawTemplates = await fs.readFile(promptsPath, "utf-8");
    const templates = JSON.parse(rawTemplates);

    const captions: Record<string, string> = {};

    for (const platform of Object.keys(templates)) {
      const template = templates[platform];
      const filled = fillPrompt(template, idea, event_info);
      const temperature = TEMPERATURE_BY_PLATFORM[platform] || 0.7;

      const caption = await sendPrompt({ prompt: filled, temperature });
      captions[platform] = caption;
    }

    return new Response(JSON.stringify({
      success: true,
      session_id,
      captions,
      message: "Captions generated."
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    console.error("Caption generation error:", err);
    return new Response(JSON.stringify({
      error: "Failed to generate captions",
      details: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
