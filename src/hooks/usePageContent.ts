import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPageContent, type PageSlug, upsertPageContent } from "@/lib/siteContent";
import { isSupabaseConfigured } from "@/lib/supabaseClient";

export function usePageContent<TDefault extends object>(pageSlug: PageSlug, defaultContent: TDefault) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["page-content", pageSlug],
    queryFn: () => getPageContent(pageSlug),
    enabled: isSupabaseConfigured,
  });

  const mergedContent = (query.data?.content && typeof query.data.content === "object")
    ? ({ ...defaultContent, ...(query.data.content as Record<string, unknown>) } as TDefault)
    : defaultContent;

  const save = async (content: unknown) => {
    const saved = await upsertPageContent(pageSlug, content);
    queryClient.setQueryData(["page-content", pageSlug], saved);
    return saved;
  };

  return {
    ...query,
    content: mergedContent,
    raw: query.data?.content ?? null,
    save,
  };
}
