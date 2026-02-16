import { supabase } from "@/lib/supabaseClient";

export type PageSlug = "beranda" | "profil" | "tata-kelola" | "ppid" | "berita" | "kontak";

export interface SiteContentRow {
  page_slug: PageSlug;
  content: unknown;
  updated_at?: string;
}

const TABLE_NAME = "site_content";

function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }
  return supabase;
}

export async function getPageContent(pageSlug: PageSlug) {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from(TABLE_NAME)
    .select("page_slug, content, updated_at")
    .eq("page_slug", pageSlug)
    .maybeSingle();

  if (error) throw error;
  return data as SiteContentRow | null;
}

export async function upsertPageContent(pageSlug: PageSlug, content: unknown) {
  const sb = requireSupabase();
  const { data, error } = await sb
    .from(TABLE_NAME)
    .upsert({ page_slug: pageSlug, content }, { onConflict: "page_slug" })
    .select("page_slug, content, updated_at")
    .single();

  if (error) throw error;
  return data as SiteContentRow;
}

export async function deletePageContent(pageSlug: PageSlug) {
  const sb = requireSupabase();
  const { error } = await sb.from(TABLE_NAME).delete().eq("page_slug", pageSlug);
  if (error) throw error;
}
