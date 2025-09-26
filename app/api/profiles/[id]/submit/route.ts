export async function POST() {
  return new Response(
    JSON.stringify({ ok: true, state: "UNDER_REVIEW" }),
    {
      status: 200,
      headers: { "content-type": "application/json" }
    }
  );
}
