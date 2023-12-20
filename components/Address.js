import Link from 'next/link';

export default function Location({ feature }) {

  return (
      <div className="mb-1 text-sm flex">
        <span className="w-5">📍</span>
        {feature.location.street_address}
      </div>
  )
}
