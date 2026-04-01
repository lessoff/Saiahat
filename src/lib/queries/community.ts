import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { communityPosts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Post } from "@/components/community/post-card";

export const getCommunityPosts = unstable_cache(
  async (): Promise<Post[]> => {
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

      return rows.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
      }));
    } catch {
      return [];
    }
  },
  ["community-posts"],
  { tags: ["community-posts"], revalidate: 120 }
);
