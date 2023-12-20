import ReactMarkdown from "react-markdown"

export default function Description({ feature }) {
  return (
    <div className="mb-1 text-sm flex">
      <span className="w-5">👉</span>
      <ReactMarkdown>{feature.description}</ReactMarkdown>
    </div>
  )
}
