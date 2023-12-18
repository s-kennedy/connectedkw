import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import TagFilter from "components/TagFilter"
import EventCard from "components/EventCard"
import Filters from "components/Filters"

const CalendarView = dynamic(() => import('components/CalendarView'))

const defaultValues = {
  "boolean": false,
  "select-multiple": []
}

const EventsFeed = ({ events=[], filters=[] }) => {
  // const [isLoading, setLoading] = useState(false)
  const emptyFilters = filters.reduce((a, f) => {
    const defaultValue = defaultValues[f.type]
    return { ...a, [f.id]: defaultValue}
  }, {}) 
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters)
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [featured, setFeatured] = useState(false)
  const [view, setView] = useState("list")

  const setCalendarView = () => {
    setView("calendar")
  }

  const setListView = () => {
    setView("list")
  }

  useEffect(() => {
    filterEvents()
  }, [selectedFilters])

  useEffect(() => {
    ReactModal.setAppElement("#event-feed")
  })

  const filterEvents = () => {
    let filteredEvents = events;

    filters.forEach(filter => {
      switch (filter.type) {
      case "boolean":
        if (selectedFilters[filter.id] === true) {
          filteredEvents = filteredEvents.filter(event => filter.attributeFn(event) === true) 
        }
        break;
      case "select-multiple":
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
        break;
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

  const toggleFn = (filter, value) => {
    switch (filter.type) {
      case "select-multiple":
        const alreadySelected = selectedFilters[filter.id].includes(value)

        if (alreadySelected) {
          // unselect tag
          const optionRemoved = selectedFilters[filter.id].filter(f => f != value)
          setSelectedFilters({ ...selectedFilters, [filter.id]: optionRemoved })
        } else {
          // add tag
          const optionAdded = [...selectedFilters[filter.id], value]
          setSelectedFilters({ ...selectedFilters, [filter.id]: optionAdded })
        }
        break;
      case "boolean":
        const newValue = !selectedFilters[filter.id]
        setSelectedFilters({ ...selectedFilters, [filter.id]: newValue })
    }
  }

  return (
    <div id="event-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="p-3">
        <div className={`flex-auto flex-col space-y-2`}>
          <h1 className="text-4xl md:text-5xl font-body font-bold">{`Events (${filteredEvents.length})`}</h1>
          <div className="w-full flex justify-between items-end md:items-center">
            <Filters
              filters={filters}
              selectedFilters={selectedFilters}
              toggleFn={toggleFn}
              reset={reset}
            />
            <div className="border-black border-2 rounded-lg mb-2">
              <button onClick={setListView} className={`btn text-sm border-0 rounded-r-none ${view === "list" ? 'bg-green' : 'bg-white'}`}>List</button>
              <button onClick={setCalendarView} className={`btn text-sm border-0 rounded-l-none  ${view === "calendar" ? 'bg-green' : 'bg-white'}`}>Calendar</button>
            </div>
          </div>
          {
            view === "list" ? (
              <div className="flex-auto flex-col space-y-2 overflow-auto styled-scrollbar snap-y relative my-2">
                {filteredEvents.map(event => <EventCard event={event} key={event.id} />)}
              </div>
            ) : (
              <CalendarView events={filteredEvents} /> 
            )
           }
        </div>
      </div>
    </div>
  )
}

export default EventsFeed