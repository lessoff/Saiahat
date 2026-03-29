"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { PostCard, type Post } from "./post-card";
import { CreatePostForm } from "./create-post-form";
import Link from "next/link";

interface CommunityFeedProps {
  initialPosts: Post[];
}

export function CommunityFeed({ initialPosts }: CommunityFeedProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  function handleNewPost(post: Post) {
    setPosts((prev) => [post, ...prev]);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Create post — only for signed-in users */}
      {isLoggedIn === true && <CreatePostForm onPost={handleNewPost} />}

      {isLoggedIn === false && (
        <div className="rounded-2xl border border-sand-200 bg-sand-50 p-6 text-center">
          <p className="mb-3 text-sm text-sand-600">
            Sign in to share your own travel moments with the community.
          </p>
          <Link
            href="/login"
            className="inline-flex h-9 items-center rounded-full bg-terracotta-500 px-5 text-sm font-medium text-white transition-colors hover:bg-terracotta-600"
          >
            Sign In to Post
          </Link>
        </div>
      )}

      {/* Feed */}
      {posts.length === 0 ? (
        <p className="py-12 text-center text-sm text-sand-400">
          No posts yet. Be the first to share your experience!
        </p>
      ) : (
        <div className="space-y-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
