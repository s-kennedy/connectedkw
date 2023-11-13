import styles from "styles/events.module.css"
import Link from 'next/link'
import Image from 'next/image'
import { DEFAULT_LOCALE, DATE_FORMAT, TIME_FORMAT } from 'utils/constants'


const EventCard = ({ event }) => {
  if (!event) return null

  const { featured, title, description, start_date, end_date, start_time, end_time, categories, tags, image_url, image_caption, image_alt_text, location, slug } = event;

  const startDateObj = new Date(`${start_date}T${start_time}`)
  const startDateString = startDateObj.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT)
  const startTime = startDateObj.toLocaleTimeString(DEFAULT_LOCALE, TIME_FORMAT)
  
  let dateTimeString = `${startDateString}, ${startTime}`

  const endDateObj = new Date(`${end_date ? end_date : start_date}T${end_time}`)
  const endDateString = endDateObj.toLocaleDateString(DEFAULT_LOCALE, DATE_FORMAT)
  const endTime = endDateObj.toLocaleTimeString(DEFAULT_LOCALE, TIME_FORMAT)
  
  if (startDateString !== endDateString) {
    dateTimeString = `${startDateString}, ${startTime} - ${endDateString}, ${endTime}`
  } else {
    dateTimeString = `${startDateString}, ${startTime} - ${endTime}`
  }

  return (
    <Link href={`/events/${slug}`} className={`${styles.eventCard} btn snap-start transition-all relative p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black overflow-hidden ${styles.result}`}>
      <div className={`${styles.appear} relative flex flex-col w-full md:h-full min-h-0`}>
        {
          (featured) && 
          <div className={`bg-red text-black flex-none rounded-t-lg w-full text-sm px-3 py-1 flex font-medium`}>
            {`️⭐ FEATURED ️⭐`}
          </div>
        }
        <div className="w-full flex-auto min-h-0 flex flex-col sm:flex-row justify-stretch items-stretch">
        { (featured && image_url) &&
          <div className={`relative basis-1/2 flex-auto min-h-0 overflow-hidden`}>
            <img
              className={`object-cover w-full h-full min-[500px]:max-md:aspect-square ${styles.appear}`}
              src={image_url}
              alt={image_alt_text || title} 
              title={image_caption}
              loading="lazy"
            />
          </div>
        }
          <div className={`basis-1/2 flex-auto text-left overflow-auto h-full styled-scrollbar p-3`}>
            <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>
            <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>🗓</span><time>{dateTimeString}</time></p>
            { location && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{location.name}</span></p>}
            { categories && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>👶</span><span>{categories.map(c => c.name).join(', ')}</span></p>}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default EventCard