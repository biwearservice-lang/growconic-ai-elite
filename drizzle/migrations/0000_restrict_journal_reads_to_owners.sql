REVOKE SELECT ON TABLE public.likes, public.journal_posts, public.profiles, public.comments FROM anon;

DROP POLICY IF EXISTS likes_select_all ON public.likes;
CREATE POLICY likes_select_owner_or_admin ON public.likes
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS posts_select_all ON public.journal_posts;
CREATE POLICY posts_select_owner_or_admin ON public.journal_posts
  FOR SELECT TO authenticated
  USING (auth.uid() = author_id OR public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS profiles_select_all ON public.profiles;
CREATE POLICY profiles_select_self_or_admin ON public.profiles
  FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'::public.app_role));

DROP POLICY IF EXISTS comments_select_all ON public.comments;
CREATE POLICY comments_select_owner_or_admin ON public.comments
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'::public.app_role));