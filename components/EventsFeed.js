import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import Image from 'next/image'
import TagFilter from "components/TagFilter"
import EventCard from "components/EventCard"

const EventsFeed = ({ events=[], filters=[] }) => {
  // const [allEvents, setAllEvents] = useState(events)
  const [isLoading, setLoading] = useState(false)
  const emptyFilters = filters.reduce((a, f) => ({ ...a, [f.id]: []}), {}) 
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters)
  const [filteredEvents, setFilteredEvents] = useState(events)

  useEffect(() => {
    filterEvents()
  }, [selectedFilters])

  useEffect(() => {
    ReactModal.setAppElement("#event-feed")
  })

  const filterEvents = () => {
    let filteredEvents = events;

    filters.forEach(filter => {
      if (Boolean(selectedFilters[filter.id]?.length)) {
        filteredEvents = filteredEvents.filter(event => {
          const attributeIds = filter.attributeFn(event)
          const selectedFilterIds = selectedFilters[filter.id]
          const matches = selectedFilterIds.map(id => attributeIds.includes(id))
          // only allow events that match ALL the selected filters.
          // use .some() to keep the events that match ANY of the selected filters.
          return matches.some(m => m)
        })
      }
    })

    setFilteredEvents(filteredEvents)
  }

  // const fetchEvents = () => {
  //   setLoading(true)
  //   fetch("/api/events")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllEvents(data.events)
  //       setFilteredEvents(data.events)
  //       setLoading(false)
  //     })
  // }

  const reset = () => {
    setSelectedFilters(emptyFilters)
  }

  const toggleFn = (filterId, optionId) => {
    const alreadySelected = selectedFilters[filterId].includes(optionId)

    if (alreadySelected) {
      // unselect tag
      const optionRemoved = selectedFilters[filterId].filter(f => f != optionId)
      setSelectedFilters({ ...selectedFilters, [filterId]: optionRemoved })
    } else {
      // add tag
      const optionAdded = [...selectedFilters[filterId], optionId]
      setSelectedFilters({ ...selectedFilters, [filterId]: optionAdded })
    }
  }

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
            {filteredEvents.map(event => <EventCard event={event} key={event.id} />)}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-start action-bar border-t-3 border-black fixed bottom-0 right-0 left-0 w-full bg-white p-2 space-x-1">
          <TagFilter
            filters={filters}
            toggleFn={toggleFn}
            selectedFilters={selectedFilters}
            reset={reset}
            appElementId="#event-feed"
          />
      </div>
    </div>
  )
}

export default EventsFeed