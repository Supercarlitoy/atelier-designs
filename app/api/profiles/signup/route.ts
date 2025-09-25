import { queueNotification } from "@/lib/notifications";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || !payload.email || !payload.studioName || !payload.website) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  const draftProfile = {
    id: `draft-${Math.random().toString(36).slice(2, 8)}`,
    slug: payload.studioName
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, ""),
    name: payload.studioName,
    state: "DRAFT",
    createdAt: new Date().toISOString()
  };

  await queueNotification("profile.signup.created", {
    email: payload.email,
    studioName: payload.studioName,
    profileId: draftProfile.id
  });

  return new Response(JSON.stringify({ ok: true, profile: draftProfile }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
