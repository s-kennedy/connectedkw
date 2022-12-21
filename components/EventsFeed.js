import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import TagFilter from "components/TagFilter"
import EventDisplay from "components/EventDisplay"
import OutsideClickHandler from 'react-outside-click-handler';
import Blob from 'components/Blob'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"

const FeaturedEventCard = ({ event, setSelectedEvent }) => {
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

  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)

  const startDateString = startDateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
  const endDateString = endDateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
  const startTime = startDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
  const endTime = endDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })

  return (
    <MouseParallaxContainer
      globalFactorX={0.2}
      globalFactorY={0.2}
      className={`w-full h-full`}
    >
      <button onClick={() => setSelectedEvent(event)} className={`${styles.eventCard} relative w-full h-full p-5 items-start flex flex-col space-y-5 justify-stretch items-stretch border-3 rounded-xl border-black bg-white min-h-0`}>
      <div className={`relative basis-50 flex-none`}>
        <MouseParallaxChild factorX={0.1} factorY={0.1}>
          <Blob fill="var(--theme-purple)" className="inline-block w-10/12 ml-10 rotate-45" />
        </MouseParallaxChild>
        <MouseParallaxChild factorX={0.1} factorY={0.2}>
          <Blob fill="var(--theme-red)" className="absolute w-10/12 h-auto bottom-2 left-0 rotate-[120]" />
        </MouseParallaxChild>
        <MouseParallaxChild factorX={0.3} factorY={0.4} className="absolute w-full h-full top-0 left-0">
          <div className="flex w-full h-full justify-center items-center aspect-square">
            <img
              className="object-contain"
              src={image.thumbnails.large.url}
              alt={imageDescription}
              width={image.thumbnails.large.width}
              height={image.thumbnails.large.height}
            />
          </div>
        </MouseParallaxChild>
      </div>
      <div className={`flex-auto text-left overflow-auto h-full ${styles.styledScrollbars}`}>
        <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>
        <p className="mb-1 space-x-3"><span>🗓</span><time>{startDateString}</time></p>
        <p className="mb-1 space-x-3"><span>⏰</span><span><time>{startTime}</time>{` - `}<time>{endTime}</time></span></p>
        <p className="mb-1 space-x-3"><span>📍</span><span>{locationName}</span></p>
      </div>
      <div className={`${styles.btn} cursor-pointer btn btn-red absolute right-4 bottom-4`}>More info</div>
    </button>
    </MouseParallaxContainer>
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

  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)

  const startDateString = startDateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
  const endDateString = endDateObj.toLocaleDateString('default', { year: 'numeric', month: 'long', day: 'numeric' })
  const startTime = startDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })
  const endTime = endDateObj.toLocaleTimeString('default', { hour: 'numeric', minute: '2-digit' })

  return (
    <button onClick={() => setSelectedEvent(event)} className={`${styles.eventCard} transition-all relative p-0 items-start flex-col overflow-auto w-full bg-white border-3 rounded-xl border-black ${styles.result}`}>
      <div className="bg-lightGreen rounded-t-lg w-full text-sm px-3 flex justify-end text-green text-medium">
        {category}
      </div>
      <div className="info p-3 text-left">
        <h3 className="mb-2 font-body font-medium">{title}</h3>
        <p className="text-sm mb-1 space-x-3"><span>🗓</span><time>{startDateString}</time></p>
        <p className="text-sm mb-1 space-x-3"><span>⏰</span><span><time>{startTime}</time>{` - `}<time>{endTime}</time></span></p>
        <p className="text-sm mb-1 space-x-3"><span>📍</span><span>{locationName}</span></p>
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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetchEvents()
    fetchFeaturedEvents()
  }, [])


  useEffect(() => {
    filterEvents()
  }, [selectedTags])

  useEffect(() => {
    ReactModal.setAppElement("#event-feed")
  })

  const filterEvents = () => {
    if (selectedTags.length < 1) {
      return setFilteredEvents(allEvents)
    }

    const filteredEvents = allEvents.filter(event => {
      const eventTags = event.fields.Tags || []
      const matches = selectedTags.map(tag => eventTags.includes(tag))

      // only allow events that match ALL the selected filters.
      // use .some() to keep the events that match ANY of the selected filters.
      return matches.every(m => m)
    })

    setFilteredEvents(filteredEvents)
  }

  const fetchEvents = () => {
    // setLoading(true)
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data.events)
        setFilteredEvents(data.events)
        // setLoading(false)
      })
  }

  const fetchFeaturedEvents = () => {
    // setLoading(true)
    fetch("/api/events?featured=true")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setFeaturedEvents(data.events)
        // setLoading(false)
      })
  }

  const reset = () => {
    setSelectedTags([])
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

  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  console.log(selectedTags)
  console.log({filteredEvents})

  const allOut = filteredEvents?.length === 0;

  return (
    <div id="event-feed" className={`relative min-h-0 flex flex-col w-full h-full ${styles.styledScrollbars}`}>
      <div className="flex-none flex justify-end mb-2 z-30 space-x-2">
        <TagFilter
          toggleFilter={toggleFilter}
          selectedTags={selectedTags}
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
        <div className="flex w-full space-x-2">
          <div className="basis-1/2 flex-none h-full">
            <div className="text-sm font-medium mb-2">FEATURED</div>
            <div className={`flex h-full min-h-0`}>
              {
                featuredEvents.map(event => {
                  return <FeaturedEventCard setSelectedEvent={setSelectedEvent} event={event} key={event.id} />
                })
              }
            </div>
          </div>
          <div className="basis-1/2 flex-none h-full">
            <div className="text-sm font-medium mb-2">UPCOMING</div>
            <div className={`flex-col space-y-2 h-full overflow-auto pr-2 styled-scrollbar`}>
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
          overlay: { padding: "6vw", zIndex: 60 }
        }}
      >
        <EventDisplay event={selectedEvent} />
      </ReactModal>
    </div>
  )
}

export default EventsFeed