import Link from "next/link";

export default function ResourceCard({ resource }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold"><Link href={`/resources/${resource.id}`}>{resource.title}</Link></h3>
          <p className="text-sm text-gray-500">{resource.description}</p>
        </div>
        <div className="text-sm text-gray-400">{resource.category}</div>
      </div>
      <div className="mt-3">
        <a href={resource.url} target="_blank" rel="noreferrer" className="text-blue-600">访问站点 →</a>
      </div>
    </div>
  );
}
