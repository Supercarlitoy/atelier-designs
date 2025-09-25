export async function queueNotification(event: string, payload: Record<string, unknown>) {
  // Placeholder for email/Slack integration.
  console.info(`[notification] ${event}`, payload);
}
