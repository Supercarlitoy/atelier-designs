"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";

interface Profile {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export default function SupabaseClientExample() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const supabase = createClient();

  const fetchProfiles = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .limit(10);

      if (error) throw error;
      setProfiles(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  // Fetch profiles on component mount
  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const addProfile = async (name: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .insert([{ name, email }])
        .select();

      if (error) throw error;
      
      // Update local state
      if (data) {
        setProfiles(prev => [...prev, ...data]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add profile");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-600 text-sm mt-1">{error}</p>
          <button
            onClick={fetchProfiles}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Client-Side Supabase Example</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Profiles ({profiles.length})</h3>
        {profiles.length === 0 ? (
          <p className="text-gray-500">No profiles found</p>
        ) : (
          <div className="space-y-2">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="p-3 border border-gray-200 rounded-md"
              >
                <div className="font-medium">{profile.name}</div>
                <div className="text-sm text-gray-600">{profile.email}</div>
                <div className="text-xs text-gray-400">
                  {new Date(profile.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => addProfile("Test User", "test@example.com")}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Test Profile
      </button>
    </div>
  );
}
