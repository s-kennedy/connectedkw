import Image from 'next/image'
import Link from 'next/link'
import { buildDateString } from 'utils/dates'

const GridCard = ({ item, displayFields, showImage }) => {
  if (!item) return null

  const { 
    featured,
    title,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    categories,
    tags,
    image,
    location,
    slug,
    classification,
    location_source_text 
  } = item;

  const dateString = buildDateString(start_date, end_date, start_time, end_time)

  const urlFragments = {
    'activity': 'activities',
    'event': 'events',
    'recurring event': 'events'
  }
  const urlFragment = urlFragments[classification]

  return (
    <Link href={`/${urlFragment}/${slug}`} className={`btn snap-start transition-all relative p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black overflow-hidden mb-1`}>
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
            { location && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{location.name}</span></p>}
            { !location && location_source_text && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{location_source_text}</span></p>}
            { Boolean(categories?.length) && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>👶</span><span>{categories.map(c => c.name).join(', ')}</span></p>}
            { Boolean(tags?.length) && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>#️⃣</span><span>{tags.map(t => t.name).join(', ')}</span></p>}
        </div>
      </div>
    </Link>
  )
}

export default GridCard