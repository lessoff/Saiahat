import { getCommunityPosts } from "@/lib/queries/community";
import { CommunityFeed } from "@/components/community/community-feed";

export default async function CommunityPage() {
  const posts = await getCommunityPosts();

  return (
    <div className="min-h-screen bg-sand-50 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-500">
            Traveler Stories
          </p>
          <h1 className="text-3xl font-bold text-sand-900 sm:text-4xl">Community</h1>
          <p className="mt-3 text-sand-500">
            Real moments from real explorers. Share yours.
          </p>
        </div>

        <CommunityFeed initialPosts={posts} />
      </div>
    </div>
  );
}
