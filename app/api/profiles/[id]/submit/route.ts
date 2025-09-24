export async function POST() {
  return new Response(
    JSON.stringify({
      state: "UNDER_REVIEW"
    }),
    {
      headers: { "content-type": "application/json" }
    }
  );
}
