import { queueNotification } from "@/lib/notifications";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || !payload.profileSlug || !payload.email) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  await queueNotification("profile.claim.requested", {
    profileSlug: payload.profileSlug,
    email: payload.email,
    fullName: payload.fullName,
    proof: payload.proof
  });
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
