import type { APIRoute } from "astro";
import {
  getEssayViews,
  incrementEssayViews,
} from "@/server-side/essay-views";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get("id");
  if (!id?.trim()) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const views = await getEssayViews(id.trim());
  return new Response(JSON.stringify({ views }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export const POST: APIRoute = async ({ request }) => {
  let body: { id?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const id = body.id?.trim();
  if (!id) {
    return new Response(JSON.stringify({ error: "Missing id" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const views = await incrementEssayViews(id);
  return new Response(JSON.stringify({ views }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
