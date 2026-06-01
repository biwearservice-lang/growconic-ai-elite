import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Search, Heart, MessageCircle, ImagePlus, LogIn, LogOut, X, Send, Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

type Profile = { id: string; username: string | null; avatar_url: string | null };
type Post = {
  id: string;
  title: string;
  content: string;
  media_urls: { url: string; type: "image" | "video" }[];
  created_at: string;
  author_id: string;
  profile?: Profile | null;
  likes_count: number;
  comments_count: number;
  liked_by_me: boolean;
};
type Comment = { id: string; content: string; created_at: string; user_id: string; profile?: Profile | null };

const IMRAN_EMAIL = "imran@growconic.local";

const Splash = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* radial purple glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(270_91%_30%/0.5),transparent_60%)]" />
      {/* particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0 }}
          animate={{ y: window.innerHeight + 20, opacity: [0, 1, 0] }}
          transition={{ duration: 2.4 + Math.random() * 1.5, delay: Math.random() * 0.6, ease: "linear" }}
          className="absolute w-1 h-1 rounded-full bg-[#f5c542] shadow-[0_0_8px_#f5c542]"
        />
      ))}
      <motion.h1
        initial={{ scale: 0.6, opacity: 0, letterSpacing: "0.5em" }}
        animate={{ scale: 1, opacity: 1, letterSpacing: "0.04em" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative font-display text-5xl md:text-7xl font-black text-center"
        style={{
          backgroundImage:
            "linear-gradient(120deg, #b8862a 0%, #f5c542 25%, #fff3b0 45%, #f5c542 65%, #b8862a 100%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          filter: "drop-shadow(0 0 30px rgba(245,197,66,0.45))",
          animation: "shimmer 2.4s linear infinite",
        }}
      >
        Imran's Journal
      </motion.h1>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-1/2 translate-y-16 w-48 h-px bg-gradient-to-r from-transparent via-[#f5c542] to-transparent origin-center"
      />
    </motion.div>
  );
};

const AuthModal = ({ onClose, onAuthed }: { onClose: () => void; onAuthed: () => void }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Allow "Imran" to log in as admin
      const email = identifier.trim().toLowerCase() === "imran"
        ? IMRAN_EMAIL
        : identifier.trim();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/journal",
            data: { username: username || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Account created");
      }
      onAuthed();
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl bg-[#0a0a0f] border border-purple-500/20 p-8 shadow-[0_0_60px_rgba(168,85,247,0.15)]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X size={20} />
        </button>
        <h2 className="font-display text-2xl font-bold mb-1 text-foreground">
          {mode === "login" ? "Sign in" : "Create account"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "login" ? "Sign in to like & comment" : "Join to like and comment on journals"}
        </p>
        <form onSubmit={submit} className="space-y-3">
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Email (or 'Imran' for owner)"
            required
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-foreground"
          />
          {mode === "signup" && (
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-foreground"
            />
          )}
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg bg-black/50 border border-purple-500/20 focus:border-purple-500/60 outline-none text-foreground"
          />
          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>
        <button
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 text-sm text-muted-foreground hover:text-foreground w-full text-center"
        >
          {mode === "login" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </motion.div>
    </motion.div>
  );
};

const Composer = ({ onPosted, userId }: { onPosted: () => void; userId: string }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [posting, setPosting] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setPosting(true);
    try {
      const media: { url: string; type: "image" | "video" }[] = [];
      for (const file of files) {
        const path = `${userId}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const { error } = await supabase.storage.from("journal-media").upload(path, file);
        if (error) throw error;
        const { data } = supabase.storage.from("journal-media").getPublicUrl(path);
        media.push({ url: data.publicUrl, type: file.type.startsWith("video") ? "video" : "image" });
      }
      const { error } = await supabase.from("journal_posts").insert({
        author_id: userId,
        title,
        content,
        media_urls: media,
      });
      if (error) throw error;
      setTitle(""); setContent(""); setFiles([]);
      toast.success("Posted");
      onPosted();
    } catch (err: any) {
      toast.error(err.message || "Could not post");
    } finally {
      setPosting(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-2xl bg-[#0d0a17] border border-purple-500/20 p-5 mb-8">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Today's title..."
        className="w-full bg-transparent text-xl font-display font-semibold outline-none placeholder:text-muted-foreground mb-3"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What happened today?"
        rows={3}
        className="w-full bg-transparent outline-none placeholder:text-muted-foreground resize-none text-foreground"
      />
      {files.length > 0 && (
        <div className="text-xs text-muted-foreground mt-2">{files.length} file(s) attached</div>
      )}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-purple-500/10">
        <label className="cursor-pointer flex items-center gap-2 text-sm text-purple-300 hover:text-purple-200">
          <ImagePlus size={18} />
          <span>Photos / Videos</span>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => setFiles(Array.from(e.target.files || []))}
          />
        </label>
        <button
          disabled={posting}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-400 text-white font-semibold disabled:opacity-50 flex items-center gap-2"
        >
          {posting && <Loader2 className="w-4 h-4 animate-spin" />}
          Post
        </button>
      </div>
    </form>
  );
};

const Comments = ({ postId, user }: { postId: string; user: User | null }) => {
  const [items, setItems] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: cmts } = await supabase
      .from("comments")
      .select("id, content, created_at, user_id")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    const ids = Array.from(new Set((cmts || []).map((c) => c.user_id)));
    const { data: profs } = ids.length
      ? await supabase.from("profiles").select("id, username, avatar_url").in("id", ids)
      : { data: [] as Profile[] };
    const map = new Map((profs || []).map((p) => [p.id, p as Profile]));
    setItems((cmts || []).map((c) => ({ ...c, profile: map.get(c.user_id) || null })));
    setLoading(false);
  }, [postId]);

  useEffect(() => { load(); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Sign in to comment");
    if (!text.trim()) return;
    const { error } = await supabase.from("comments").insert({ post_id: postId, user_id: user.id, content: text });
    if (error) return toast.error(error.message);
    setText("");
    load();
  };

  return (
    <div className="mt-4 pt-4 border-t border-purple-500/10 space-y-3">
      {loading ? (
        <div className="text-sm text-muted-foreground">Loading comments…</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-muted-foreground">No comments yet.</div>
      ) : (
        items.map((c) => (
          <div key={c.id} className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-semibold text-purple-200 shrink-0 overflow-hidden">
              {c.profile?.avatar_url ? (
                <img src={c.profile.avatar_url} alt="" className="w-full h-full object-cover" />
              ) : (
                (c.profile?.username || "?").slice(0, 1).toUpperCase()
              )}
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground">
                {c.profile?.username || "user"} · {new Date(c.created_at).toLocaleString()}
              </div>
              <div className="text-sm text-foreground">{c.content}</div>
            </div>
          </div>
        ))
      )}
      <form onSubmit={submit} className="flex gap-2 pt-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={user ? "Add a comment..." : "Sign in to comment"}
          disabled={!user}
          className="flex-1 px-3 py-2 rounded-lg bg-black/40 border border-purple-500/20 outline-none text-sm disabled:opacity-50"
        />
        <button disabled={!user || !text.trim()} className="p-2 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-40">
          <Send size={16} className="text-white" />
        </button>
      </form>
    </div>
  );
};

const PostCard = ({ post, user, isAdmin, onChanged }: { post: Post; user: User | null; isAdmin: boolean; onChanged: () => void }) => {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(post.liked_by_me);
  const [count, setCount] = useState(post.likes_count);
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [saving, setSaving] = useState(false);

  const saveEdit = async () => {
    if (!editTitle.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("journal_posts")
      .update({ title: editTitle, content: editContent, updated_at: new Date().toISOString() })
      .eq("id", post.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Updated");
    setEditing(false);
    onChanged();
  };

  const deletePost = async () => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    const { error } = await supabase.from("journal_posts").delete().eq("id", post.id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    onChanged();
  };

  const toggleLike = async () => {
    if (!user) return toast.error("Sign in to like");
    if (liked) {
      setLiked(false); setCount((c) => c - 1);
      await supabase.from("likes").delete().eq("post_id", post.id).eq("user_id", user.id);
    } else {
      setLiked(true); setCount((c) => c + 1);
      await supabase.from("likes").insert({ post_id: post.id, user_id: user.id });
    }
    onChanged();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-[#0d0a17] border border-purple-500/20 p-6 mb-5 hover:border-purple-500/40 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-full bg-purple-500/20 flex items-center justify-center text-sm font-semibold text-purple-200 overflow-hidden">
          {post.profile?.avatar_url ? (
            <img src={post.profile.avatar_url} alt="" className="w-full h-full object-cover" />
          ) : (
            (post.profile?.username || "I").slice(0, 1).toUpperCase()
          )}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-foreground">{post.profile?.username || "Imran"}</div>
          <div className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleString()}</div>
        </div>
        {isAdmin && !editing && (
          <div className="flex items-center gap-1">
            <button onClick={() => setEditing(true)} title="Edit" className="p-2 rounded-lg text-muted-foreground hover:text-purple-300 hover:bg-purple-500/10 transition-colors">
              <Pencil size={16} />
            </button>
            <button onClick={deletePost} title="Delete" className="p-2 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        )}
      </div>
      {editing ? (
        <div className="mb-3 space-y-2">
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/30 outline-none text-xl font-display font-semibold text-foreground"
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-purple-500/30 outline-none resize-none text-foreground"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => { setEditing(false); setEditTitle(post.title); setEditContent(post.content); }}
              className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={saveEdit}
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-semibold disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="font-display text-2xl font-bold mb-2 text-foreground">{post.title}</h3>
          {post.content && <p className="text-muted-foreground whitespace-pre-wrap mb-3">{post.content}</p>}
        </>
      )}
      {post.media_urls?.length > 0 && (
        <div className={`grid gap-2 mb-3 ${post.media_urls.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {post.media_urls.map((m, i) =>
            m.type === "video" ? (
              <video key={i} src={m.url} controls className="rounded-lg w-full max-h-[500px] bg-black" />
            ) : (
              <img key={i} src={m.url} alt="" className="rounded-lg w-full max-h-[500px] object-cover" />
            )
          )}
        </div>
      )}
      <div className="flex items-center gap-6 pt-2">
        <button onClick={toggleLike} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <Heart size={18} className={liked ? "fill-purple-500 text-purple-500" : ""} />
          <span>{count}</span>
        </button>
        <button onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <MessageCircle size={18} />
          <span>{post.comments_count}</span>
        </button>
      </div>
      {open && <Comments postId={post.id} user={user} />}
    </motion.article>
  );
};

const Journal = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const refreshRole = useCallback(async (u: User | null) => {
    if (!u) return setIsAdmin(false);
    const { data } = await supabase.from("user_roles").select("role").eq("user_id", u.id).eq("role", "admin").maybeSingle();
    setIsAdmin(!!data);
  }, []);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setTimeout(() => refreshRole(session?.user ?? null), 0);
    });
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      refreshRole(data.session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [refreshRole]);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: rows } = await supabase
      .from("journal_posts")
      .select("id, title, content, media_urls, created_at, author_id")
      .order("created_at", { ascending: false });
    const authorIds = Array.from(new Set((rows || []).map((r) => r.author_id)));
    const { data: profs } = authorIds.length
      ? await supabase.from("profiles").select("id, username, avatar_url").in("id", authorIds)
      : { data: [] as Profile[] };
    const profMap = new Map((profs || []).map((p) => [p.id, p as Profile]));

    const postIds = (rows || []).map((r) => r.id);
    const { data: likes } = postIds.length
      ? await supabase.from("likes").select("post_id, user_id").in("post_id", postIds)
      : { data: [] as { post_id: string; user_id: string }[] };
    const { data: cmts } = postIds.length
      ? await supabase.from("comments").select("post_id").in("post_id", postIds)
      : { data: [] as { post_id: string }[] };

    const likeCount = new Map<string, number>();
    const likedMe = new Set<string>();
    (likes || []).forEach((l) => {
      likeCount.set(l.post_id, (likeCount.get(l.post_id) || 0) + 1);
      if (user && l.user_id === user.id) likedMe.add(l.post_id);
    });
    const cmtCount = new Map<string, number>();
    (cmts || []).forEach((c) => cmtCount.set(c.post_id, (cmtCount.get(c.post_id) || 0) + 1));

    setPosts(
      (rows || []).map((r) => ({
        ...(r as any),
        media_urls: (r.media_urls as any) || [],
        profile: profMap.get(r.author_id) || null,
        likes_count: likeCount.get(r.id) || 0,
        comments_count: cmtCount.get(r.id) || 0,
        liked_by_me: likedMe.has(r.id),
      }))
    );
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const filtered = posts.filter((p) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q);
  });

  return (
    <div className="min-h-screen bg-black text-foreground relative">
      <AnimatePresence>{showSplash && <Splash onDone={() => setShowSplash(false)} />}</AnimatePresence>

      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <a href="/" className="font-display text-xl font-bold bg-gradient-to-r from-[#b8862a] via-[#f5c542] to-[#b8862a] bg-clip-text text-transparent">
            Imran's Journal
          </a>
          <div className="flex-1" />
          {user ? (
            <button
              onClick={async () => { await supabase.auth.signOut(); toast.success("Signed out"); }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <LogOut size={16} /> Sign out
            </button>
          ) : (
            <button
              onClick={() => setShowAuth(true)}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white"
            >
              <LogIn size={16} /> Sign in
            </button>
          )}
        </div>
        <div className="max-w-3xl mx-auto px-4 pb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search journals..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#0d0a17] border border-purple-500/20 focus:border-purple-500/60 outline-none text-foreground"
            />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {isAdmin && user && <Composer userId={user.id} onPosted={load} />}

        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading journals…
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {search ? "No journals match your search." : "No journals yet. Check back soon."}
          </div>
        ) : (
          filtered.map((p) => <PostCard key={p.id} post={p} user={user} isAdmin={isAdmin} onChanged={load} />)
        )}
      </main>

      <AnimatePresence>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuthed={load} />}
      </AnimatePresence>
    </div>
  );
};

export default Journal;
