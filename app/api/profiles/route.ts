export async function POST() {
  return new Response(
    JSON.stringify({
      profile_id: "stub",
      state: "DRAFT"
    }),
    {
      headers: { "content-type": "application/json" }
    }
  );
}
