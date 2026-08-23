import NavBar from "../components/NavBar";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function signIn() {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) alert(error.message); else {
      alert("已发送登录链接到邮箱（Supabase OTP）。");
      router.push("/");
    }
  }

  return (
    <>
      <NavBar />
      <main className="max-w-md mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold">登录 / 注册</h2>
        <div className="mt-4 space-y-3">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="你的邮箱"
            className="w-full border rounded p-2" />
          <button onClick={signIn} className="w-full bg-blue-600 text-white py-2 rounded">发送登录邮件</button>
        </div>
      </main>
    </>
  );
}
