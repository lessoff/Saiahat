export const dynamic = "force-dynamic";

import { db } from "@/db";
import { communityPosts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { CommunityFeed } from "@/components/community/community-feed";
import type { Post } from "@/components/community/post-card";

export default async function CommunityPage() {
  let posts: Post[] = [];

  try {
    const rows = await db
      .select({
        id: communityPosts.id,
        content: communityPosts.content,
        mediaUrls: communityPosts.mediaUrls,
        createdAt: communityPosts.createdAt,
        user: {
          id: users.id,
          name: users.name,
          avatarUrl: users.avatarUrl,
        },
      })
      .from(communityPosts)
      .innerJoin(users, eq(communityPosts.userId, users.id))
      .orderBy(desc(communityPosts.createdAt));

    posts = rows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    }));
  } catch {
    // DB unavailable — show empty feed
  }

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
