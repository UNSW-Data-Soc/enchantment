import type { APIRoute } from "astro";
import { sendPrompt } from "../../utils/ai_client";
import * as fs from "fs/promises";
import * as path from "path";

const TEMPLATE_PATH = path.resolve("../../components/collectr_prompts/platform_templates.json");

const TEMPERATURE_BY_PLATFORM: Record<string, number> = {
  instagram_tiktok: 0.9,
  linkedin: 0.4,
  facebook: 0.6,
  newsletter: 0.5
};

function fillTemplate(template: string, idea: string, event: Record<string, string>): string {
  return template
    .replace("{idea}", idea)
    .replace("{event_name}", event.event_name || "")
    .replace("{date}", event.date || "")
    .replace("{location}", event.location || "");
}

type SteveRequestBody = {
  idea: string;
  event_name: string;
  date?: string;
  location?: string;
  platforms?: string[];
};

// Platform specific caption creation
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = (await request.json()) as SteveRequestBody;
    const { idea, event_name, date, location, platforms = ["instagram_tiktok", "linkedin", "facebook", "newsletter"] } = body;

    if (!idea || !event_name) {
      return new Response(JSON.stringify({ error: "Missing required fields: idea and event name" }), { status: 400 });
    }

    const event_info: Record<string, string> = { 
      event_name, 
      date: date || "", 
      location: location || "" 
    };

    // Read prompt templates
    const templateRaw = await fs.readFile(TEMPLATE_PATH, "utf-8");
    const templates = JSON.parse(templateRaw);

    const results: Record<string, string> = {};

    for (const platform of platforms) {
      const template = templates[platform];
      if (!template) continue;

      const userPrompt = fillTemplate(template, idea, event_info);
      const temperature = TEMPERATURE_BY_PLATFORM[platform] ?? 0.7;

      const caption = await sendPrompt({
        system: "You are an expert in writing platform-specific captions for UNSW datasoc events.",
        user: userPrompt,
        temperature,
        max_tokens: 300
      });

      results[platform] = caption;
    }

    return new Response(JSON.stringify({
      success: true,
      captions: results
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    console.error("Steve caption generation failed:", err);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to generate captions",
      details: err.message
    }), { status: 500 });
  }
};