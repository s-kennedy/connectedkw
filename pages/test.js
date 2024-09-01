import { NodeHtmlMarkdown } from 'node-html-markdown'
const markdown = new NodeHtmlMarkdown()
import dynamic from 'next/dynamic'
import {decode} from 'html-entities';
const ReactMarkdown = dynamic(() => import('react-markdown'))

export default function Test() {

  const original = `&lt;p&gt;Experience the ultimate combination of gourmet delights and scenic beauty with Waterloo Central Railway\\'s “Brew &amp; Bite” trains!&lt;/p&gt;\\n`
  const decoded = decode(original)
  const cleaned = decoded.replace(/&#(\d+);/g, (m, d) => String.fromCharCode(d))
  const uriDecoded = decodeURIComponent(cleaned)
  const trimmed = uriDecoded.replace(/\\n|\\/g, "")
  const description = markdown.translate(trimmed)

  return (
    <>
    <ReactMarkdown>{description}</ReactMarkdown>
    </>
  )
}


