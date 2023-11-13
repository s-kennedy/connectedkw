import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import Image from 'next/image'
import TagFilter from "components/TagFilter"
import EventCard from "components/EventCard"

const defaultValues = {
  "boolean": false,
  "select-multiple": []
}

const EventsFeed = ({ events=[], filters=[] }) => {
  // const [allEvents, setAllEvents] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(true)
  const emptyFilters = filters.reduce((a, f) => {
    const defaultValue = defaultValues[f.type]
    return { ...a, [f.id]: defaultValue}
  }, {}) 
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
    setSelectedFilters(emptyFilters)
  }

  const toggleFn = (filter, value) => {
    console.log({filter})
    console.log({value})
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

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const filtersWithOptionsSelected = filters.filter(f => {
    if (f.type === "boolean") {
      return selectedFilters[f.id] === true
    }

    if (f.type === "select-multiple") {
      return selectedFilters[f.id].length > 0
    }
  })

  const anySelected = filtersWithOptionsSelected.some(f => f)

  return (
    <div id="event-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="p-3">
        { isLoading ? (
          <div className="border-3 rounded-xl border-black bg-white w-full h-full flex justify-center items-center min-h-halfscreen">
            <Image src="/loading.svg" width={40} height={40} alt="loading" />
          </div>
          ) : (
          <div className={`flex-auto flex-col space-y-2`}>
            <h1 className="text-4xl md:text-5xl font-body font-bold mb-1">{`Events (${filteredEvents.length})`}</h1>
            <div className="space-x-1">
              <button onClick={toggleFilters} className="btn btn-clear relative space-x-1 mb-2">
                <div className="relative">
                  {(!showFilters && anySelected) && <span className="h-2 w-2 rounded-full bg-red inline-block absolute -left-2" /> }
                  <span>Filters</span>
                </div>
                <i className={`fa-solid text-sm ${showFilters ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
              </button>
              { showFilters &&
                <div className="w-full space-y-1 z-10 relative pb-1 pl-2">
                  { filters.map(filter => {
                    return (
                      <TagFilter
                        key={filter.id}
                        filter={filter}
                        toggleFn={toggleFn}
                        selectedOptions={selectedFilters[filter.id]}
                      />
                    )
                  })}
                  {
                    anySelected &&
                    <button onClick={reset} className="whitespace-nowrap relative space-x-1 text-red pl-1">
                      <span>Clear filters</span>
                      <i className="fa-solid fa-xmark text-xs"></i>
                    </button>
                  }
                </div>
              }
              {
                !showFilters && anySelected && 
                <button onClick={reset} className="btn btn-clear whitespace-nowrap relative space-x-1 text-red pl-1">
                  <span>Clear filters</span>
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              }
            </div>
            <div className="flex-auto flex-col space-y-2 overflow-auto styled-scrollbar snap-y relative my-2">
            {filteredEvents.map(event => <EventCard event={event} key={event.id} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default EventsFeed