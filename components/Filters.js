import { useState, useEffect, useRef, forwardRef } from 'react'
import styles from 'styles/ideaGenerator.module.css'
import TagFilter from "components/TagFilter"

const Filters = ({ filters, selectedFilters, toggleFn, reset, children }) => {
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const numSelected = filters.reduce((sum, f) => {
    if (f.type === "boolean") {
      const val = selectedFilters[f.id] ? 1 : 0
      return sum + val
    }

    if (f.type === "select-multiple") {
      return sum + selectedFilters[f.id].length
    }
  }, 0)

  // const anySelected = filtersWithOptionsSelected.some(f => f)
  const anySelected = numSelected > 0

  return (
    <div className="block mb-2">
      <div className="w-full z-10 relative md:flex items-center space-y-1 md:space-x-1">
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
          <button onClick={reset} className="btn btn-clear border-0 relative space-x-1 text-red pl-1">
            <span>Clear</span>
            <i className="fa-solid fa-xmark"></i>
          </button>
        }
      </div>
    </div>
  )
}

export default Filters
