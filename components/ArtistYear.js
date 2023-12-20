
export default function ArtistYear({ feature }) {
  const text = [feature.artist_name, feature.year].filter(i => i).join(", ")
  return (
    <div className="mb-1 text-sm flex">
      <span className="w-5">🖌</span>
      {text}
    </div>
  )
}
