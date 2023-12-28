import styles from "../styles/ideaGenerator.module.css"
import { eventCategories, tagEmojiDict } from "../utils/constants"
import ReactMarkdown from 'react-markdown'
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import Link from 'next/link'
import { buildDateString, getCalendarDates } from 'utils/dates'
import Tag from 'components/Tag'

function EventDisplay({ event, showImage=true, closeModal }) {

  if (!event) return null

  const { title,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    external_link,
    link_text,
    price,
    tags,
    categories,
    image,
    location 
  } = event;

  const dateString = buildDateString(start_date, end_date, start_time, end_time)

  const { calendarStartDate, calendarStartTime, calendarEndDate, calendarEndTime} = getCalendarDates(start_date, end_date, start_time, end_time)
  const calendarLocation = (location?.name && location?.street_address) ? `${location.name}, ${location.street_address}` : (location?.name) ? `${location.name}` : "TBD"
  const calendarTitle = title ? `${title}` : "Untitled event"

  const imageUrl = image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.id}` : null

  return (
    <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-5 sm:pt-5`}>
    
      <div className={styles.appear}>
        {image && showImage &&
        <div className="mb-4">
          <div className="relative">
            <img className="w-full object-cover aspect-square sm:aspect-video" src={imageUrl} alt={image.description} width={image.width} height={image.height} />
            { (image.credit) && <small className={`absolute bottom-0 left-0 right-0 text-xs p-1 ${styles.bgCaption}`}><ReactMarkdown>{image.credit}</ReactMarkdown></small> }
          </div>
        </div>
        }
        {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
        <p className="mb-1 space-x-3 flex flex-nowrap">
          <span>🗓</span>
          <span>{dateString}</span>
        </p>
        { price && <p className="mb-1 space-x-3 flex flex-nowrap"><span>🎟</span><span>{price}</span></p>}
        { location && <p className="mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{location.name}<br />{location.street_address}</span></p>}
        { external_link && <p className="mb-1 space-x-3 flex flex-nowrap"><span>🔗</span><a href={external_link} target="_blank" rel="noopener noreferrer">{`${link_text}`}</a></p>}
        { description && <div className="my-4"><ReactMarkdown>{description}</ReactMarkdown></div>}

        <div className="flex items-center">
        {
          event &&
          <AddToCalendarButton
            name={calendarTitle}
            startDate={calendarStartDate}
            startTime={calendarStartTime}
            endDate={calendarEndDate}
            endTime={calendarEndTime}
            timeZone="America/Toronto"
            location={calendarLocation}
            description={description}
            options="'Apple','Google','iCal','Outlook.com','Microsoft 365','Microsoft Teams','Yahoo'"
            buttonStyle="default"
            styleLight="--font: Fredoka; --btn-shadow: 0; --btn-background: #ffd166; --btn-border: #170F1A; --btn-background-hover: #ffd166;"
            hideBranding={true}
            debug={true}
          ></AddToCalendarButton>
        }
        </div>

        {tags.length > 0 &&
          <div className="my-4">
            <h4 className="text-lg font-body font-medium">Tags</h4>
            <div className="flex flex-wrap">
              {tags.map(tag => <Tag tag={tag} key={tag.id} />)}
            </div>
          </div>
        }

      </div>
      <div className="my-6">
        <p>👈 <Link href="/events">Back to events</Link></p>
      </div>
    </div>
  )
}

export default EventDisplay
