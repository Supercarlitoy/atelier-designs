import caseStudies from "@/data/case-studies.seed.json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get("limit");
  const limit = limitParam ? Number(limitParam) : undefined;

  if (limit && !Number.isNaN(limit)) {
    return Response.json(caseStudies.slice(0, limit));
  }

  return Response.json(caseStudies);
}
