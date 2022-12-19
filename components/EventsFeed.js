import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import TagFilter from "components/TagFilter"
import EventDisplay from "components/EventDisplay"
import OutsideClickHandler from 'react-outside-click-handler';

function EventsFeed() {
  const [allEvents, setAllEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [selectedTags])

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
        console.log({data})
        setAllEvents(data.events)
        setFilteredEvents(data.events)
        // setLoading(false)
      })
  }

  const reset = () => {
    setSelectedTags([])
  }

  const selectEvent = () => {

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

  const allOut = filteredEvents.length === 0;

  return (
    <div id="idea-generator" className={`relative min-h-0 flex flex-col w-full h-full`}>
      <div className="flex-none flex justify-end mb-2 z-30">
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
      <div className="flex-auto flex relative min-h-0 z-10">
        {filteredEvents.map(event => {
          return (
            <EventDisplay event={event} key={event.id} />
          )
        })}
      </div>
      <div className="flex-none flex relative mb-2 z-20">
        <TagFilter
          toggleFilter={toggleFilter}
          selectedTags={selectedTags}
          reset={reset}
        />
      </div>
    </div>
  )
}

export default EventsFeed