export async function POST() {
  return new Response(
    JSON.stringify({
      ogUrl: "/og-template.png"
    }),
    {
      headers: { "content-type": "application/json" }
    }
  );
}
