import { persistSignupRequest } from "@/lib/forms/persistence";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (
    !payload ||
    !payload.email ||
    !payload.studioName ||
    !payload.website ||
    !payload.fullName ||
    !payload.bio
  ) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  const services = Array.isArray(payload.services)
    ? payload.services.filter((service: unknown): service is string => typeof service === "string")
    : [];

  const result = await persistSignupRequest({
    fullName: payload.fullName,
    studioName: payload.studioName,
    email: payload.email,
    location: payload.location,
    website: payload.website,
    services,
    bio: payload.bio
  });

  if (!result.ok) {
    return new Response(
      JSON.stringify({ ok: false, error: result.code, message: result.message }),
      {
        status: result.status,
        headers: { "content-type": "application/json" }
      }
    );
  }

  return new Response(
    JSON.stringify({ ok: true, requestId: result.id, studioSlug: result.studioSlug }),
    {
      status: 200,
      headers: { "content-type": "application/json" }
    }
  );
}
