import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import Image from 'next/image'
import TagFilter from "components/TagFilter"
import EventDisplay from "components/EventDisplay"
import OutsideClickHandler from 'react-outside-click-handler';
import Blob from 'components/Blob'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"
import { eventCategories } from 'utils/constants'
import { useRouter } from 'next/router'
import slugify from 'slugify'

const FeaturedEventCard = ({ event, setSelectedEvent, isLoading }) => {
  if (!event) return null

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
  const category = getField("Category")
  const image = getImageObj()
  const imageDescription = getField("Image description")
  const categoryStyles = eventCategories[category] || {}
  const imageUrl = getField("Image url")

  const startDateObj = new Date(startDate)
  const startDateString = startDateObj.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })
  const startTime = startDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
  
  let dateTimeString = `${startDateString}, ${startTime}`

  if (endDate) {
    const endDateObj = new Date(endDate)
    const endDateString = endDateObj.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })
    const endTime = endDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
    
    if (startDateString !== endDateString) {
      dateTimeString = `${startDateString}, ${startTime} - ${endDateString}, ${endTime}`
    } else {
      dateTimeString = `${startDateString}, ${startTime} - ${endTime}`
    }
  }

  const imgSrc = image ? image.thumbnails.large.url : imageUrl

  const slug = `${slugify(title, { lower: true })}__${event.id}`

  if (isLoading) {
    return (
      <div className="border-3 rounded-xl border-black bg-white w-full h-full flex justify-center items-center min-h-halfscreen">
        <Image src="/loading.svg" width={40} height={40} alt="loading" />
      </div>
    )
  }

  return (
      <Link href={`/events/${slug}`} className={`${styles.eventCard} btn snap-start transition-all relative p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black overflow-hidden ${styles.result}`}>
        <div className={`${isLoading ? styles.loading : styles.appear} relative flex flex-col w-full md:h-full min-h-0`}>
        <div className={`bg-red flex-none rounded-t-lg w-full text-sm px-3 py-1 flex font-medium`}>
          {`️⭐ FEATURED ️⭐`}
        </div>
        <div className="w-full flex-auto min-h-0 flex flex-col sm:flex-row justify-stretch items-stretch">
        { imgSrc &&
          <div className={`relative basis-1/2 flex-auto min-h-0 overflow-hidden`}>
            <img
              className={`object-cover w-full h-full min-[500px]:max-md:aspect-square ${styles.appear}`}
              src={imgSrc}
              alt={imageDescription}
              width={image ? image.thumbnails.large.width : undefined}
              height={image ? image.thumbnails.large.height : undefined}
            />
          </div>
        }
          <div className={`basis-1/2 flex-auto text-left overflow-auto h-full styled-scrollbar p-3`}>
            <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>
            <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>🗓</span><time>{dateTimeString}</time></p>
            { locationName && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{locationName}</span></p>}
            {category && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>{categoryStyles.emoji}</span><span>{category}</span></p>}
          </div>
        </div>
      </div>
    </Link>
  )
}

const EventCard = ({ event, setSelectedEvent }) => {
  const getField = (fieldName) => {
    return event?.fields?.[fieldName]
  }

  const getImageObj = () => {
    return event?.fields?.Image?.[0]
  }

  const title = getField("Title")
  const startDate = getField("Start date")
  const endDate = getField("End date")
  const locationName = getField("Location name")
  const category = getField("Category")
  const image = getImageObj()
  const categoryStyles = eventCategories[category] || {}

  const startDateObj = new Date(startDate)
  const startDateString = startDateObj.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })
  const startTime = startDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
  
  let dateTimeString = `${startDateString}, ${startTime}`

  if (endDate) {
    const endDateObj = new Date(endDate)
    const endDateString = endDateObj.toLocaleDateString('default', { weekday: 'short', month: 'short', day: 'numeric' })
    const endTime = endDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
    
    if (startDateString !== endDateString) {
      dateTimeString = `${startDateString}, ${startTime} - ${endDateString}, ${endTime}`
    } else {
      dateTimeString = `${startDateString}, ${startTime} - ${endTime}`
    }
  }

  const slug = `${slugify(title, { lower: true })}__${event.id}`

  return (
    <Link href={`/events/${slug}`} className={`${styles.eventCard} btn relative snap-start transition-all p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black ${styles.result}`}>
      <div className="info p-3 text-left">
        <h3 className="mb-2 font-body font-medium">{title}</h3>
        <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>🗓</span><time>{dateTimeString}</time></p>
        {locationName && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{locationName}</span></p>}
        {category && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>{categoryStyles.emoji}</span><span>{category}</span></p>}
      </div>
    </Link>
  )
}


const EventsFeed = ({ events }) => {
  const [allEvents, setAllEvents] = useState(events)
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuredEventIndex, setFeaturedEventIndex] = useState(0)


  // useEffect(() => {
  //   if (!allEvents.length) {
  //     fetchEvents()
  //   }
  // })


  useEffect(() => {
    filterEvents()
  }, [selectedTags, selectedCategories])

  useEffect(() => {
    ReactModal.setAppElement("#event-feed")
  })

  const filterEvents = () => {
    let filteredEvents = allEvents;

    if (selectedCategories.length > 0) {
      filteredEvents = filteredEvents.filter(event => {
        const eventCategory = event.fields.Category
        return selectedCategories.includes(eventCategory)
      })
    }

    if (selectedTags.length > 0) {
      filteredEvents = filteredEvents.filter(event => {
        const eventTags = event.fields.Tags || []
        const matches = selectedTags.map(tag => eventTags.includes(tag))

        // only allow events that match ALL the selected filters.
        // use .some() to keep the events that match ANY of the selected filters.
        return matches.every(m => m)
      })
    }

    setFilteredEvents(filteredEvents)
  }

  const fetchEvents = () => {
    setLoading(true)
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data.events)
        setFilteredEvents(data.events)
        setLoading(false)
      })
  }

  const reset = () => {
    setSelectedTags([])
    setSelectedCategories([])
  }

  const toggleFilter = (tagName) => {
    const alreadySelected = selectedTags.includes(tagName)

    if (alreadySelected) {
      const filteredTags = selectedTags.filter(item => item != tagName)
      setSelectedTags(filteredTags)
    } else {
      const newTags = [...selectedTags, tagName]
      setSelectedTags(newTags)
    }
  }

  const toggleCategory = (categoryName) => {
    const alreadySelected = selectedCategories.includes(categoryName)

    if (alreadySelected) {
      const filteredCategories = selectedCategories.filter(item => item != categoryName)
      setSelectedCategories(filteredCategories)
    } else {
      const newCategories = [...selectedCategories, categoryName]
      setSelectedCategories(newCategories)
    }
  }

  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const nextFeaturedEvent = () => {
    const maxIndex = featuredEvents.length - 1
    if (featuredEventIndex < maxIndex) {
      setFeaturedEventIndex(featuredEventIndex + 1)
    } else {
      setFeaturedEventIndex(0)
    }
  }

  const prevFeaturedEvent = () => {
    const maxIndex = featuredEvents.length - 1
    if (featuredEventIndex === 0) {
      setFeaturedEventIndex(maxIndex)
    } else {
      setFeaturedEventIndex(featuredEventIndex - 1)
    }
  }

  const allOut = filteredEvents?.length === 0;

  return (
    <div id="event-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="p-3">
        { isLoading ? (
          <div className="border-3 rounded-xl border-black bg-white w-full h-full flex justify-center items-center min-h-halfscreen">
            <Image src="/loading.svg" width={40} height={40} alt="loading" />
          </div>
          ) : (
          <div className={`flex-auto flex-col space-y-2 overflow-auto styled-scrollbar snap-y`}>
            {
              filteredEvents.map(event => {
                if (event.fields.Featured) {
                  return <FeaturedEventCard setSelectedEvent={setSelectedEvent} event={event} isLoading={isLoading} key={event.id} />
                }
                return <EventCard setSelectedEvent={setSelectedEvent} event={event} key={event.id} />
              })
            }
          </div>
        )}
      </div>
      <ReactModal
        isOpen={!!selectedEvent}
        onRequestClose={() => setSelectedEvent(null)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="max-w-md mx-auto h-full"
        style={{
          overlay: { zIndex: 100 }
        }}
      >
        <EventDisplay event={selectedEvent} closeModal={() => setSelectedEvent(null)} />
      </ReactModal>
      <div className="flex justify-end action-bar border-t-3 border-black fixed bottom-0 right-0 left-0 w-full bg-white p-2 space-x-1">
        <Link href="/events/new" className="btn btn-white rounded-full text-sm">Add an event</Link>
        <Link href="/events/calendar" className="btn btn-white rounded-full text-sm">Calendar</Link>
        <div className="">
          <TagFilter
            toggleFilter={toggleFilter}
            selectedTags={selectedTags}
            toggleCategory={toggleCategory}
            selectedCategories={selectedCategories}
            reset={reset}
            appElementId="#event-feed"
          />
        </div>
      </div>
    </div>
  )
}

export default EventsFeed