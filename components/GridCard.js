import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { buildDateString } from 'utils/dates'
const ReactMarkdown = dynamic(() => import('react-markdown'))

const GridCard = ({ item, displayFields, showImage, showDescription, className="" }) => {
  if (!item) return null

  const { 
    featured,
    title,
    description,
    starts_at,
    ends_at,
    categories,
    tags,
    image,
    location,
    slug,
    classification,
    location_source_text 
  } = item;

  const dateString = buildDateString(starts_at, ends_at)

  const urlFragments = {
    'activity': 'activities',
    'event': 'events',
    'recurring event': 'events',
    'map': 'maps'
  }
  const urlFragment = urlFragments[classification]

  return (
    <Link href={`/${urlFragment}/${slug}`} className={`${className} btn snap-start transition-all relative p-0 items-start flex-col bg-white border-3 rounded-xl border-black overflow-hidden mb-1`}>
      <div className={`w-full h-full min-h-0`}>
      { image && showImage &&
        <div className={`aspect-square flex-none overflow-hidden bg-lightPurple`}>
          <Image
            className={`object-cover w-full h-full min-[500px]:max-md:aspect-square`}
            src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.id}?key=small-640`}
            alt={image.description || image.title}
            title={image.title || item.title}
            width={image.width}
            height={image.height}
          />
        </div>
      }
        <div className={`basis-2/3 flex-auto text-left overflow-auto h-full styled-scrollbar p-3`}>
          <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>
            { classification === "event" && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>🗓</span><time>{dateString}</time></p> }
            { description && showDescription && <ReactMarkdown>{description}</ReactMarkdown>}
            { location && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{location.name}</span></p>}
            { !location && location_source_text && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{location_source_text}</span></p>}
            { Boolean(tags?.length) && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>#️⃣</span><span>{tags.map(t => t.name).join(', ')}</span></p>}
        </div>
      </div>
    </Link>
  )
}

export default GridCard