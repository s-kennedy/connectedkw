import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import TagFilter from "components/TagFilter"
import EventDisplay from "components/EventDisplay"
import OutsideClickHandler from 'react-outside-click-handler';
import Blob from 'components/Blob'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"
import { eventCategories } from 'utils/constants'
import { useRouter } from 'next/router'

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
  const endDateObj = new Date(endDate)

  const startDateString = startDateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
  const endDateString = endDateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
  const startTime = startDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
  const endTime = endDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })

  const imgSrc = image ? image.thumbnails.large.url : imageUrl

  return (
      <button onClick={() => setSelectedEvent(event)} className={`${styles.eventCard} p-0 border-3 rounded-xl border-black bg-white w-full h-full overflow-hidden`}>
        <div className={`${isLoading ? styles.loading : styles.appear} relative flex flex-col w-full md:h-full min-h-0`}>
        <div className={`${categoryStyles.bgColor} ${categoryStyles.textColor} flex-none rounded-t-lg w-full text-sm px-3 py-1 flex justify-end text-medium`}>
          {`${category} ${categoryStyles.emoji}`}
        </div>
        <div className="w-full flex-auto min-h-0 flex min-[500px]:max-md:flex-row flex-col justify-stretch items-stretch">
        { imgSrc &&
          <div className={`relative basis-1/2 flex-auto min-h-0 overflow-hidden`}>
            <img
              className={`object-cover min-[500px]:max-md:aspect-square ${styles.appear}`}
              src={imgSrc}
              alt={imageDescription}
              width={image ? image.thumbnails.large.width : undefined}
              height={image ? image.thumbnails.large.height : undefined}
            />
          </div>
        }
          <div className={`basis-1/2 flex-auto text-left overflow-auto h-full styled-scrollbar p-5`}>
            <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>
            <p className="mb-1 space-x-3 flex flex-nowrap"><span>🗓</span><time>{startDateString}</time></p>
            <p className="mb-1 space-x-3 flex flex-nowrap"><span>⏰</span><span><time>{startTime}</time>{` - `}<time>{endTime}</time></span></p>
            { locationName && <p className="mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{locationName}</span></p>}
          </div>
        </div>
        <div className={`${styles.btn} cursor-pointer btn btn-red absolute right-4 bottom-4`}>More info</div>
      </div>
      </button>
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
  const endDateObj = new Date(endDate)

  const startDateString = startDateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
  const endDateString = endDateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
  const startTime = startDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
  const endTime = endDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })

  return (
    <button onClick={() => setSelectedEvent(event)} className={`${styles.eventCard} snap-start transition-all relative p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black overflow-hidden ${styles.result}`}>
      <div className={`${categoryStyles.bgColor} ${categoryStyles.textColor} w-full text-sm px-3 py-1 flex justify-end text-medium`}>
        {category}
      </div>
      <div className="info p-3 text-left">
        <h3 className="mb-2 font-body font-medium">{title}</h3>
        <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>🗓</span><time>{startDateString}</time></p>
        <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>⏰</span><span><time>{startTime}</time>{` - `}<time>{endTime}</time></span></p>
        {locationName && <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>📍</span><span>{locationName}</span></p>}
      </div>
      <div className={`${styles.btn} cursor-pointer btn btn-red absolute right-4 bottom-4`}>More info</div>
    </button>
  )
}


const EventsFeed = () => {
  const [allEvents, setAllEvents] = useState([])
  const [featuredEvents, setFeaturedEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuredEventIndex, setFeaturedEventIndex] = useState(0)


  useEffect(() => {
    fetchEvents()
  }, [])


  useEffect(() => {
    filterEvents()
  }, [selectedTags, selectedCategories])

  useEffect(() => {
    setFeaturedEvents(filteredEvents.filter(e => e.fields.Featured))
  }, [filteredEvents])

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
    setLoading(true)
    const maxIndex = featuredEvents.length - 1
    if (featuredEventIndex < maxIndex) {
      setFeaturedEventIndex(featuredEventIndex + 1)
    } else {
      setFeaturedEventIndex(0)
    }

    const timer = setTimeout(() => {
      setLoading(false)
    }, 250)


  }

  const prevFeaturedEvent = () => {
    setLoading(true)
    const maxIndex = featuredEvents.length - 1
    if (featuredEventIndex === 0) {
      setFeaturedEventIndex(maxIndex)
    } else {
      setFeaturedEventIndex(featuredEventIndex - 1)
    }

    const timer = setTimeout(() => {
      setLoading(false)
    }, 250)
  }

  const allOut = filteredEvents?.length === 0;
  const featuredEvent = featuredEvents[featuredEventIndex]

  return (
    <div id="event-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="flex-none flex justify-end mb-2 z-30 space-x-2">
        <TagFilter
          toggleFilter={toggleFilter}
          selectedTags={selectedTags}
          toggleCategory={toggleCategory}
          selectedCategories={selectedCategories}
          reset={reset}
          appElementId="#event-feed"
        />
        <button className="btn-white" onClick={toggleMenu} aria-label="Toggle menu">
          {
            menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="20" width="20">
                <path fill="var(--theme-black)" d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20" width="20">
                <path fill="var(--theme-black)" d="M120 256c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm160 0c0 30.9-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56zm104 56c-30.9 0-56-25.1-56-56s25.1-56 56-56s56 25.1 56 56s-25.1 56-56 56z"/>
              </svg>
            )
          }
        </button>
      {
        menuOpen &&
        <div className="absolute right-0 top-0 pr-11">
          <OutsideClickHandler onOutsideClick={closeMenu} useCapture={true}>
            <div className={`${styles.appear} flex flex-col border-3 bg-white p-5 rounded-xl`}>
              <Link href="/events" className="mb-1">See all events</Link>
              <Link href="/events/new">Submit an event</Link>
            </div>
          </OutsideClickHandler>
        </div>
      }
      </div>
      <div className="flex-auto flex relative min-h-0 z-10 h-full">
        <div className="flex flex-col md:flex-row w-full max-md:space-y-2 md:space-x-2">
          <div className="basis-1/2 flex-auto h-full flex flex-col">
            <div className="text-sm font-medium mb-2">FEATURED</div>
            <div className={`flex flex-col flex-auto h-full min-h-0 relative mb-4 md:mb-0`}>
              <FeaturedEventCard setSelectedEvent={setSelectedEvent} event={featuredEvent} isLoading={isLoading} />
              {(featuredEvents.length > 1) &&
                <div className="absolute left-0 -bottom-5 right-0 flex-none flex justify-center pt-2">
                  <button title="previous" onClick={prevFeaturedEvent} className={`btn-clear ${styles.btnLeft}`} aria-label="previous">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.03 181.5" height="40" width="40">
                      <path
                        d="M165.72,13.45C133.79,3.41-2.86,75.67,12.11,95.61c21.46,28.58,116.35,90.13,145,86.21C184.17,178.14,187.46,20.29,165.72,13.45Z"
                        transform="translate(-4.97 -6.5)"
                        className={styles.arrow}
                      />
                    </svg>
                  </button>
                  <button title="next" onClick={nextFeaturedEvent} className={`btn-clear ${styles.btnRight}`} aria-label="next">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 181.03 181.5" height="40" width="40">
                      <path
                        d="M33.8,181.82c28.7,3.92,123.59-57.63,145.05-86.21,15-19.94-121.68-92.2-153.61-82.16C3.49,20.29,6.79,178.14,33.8,181.82Z"
                        transform="translate(-4.97 -6.5)"
                        className={styles.arrow}
                      />
                    </svg>
                  </button>
                </div>
              }
            </div>
          </div>
          <div className="basis-1/2 flex flex-col flex-auto h-full max-h-visibleScreen md:max-h-full">
            <div className="text-sm font-medium mb-2">UPCOMING</div>
            <div className={`flex-auto flex-col space-y-2 overflow-auto pr-2 styled-scrollbar snap-y`}>
              {
                filteredEvents.map(event => {
                  return <EventCard setSelectedEvent={setSelectedEvent} event={event} key={event.id} />
                })
              }
            </div>
          </div>
        </div>
      </div>
      <ReactModal
        isOpen={!!selectedEvent}
        onRequestClose={() => setSelectedEvent(null)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="max-w-md mx-auto h-full"
        style={{
          overlay: { padding: "6vw", zIndex: 100 }
        }}
      >
        <EventDisplay event={selectedEvent} closeModal={() => setSelectedEvent(null)} />
      </ReactModal>
    </div>
  )
}

export default EventsFeed