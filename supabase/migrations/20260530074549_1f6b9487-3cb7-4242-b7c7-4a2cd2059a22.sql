
-- Restrict SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- Replace broad storage SELECT with object-id-based access (avoid bucket listing)
DROP POLICY IF EXISTS "journal_media_public_read" ON storage.objects;
DROP POLICY IF EXISTS "avatars_public_read" ON storage.objects;
-- Public buckets still serve files via public URL; remove SELECT policy to disable listing via API.
-- (Public URL access goes through the storage CDN and does not require SELECT on storage.objects.)
