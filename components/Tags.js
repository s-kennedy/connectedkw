import Link from 'next/link';

export default function Location({ feature }) {
  const text = feature.tags.map(t => t.name).filter(i => i).join(", ")

  return (
      <div className="mb-1 text-sm flex">
        <span className="w-5">✅</span>
        {text}
      </div>
  )
}
