import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

interface Profile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  created_at: string;
}

export default async function SupabaseServerExample() {
  const cookieStore = await cookies();
  const supabase = await createClient();

  // Server-side data fetching
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("*")
    .limit(5);

  const { data: caseStudies, error: caseStudiesError } = await supabase
    .from("case_studies")
    .select("*")
    .limit(5);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Server-Side Supabase Example</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Profiles Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Profiles</h2>
          {profilesError ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600">Error loading profiles: {profilesError.message}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {profiles?.length === 0 ? (
                <p className="text-gray-500">No profiles found</p>
              ) : (
                profiles?.map((profile: Profile) => (
                  <div
                    key={profile.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <h3 className="font-medium">{profile.name}</h3>
                    <p className="text-sm text-gray-600">{profile.email}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(profile.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Case Studies Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Case Studies</h2>
          {caseStudiesError ? (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-600">Error loading case studies: {caseStudiesError.message}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {caseStudies?.length === 0 ? (
                <p className="text-gray-500">No case studies found</p>
              ) : (
                caseStudies?.map((study: CaseStudy) => (
                  <div
                    key={study.id}
                    className="p-4 border border-gray-200 rounded-lg"
                  >
                    <h3 className="font-medium">{study.title}</h3>
                    <p className="text-sm text-gray-600">Client: {study.client}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created: {new Date(study.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Server Info */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <h3 className="font-medium text-blue-800">Server-Side Rendering</h3>
        <p className="text-blue-600 text-sm mt-1">
          This data was fetched on the server using the Supabase server client.
          The page is pre-rendered with the data, improving SEO and initial load performance.
        </p>
      </div>
    </div>
  );
}