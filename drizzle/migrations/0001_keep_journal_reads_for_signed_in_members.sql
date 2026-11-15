DROP POLICY IF EXISTS likes_select_owner_or_admin ON public.likes;
CREATE POLICY likes_select_authenticated ON public.likes
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS posts_select_owner_or_admin ON public.journal_posts;
CREATE POLICY posts_select_authenticated ON public.journal_posts
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS profiles_select_self_or_admin ON public.profiles;
CREATE POLICY profiles_select_authenticated ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS comments_select_owner_or_admin ON public.comments;
CREATE POLICY comments_select_authenticated ON public.comments
  FOR SELECT TO authenticated
  USING (auth.uid() IS NOT NULL);