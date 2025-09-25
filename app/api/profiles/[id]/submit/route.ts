import { queueNotification } from "@/lib/notifications";

export async function POST() {
  await queueNotification("profile.submit.review", { state: "UNDER_REVIEW" });
  return new Response(
    JSON.stringify({
      state: "UNDER_REVIEW"
    }),
    {
      headers: { "content-type": "application/json" }
    }
  );
}
