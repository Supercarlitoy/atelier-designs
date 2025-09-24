export async function PUT(request: Request) {
  await request.json().catch(() => ({}));
  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" }
  });
}
