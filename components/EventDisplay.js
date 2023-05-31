import styles from "../styles/ideaGenerator.module.css"
import { eventCategories, tagEmojiDict } from "../utils/constants"
import ReactMarkdown from 'react-markdown'
import { AddToCalendarButton } from 'add-to-calendar-button-react';

const Tag = ({ name }) => {
  const tagEmoji = tagEmojiDict[name]

  return (
    <div className="text-sm px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap">
      <span className="whitespace-nowrap">{name}</span>
      {tagEmoji && <span className="ml-1">{tagEmoji}</span>}
    </div>
  )
}

function EventDisplay({ event, isLoading, closeModal }) {

  const getField = (fieldName) => {
    return event?.fields?.[fieldName]
  }

  const getImageObj = () => {
    return event?.fields?.Image?.[0]
  }

  const title = getField("Title")
  const description = getField("Description")
  const startDate = getField("Start date")
  const endDate = getField("End date")
  const locationName = getField("Location name")
  const locationAddress = getField("Location address")
  const category = getField("Category")
  const image = getImageObj()
  const imageDescription = getField("Image description")
  const imageCredit = getField("Image credit")
  const categoryStyles = eventCategories[category] || {}
  const imageUrl = getField("Image url")
  const link = getField("External link")
  const linkText = getField("Link text") || "Event page"
  const tags = getField("Tags") || []
  const price = getField("Price")

  const startDateObj = new Date(startDate)
  const startDateString = startDateObj.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })
  const startTime = startDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })

  let dateTimeString = `${startDateString}, ${startTime}`

  if (endDate) {
    const endDateObj = new Date(endDate)
    const endDateString = endDateObj.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })
    const endTime = endDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit', hour12: false })
    
    if (startDateString !== endDateString) {
      dateTimeString = `${startDateString}, ${startTime} - ${endDateString}, ${endTime}`
    } else {
      dateTimeString = `${startDateString}, ${startTime} - ${endTime}`
    }
  }
  
  const calendarStartDate = `${startDateObj.toLocaleString("default", { year: "numeric" })}-${startDateObj.toLocaleString("default", { month: "2-digit" })}-${startDateObj.toLocaleString("default", { day: "2-digit" })}`
  const calendarStartTime = `${startDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit', hour12: false })}`
  
  let endDateObj;

  if (endDate) {
    endDateObj = new Date(endDate)
  } else {
    // the add to calendar button requires an end time
    // if end time is not provided, make it one hour after start time
    const startTimeMs = startDateObj.getTime()
    const endTimeMs = startTimeMs + 60 * 60 * 1000 
    endDateObj = new Date(endTimeMs)
  }

  const calendarEndDate = `${endDateObj.toLocaleString("default", { year: "numeric" })}-${endDateObj.toLocaleString("default", { month: "2-digit" })}-${endDateObj.toLocaleString("default", { day: "2-digit" })}`
  const calendarEndTime = `${endDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit', hour12: false })}`

  const calendarLocation = (locationName && locationAddress) ? `${locationName}, ${locationAddress}` : (locationName) ? `${locationName}` : "TBD"
  const calendarTitle = title ? `${title}` : "Untitled event"

  const imgSrc = image ? image.thumbnails.large.url : imageUrl

  return (
    <div className="h-full w-full bg-white pt-8 border-3 rounded-xl border-black relative">
      <div className="w-full flex justify-end absolute top-0 left-0">
        <button onClick={closeModal} className={`text-lg font-medium btn-clear`}>✕</button>
      </div>
      <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-5 pt-0`}>
        <div className={isLoading ? '' : styles.appear}>
          {imgSrc &&
          <div className="mb-4">
            <div className="relative">
              <img className={`object-cover aspect-video ${styles.appear}`} src={imgSrc} alt={imageDescription || title} width={image ? image.thumbnails.large.width : undefined } height={image ? image.thumbnails.large.height : undefined} />
              { (imageCredit?.length > 2) && <small className={`absolute bottom-0 left-0 right-0 text-xs p-1 ${styles.bgCaption}`}><ReactMarkdown>{imageCredit}</ReactMarkdown></small> }
            </div>
          </div>
          }
          {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
          <p className="mb-1 space-x-3 flex flex-nowrap">
            <span>🗓</span>
            <span>{dateTimeString}</span>
          </p>
          { price && <p className="mb-1 space-x-3 flex flex-nowrap"><span>🎟</span><span>{price}</span></p>}
          { locationName && <p className="mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{locationName}<br />{locationAddress}</span></p>}
          { link && <p className="mb-1 space-x-3 flex flex-nowrap"><span>🔗</span><a href={link} target="_blank" rel="noopener noreferrer">{`${linkText}`}</a></p>}
          {description && <div className="my-4"><ReactMarkdown>{description}</ReactMarkdown></div>}

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
                {tags.map(tag => <Tag name={tag} key={tag} />)}
              </div>
            </div>
          }

        </div>
      </div>
    </div>
  )
}

export default EventDisplay
