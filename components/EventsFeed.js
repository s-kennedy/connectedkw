import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import TagFilter from "components/TagFilter"
import EventCard from "components/EventCard"
import Filters from "components/Filters"
import Loading from 'components/Loading'

const CalendarView = dynamic(() => import('components/CalendarView'))

const defaultValues = {
  "boolean": false,
  "select-multiple": []
}

const EventsFeed = ({ events=[], filters=[], loading }) => {
  const [isLoading, setLoading] = useState(loading)
  const emptyFilters = filters.reduce((a, f) => {
    const defaultValue = defaultValues[f.type]
    return { ...a, [f.id]: defaultValue}
  }, {}) 
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters)
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [featured, setFeatured] = useState(false)
  const [view, setView] = useState("list")

  const toggleView = () => {
    setView(view === "list" ? "calendar" : "list")
  }

  useEffect(() => {
    filterEvents()
  }, [selectedFilters, events])

  useEffect(() => {
    setLoading(loading)
  }, [loading])

  const filterEvents = () => {
    setLoading(true)
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
    setLoading(false)
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

  const length = isLoading ? false : `${filteredEvents.length}`

  return (
    <div id="event-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="">
        <div className={`flex-auto flex-col space-y-2`}>
          <h1 className="mb-2 space-x-2">
            <span className="text-4 md:text-6xl font-title">Events</span>
            {length && <span className="font-body text-lg md:text-xl bg-black text-white rounded-full px-3 py-1 align-top ">{length}</span>}
          </h1>
          {isLoading ? (
            <Loading />
            ) : (
            <>
              <div className="w-full flex justify-between items-end md:items-center">
                <Filters
                  filters={filters}
                  selectedFilters={selectedFilters}
                  toggleFn={toggleFn}
                  reset={reset}
                />
                <div className="border-black border-2 rounded-lg">
                  <button onClick={toggleView} className={`btn text-sm border-0 btn-white`}>
                    {view === "list" ? 'Calendar view' : 'List view'}
                    <i className={`ml-1 fa-solid ${view === "list" ? 'fa-calendar-days' : 'fa-list text-sm'}`}></i>
                  </button>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventsFeed