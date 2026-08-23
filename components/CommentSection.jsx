import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function CommentSection({ resourceId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadComments();
    supabase.auth.getUser().then(r => setUser(r.data?.user ?? null));

    const sub = supabase
      .channel('public:comments')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments', filter: `resource_id=eq.${resourceId}` }, payload => {
        setComments(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => supabase.removeChannel(sub);
  }, [resourceId]);

  async function loadComments() {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('resource_id', resourceId)
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(50);
    setComments(data || []);
  }

  async function submit() {
    if (!user) {
      alert("请先登录");
      return;
    }
    if (!text.trim()) return;
    await supabase.from('comments').insert({
      resource_id: resourceId,
      user_id: user.id,
      content: text,
      approved: false
    });
    setText("");
    alert("评论已提交，等待审核");
  }

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold">评论</h4>
      <div className="mt-3">
        {user ? (
          <>
            <textarea value={text} onChange={e => setText(e.target.value)} className="w-full border rounded p-2" rows="3" />
            <div className="mt-2">
              <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded">提交评论</button>
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-500">请登录以发表评论。</p>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {comments.map(c => (
          <div key={c.id} className="border rounded p-3">
            <div className="text-sm text-gray-600">{c.user_id} · <span className="text-xs text-gray-400">{new Date(c.created_at).toLocaleString()}</span></div>
            <div className="mt-1">{c.content}</div>
          </div>
        ))}
        {comments.length === 0 && <p className="text-gray-500">暂无评论，成为第一个评论的人吧。</p>}
      </div>
    </div>
  );
}
