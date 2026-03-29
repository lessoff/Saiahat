import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/db";
import { communityPosts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  const posts = await db
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

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { content, mediaUrls } = await request.json();

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "Content is required" }, { status: 400 });
  }

  const [post] = await db
    .insert(communityPosts)
    .values({
      userId: user.id,
      content: content.trim(),
      mediaUrls: Array.isArray(mediaUrls) ? mediaUrls : [],
    })
    .returning();

  // Fetch with user info
  const [full] = await db
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
    .where(eq(communityPosts.id, post.id));

  return NextResponse.json(full, { status: 201 });
}
