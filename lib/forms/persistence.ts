import { queueNotification } from "@/lib/notifications";
import { getSupabaseAdmin, SupabaseConfigError } from "@/utils/supabase/admin";

const ONE_HOUR_MS = 60 * 60 * 1000;
const SIX_HOURS_MS = 6 * ONE_HOUR_MS;
const TEN_MINUTES_MS = 10 * 60 * 1000;

type PersistenceErrorCode =
  | "duplicate_submission"
  | "supabase_error"
  | "configuration_error";

type PersistenceFailure = {
  ok: false;
  status: number;
  code: PersistenceErrorCode;
  message: string;
};

type ClaimInput = {
  profileSlug: string;
  profileId?: string;
  fullName: string;
  email: string;
  proof?: string;
  source?: string;
};

type SignupInput = {
  fullName: string;
  studioName: string;
  email: string;
  location?: string;
  website: string;
  services: string[];
  bio: string;
};

type ContactInput = {
  name: string;
  email: string;
  organisation?: string;
  brief: string;
  consent: boolean;
  services?: string[];
  source?: string;
};

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const slugify = (value: string) =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const toFailure = (
  status: number,
  code: PersistenceErrorCode,
  message: string
): PersistenceFailure => ({ ok: false, status, code, message });

export type PersistenceResult<T extends Record<string, unknown>> =
  | ({ ok: true } & T)
  | PersistenceFailure;

export async function persistClaimRequest(
  input: ClaimInput
): Promise<PersistenceResult<{ id: string; submittedAt: string }>> {
  try {
    const supabase = getSupabaseAdmin();
    const emailNormalized = normalizeEmail(input.email);
    const coolingThreshold = new Date(Date.now() - ONE_HOUR_MS).toISOString();

    const { data: existing, error: existingError } = await supabase
      .from("leads")
      .select("id, \"createdAt\"")
      .eq("source", input.source ?? "claim_form")
      .eq("email", emailNormalized)
      .gte("createdAt", coolingThreshold)
      .maybeSingle();

    if (existingError && existingError.code !== "PGRST116") {
      console.error("supabase.claimRequest.check", existingError);
      return toFailure(500, "supabase_error", "Unable to check existing claim requests");
    }

    if (existing) {
      return toFailure(409, "duplicate_submission", "A claim with this email was recently submitted.");
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: input.fullName,
        email: emailNormalized,
        company: input.profileSlug,
        message: JSON.stringify({ proof: input.proof ?? "", profileId: input.profileId ?? null }),
        source: input.source ?? "claim_form",
        status: "new"
      })
      .select("id, \"createdAt\"")
      .single();

    if (error || !data) {
      console.error("supabase.claimRequest.insert", error);
      return toFailure(500, "supabase_error", "Could not submit claim right now.");
    }

    await queueNotification("profile.claim.requested", {
      profileSlug: input.profileSlug,
      email: input.email,
      fullName: input.fullName,
      proof: input.proof
    });

    return { ok: true, id: data.id, submittedAt: data.createdAt ?? new Date().toISOString() };
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      return toFailure(503, "configuration_error", "Supabase configuration missing");
    }
    console.error("claimRequest.unhandled", error);
    return toFailure(500, "supabase_error", "Unexpected error submitting claim.");
  }
}

export async function persistSignupRequest(
  input: SignupInput
): Promise<PersistenceResult<{ id: string; studioSlug: string; submittedAt: string }>> {
  try {
    const supabase = getSupabaseAdmin();
    const emailNormalized = normalizeEmail(input.email);
    const studioSlug = slugify(input.studioName);
    const coolingThreshold = new Date(Date.now() - SIX_HOURS_MS).toISOString();

    const { data: existing, error: existingError } = await supabase
      .from("leads")
      .select("id, \"createdAt\"")
      .eq("source", "signup_form")
      .or(`email.eq.${emailNormalized},company.eq.${studioSlug}`)
      .gte("createdAt", coolingThreshold)
      .limit(1)
      .maybeSingle();

    if (existingError && existingError.code !== "PGRST116") {
      console.error("supabase.signupRequest.check", existingError);
      return toFailure(500, "supabase_error", "Unable to check existing signup requests");
    }

    if (existing) {
      return toFailure(409, "duplicate_submission", "A signup request already exists for this studio or email.");
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: input.fullName,
        email: emailNormalized,
        company: studioSlug,
        message: JSON.stringify({
          studioName: input.studioName,
          services: input.services,
          location: input.location ?? "",
          website: input.website,
          bio: input.bio
        }),
        source: "signup_form",
        status: "new"
      })
      .select("id, \"createdAt\"")
      .single();

    if (error || !data) {
      console.error("supabase.signupRequest.insert", error);
      return toFailure(500, "supabase_error", "Could not create signup request right now.");
    }

    await queueNotification("profile.signup.created", {
      email: input.email,
      studioName: input.studioName,
      profileId: data.id,
      studioSlug
    });

    return {
      ok: true,
      id: data.id,
      studioSlug,
      submittedAt: data.createdAt ?? new Date().toISOString()
    };
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      return toFailure(503, "configuration_error", "Supabase configuration missing");
    }
    console.error("signupRequest.unhandled", error);
    return toFailure(500, "supabase_error", "Unexpected error submitting signup.");
  }
}

export async function persistLead(
  input: ContactInput
): Promise<PersistenceResult<{ id: string; submittedAt: string }>> {
  try {
    const supabase = getSupabaseAdmin();
    const emailNormalized = normalizeEmail(input.email);
    const coolingThreshold = new Date(Date.now() - TEN_MINUTES_MS).toISOString();

    const { data: existing, error: existingError } = await supabase
      .from("leads")
      .select("id, \"createdAt\"")
      .eq("source", input.source ?? "contact_form")
      .eq("email", emailNormalized)
      .gte("createdAt", coolingThreshold)
      .maybeSingle();

    if (existingError && existingError.code !== "PGRST116") {
      console.error("supabase.lead.check", existingError);
      return toFailure(500, "supabase_error", "Unable to check recent enquiries");
    }

    if (existing) {
      return toFailure(409, "duplicate_submission", "We already received a recent enquiry from this email.");
    }

    const { data, error } = await supabase
      .from("leads")
      .insert({
        name: input.name,
        email: emailNormalized,
        company: input.organisation ?? "",
        message: input.brief,
        source: input.source ?? "contact_form",
        status: "new"
      })
      .select("id, \"createdAt\"")
      .single();

    if (error || !data) {
      console.error("supabase.lead.insert", error);
      return toFailure(500, "supabase_error", "Could not submit enquiry right now.");
    }

    await queueNotification("lead.capture.created", {
      email: input.email,
      name: input.name,
      organisation: input.organisation,
      source: input.source ?? "contact_form"
    });

    return { ok: true, id: data.id, submittedAt: data.createdAt ?? new Date().toISOString() };
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      return toFailure(503, "configuration_error", "Supabase configuration missing");
    }
    console.error("lead.unhandled", error);
    return toFailure(500, "supabase_error", "Unexpected error submitting enquiry.");
  }
}
