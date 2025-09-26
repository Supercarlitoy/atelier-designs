import { persistClaimRequest } from "@/lib/forms/persistence";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || !payload.profileSlug || !payload.email || !payload.fullName) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  const result = await persistClaimRequest({
    profileSlug: payload.profileSlug,
    profileId: payload.profileId,
    fullName: payload.fullName,
    email: payload.email,
    proof: payload.proof,
    source: "claim_form"
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

  return new Response(JSON.stringify({ ok: true, id: result.id }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
}
