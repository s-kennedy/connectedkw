export default function Location({ feature }) {
  const text = [feature.location.name, feature.location.street_address].filter(i => i).join(", ")

  return (
      <div className="mb-1 text-sm flex">
        <span className="w-5">📍</span>
        {text}
      </div>
  )
}
