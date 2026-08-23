import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(r => setUser(r.data?.user ?? null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="text-xl font-bold">资源汇集</a>
        </Link>
        <div className="space-x-4">
          <Link href="/resources"><a className="text-gray-700 hover:text-black">资源</a></Link>
          <Link href="/submit"><a className="text-gray-700 hover:text-black">投稿</a></Link>
          {user ? (
            <>
              <span className="text-gray-600">{user.email}</span>
              <button onClick={signOut} className="ml-2 px-3 py-1 bg-red-500 text-white rounded">登出</button>
            </>
          ) : (
            <Link href="/login"><a className="px-3 py-1 bg-blue-600 text-white rounded">登录 / 注册</a></Link>
          )}
        </div>
      </div>
    </nav>
  );
}
