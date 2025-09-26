import { createClient } from "@/utils/supabase/client";
import { createClient as createServerClient } from "@/utils/supabase/server";

// Types based on your existing data structure
interface Profile {
  id: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  website?: string;
  instagram?: string;
  created_at: string;
  updated_at: string;
}

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  description: string;
  image_url?: string;
  tags?: string[];
  created_at: string;
}

// Client-side queries (for use in components)
export const clientQueries = {
  // Get all profiles with optional filtering
  async getProfiles(filters?: { location?: string; limit?: number }) {
    const supabase = createClient();
    let query = supabase.from("profiles").select("*");
    
    if (filters?.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }
    
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }
    
    return query.order("created_at", { ascending: false });
  },

  // Get single profile by ID
  async getProfile(id: string) {
    const supabase = createClient();
    return supabase
      .from("profiles")
      .select("*")
      .eq("id", id)
      .single();
  },

  // Search profiles by name or bio
  async searchProfiles(searchTerm: string) {
    const supabase = createClient();
    return supabase
      .from("profiles")
      .select("*")
      .or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%`)
      .limit(20);
  },

  // Get case studies with optional client filter
  async getCaseStudies(clientFilter?: string) {
    const supabase = createClient();
    let query = supabase.from("case_studies").select("*");
    
    if (clientFilter) {
      query = query.ilike("client", `%${clientFilter}%`);
    }
    
    return query.order("created_at", { ascending: false });
  },

  // Create new profile
  async createProfile(profileData: Omit<Profile, "id" | "created_at" | "updated_at">) {
    const supabase = createClient();
    return supabase
      .from("profiles")
      .insert([profileData])
      .select();
  },

  // Update profile
  async updateProfile(id: string, updates: Partial<Profile>) {
    const supabase = createClient();
    return supabase
      .from("profiles")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();
  },

  // Delete profile
  async deleteProfile(id: string) {
    const supabase = createClient();
    return supabase
      .from("profiles")
      .delete()
      .eq("id", id);
  }
};

// Server-side queries (for use in API routes and server components)
export const serverQueries = {
  // Get featured profiles (server-side)
  async getFeaturedProfiles(limit = 6) {
    const supabase = await createServerClient();
    return supabase
      .from("profiles")
      .select("*")
      .eq("featured", true)
      .limit(limit)
      .order("created_at", { ascending: false });
  },

  // Get profiles with pagination (server-side)
  async getProfilesPaginated(page = 1, pageSize = 10) {
    const supabase = await createServerClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    return supabase
      .from("profiles")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("created_at", { ascending: false });
  },

  // Get case studies by profile ID
  async getCaseStudiesByProfile(profileId: string) {
    const supabase = await createServerClient();
    return supabase
      .from("case_studies")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false });
  },

  // Advanced search with multiple filters
  async advancedSearch(filters: {
    searchTerm?: string;
    location?: string;
    tags?: string[];
    dateFrom?: string;
    dateTo?: string;
  }) {
    const supabase = await createServerClient();
    let query = supabase.from("profiles").select("*");
    
    if (filters.searchTerm) {
      query = query.or(`name.ilike.%${filters.searchTerm}%,bio.ilike.%${filters.searchTerm}%`);
    }
    
    if (filters.location) {
      query = query.ilike("location", `%${filters.location}%`);
    }
    
    if (filters.dateFrom) {
      query = query.gte("created_at", filters.dateFrom);
    }
    
    if (filters.dateTo) {
      query = query.lte("created_at", filters.dateTo);
    }
    
    return query.order("created_at", { ascending: false });
  }
};

// Real-time subscriptions (client-side only)
export const subscriptions = {
  // Subscribe to profile changes
  subscribeToProfiles(callback: (payload: any) => void) {
    const supabase = createClient();
    return supabase
      .channel("profiles")
      .on("postgres_changes", 
        { event: "*", schema: "public", table: "profiles" },
        callback
      )
      .subscribe();
  },

  // Subscribe to case study changes
  subscribeToCaseStudies(callback: (payload: any) => void) {
    const supabase = createClient();
    return supabase
      .channel("case_studies")
      .on("postgres_changes",
        { event: "*", schema: "public", table: "case_studies" },
        callback
      )
      .subscribe();
  }
};

// Utility functions
export const utils = {
  // Handle Supabase errors consistently
  handleError(error: any) {
    console.error("Supabase error:", error);
    return {
      message: error.message || "An unexpected error occurred",
      code: error.code || "UNKNOWN_ERROR"
    };
  },

  // Format profile data for display
  formatProfile(profile: Profile) {
    return {
      ...profile,
      displayName: profile.name || "Anonymous",
      shortBio: profile.bio ? profile.bio.substring(0, 100) + "..." : "",
      joinedDate: new Date(profile.created_at).toLocaleDateString()
    };
  }
};