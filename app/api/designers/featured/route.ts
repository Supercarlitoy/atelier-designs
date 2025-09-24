import seed from "@/data/featured-designers.seed.json";

export async function GET() {
  return Response.json(seed);
}
