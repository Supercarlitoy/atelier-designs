import { persistLead } from "@/lib/forms/persistence";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || !payload.name || !payload.email || !payload.brief || !payload.consent) {
    return new Response(JSON.stringify({ ok: false, error: "invalid_payload" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }

  const result = await persistLead({
    name: payload.name,
    email: payload.email,
    organisation: payload.organisation,
    brief: payload.brief,
    consent: Boolean(payload.consent),
    services: Array.isArray(payload.services) ? payload.services : [],
    source: payload.source ?? "contact_form"
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
