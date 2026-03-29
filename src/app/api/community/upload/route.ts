import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
  const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

  if (!isImage && !isVideo) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM, MOV" },
      { status: 400 }
    );
  }

  const maxSize = isVideo ? MAX_VIDEO_SIZE : MAX_IMAGE_SIZE;
  if (file.size > maxSize) {
    return NextResponse.json(
      { error: `File too large. Max ${isVideo ? "100MB" : "10MB"}.` },
      { status: 400 }
    );
  }

  const ext = file.name.split(".").pop();
  const fileName = `${user.id}/${Date.now()}.${ext}`;

  const { error } = await supabase.storage
    .from("community")
    .upload(fileName, file, { contentType: file.type });

  if (error) {
    return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = supabase.storage.from("community").getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrl, type: isVideo ? "video" : "image" });
}
