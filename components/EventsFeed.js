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
import { eventCategories, DEFAULT_LOCALE, DATE_FORMAT, TIME_FORMAT } from 'utils/constants'
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

  const { title, description, start_date, end_date, start_time, end_time, categories, tags, image, location, slug } = event;

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
        <div className={`bg-red text-black flex-none rounded-t-lg w-full text-sm px-3 py-1 flex font-medium`}>
          {`️⭐ FEATURED ️⭐`}
        </div>
        <div className="w-full flex-auto min-h-0 flex flex-col sm:flex-row justify-stretch items-stretch">
        { image &&
          <div className={`relative basis-1/2 flex-auto min-h-0 overflow-hidden`}>
            <img
              className={`object-cover w-full h-full min-[500px]:max-md:aspect-square ${styles.appear}`}
              src={image.url}
              alt={image.alt_text}
              width={image.width}
              height={image.height}
            />
          </div>
        }
          <div className={`basis-1/2 flex-auto text-left overflow-auto h-full styled-scrollbar p-3`}>
            <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>
            <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>🗓</span><time>{dateTimeString}</time></p>
            { location && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{location.name}</span></p>}
            { categories && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>👶</span><span>{categories.map(c => c.name).join()}</span></p>}
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

  const { title, description, start_date, end_date, start_time, end_time, categories, tags, image, location, slug } = event;

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
    <Link href={`/events/${slug}`} className={`${styles.eventCard} btn relative snap-start transition-all p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black ${styles.result}`}>
      <div className="info p-3 text-left">
        <h3 className="mb-2 font-body font-medium">{title}</h3>
        <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>🗓</span><time>{dateTimeString}</time></p>
        { location && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{location.name}</span></p>}
        { categories && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>👶</span><span>{categories.map(c => c.name).join()}</span></p>}
      </div>
    </Link>
  )
}


const EventsFeed = ({ events=[], categories, tags }) => {
  const [allEvents, setAllEvents] = useState(events)
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuredEventIndex, setFeaturedEventIndex] = useState(0)

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
        const eventCategoriesIds = event.categories.map(c => c.id)
        const selectedCategoriesIds = selectedCategories.map(c => c.id)
        const matches = selectedCategoriesIds.map(id => eventCategoriesIds.includes(id) || eventCategoriesIds.includes(6)) // 6 is all ages
        // only allow events that match ALL the selected filters.
        // use .some() to keep the events that match ANY of the selected filters.
        return matches.some(m => m)
      })
    }

    if (selectedTags.length > 0) {
      filteredEvents = filteredEvents.filter(event => {
        const eventTagsIds = event.tags.map(t => t.id)
        const selectedTagsIds = selectedTags.map(t => t.id)
        const matches = selectedTagsIds.map(id => eventTagsIds.includes(id))

        // only allow events that match ALL the selected filters.
        // use .some() to keep the events that match ANY of the selected filters.
        return matches.some(m => m)
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

  const toggleFilter = (tag) => {
    const alreadySelected = selectedTags.filter(st => st.id === tag.id)

    if (alreadySelected.length > 0) {
      // unselect tag
      const filteredTags = selectedTags.filter(st => st.id != tag.id)
      setSelectedTags(filteredTags)
    } else {
      const newTags = [...selectedTags, tag]
      setSelectedTags(newTags)
    }
  }

  const toggleCategory = (category) => {
    const alreadySelected = selectedCategories.filter(sc => sc.id === category.id)

    if (alreadySelected.length > 0) {
      // unselect category
      const filteredCategories = selectedCategories.filter(sc => sc.id != category.id)
      setSelectedCategories(filteredCategories)
    } else {
      const newCategories = [...selectedCategories, category]
      setSelectedCategories(newCategories)
    }
  }

  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const filters = selectedCategories.concat(selectedTags)

  return (
    <div id="event-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="p-3">
        { isLoading ? (
          <div className="border-3 rounded-xl border-black bg-white w-full h-full flex justify-center items-center min-h-halfscreen">
            <Image src="/loading.svg" width={40} height={40} alt="loading" />
          </div>
          ) : (
          <div className={`flex-auto flex-col space-y-2 overflow-auto styled-scrollbar snap-y`}>
            <h1 className="text-4xl md:text-5xl font-body font-bold">{`Events (${filteredEvents.length})`}</h1>
            {filters.length > 0 && <p>{`Filtered by: ${filters.map(f => f.name).join()}`}</p>}
            {filters.length > 0 && <button className="btn btn-transparent" onClick={reset}>{`Clear filters`}</button>}
            {
              filteredEvents.map(event => {
                if (event.featured) {
                  return <FeaturedEventCard setSelectedEvent={setSelectedEvent} event={event} isLoading={isLoading} key={event.id} />
                }
                return <EventCard setSelectedEvent={setSelectedEvent} event={event} key={event.id} />
              })
            }
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-end action-bar border-t-3 border-black fixed bottom-0 right-0 left-0 w-full bg-white p-2 space-x-1">
        <Link href="/events/new" className="btn btn-white rounded-full text-sm whitespace-nowrap ">Submit +</Link>
        <Link href="/events/calendar" className="btn btn-white rounded-full text-sm whitespace-nowrap ">Calendar</Link>
        <div className="">
          <TagFilter
            categories={categories}
            tags={tags}
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