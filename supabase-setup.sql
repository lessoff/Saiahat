-- Run this in the Supabase SQL Editor after running Drizzle migrations
-- This trigger syncs auth.users → public.users on signup

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create storage buckets (run once)
INSERT INTO storage.buckets (id, name, public) VALUES ('tour-images', 'tour-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('review-images', 'review-images', true);

-- Storage policies: anyone can read, authenticated users can upload
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id IN ('tour-images', 'review-images'));
CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND bucket_id IN ('tour-images', 'review-images'));
