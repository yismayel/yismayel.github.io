import NavBar from "../components/NavBar";
import ResourceCard from "../components/ResourceCard";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    const { data } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setResources(data || []);
  }

  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">收录各种网站资源</h1>
          <div className="text-gray-500">按分类、标签、热度排序（可扩展）</div>
        </header>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map(r => <ResourceCard key={r.id} resource={r} />)}
        </section>
      </main>
    </>
  );
}
