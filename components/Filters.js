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
    <div className="block">
      {children}
      <div className="flex items-start space-x-1">
        <button onClick={toggleFilters} className="btn btn-white relative space-x-1 mb-2">
          <div className="relative">
            <span>Filters</span>
            { anySelected &&  <span>{`(${numSelected})`}</span>}
          </div>
          <i className={`fa-solid text-sm ${showFilters ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
        </button>
        {
          anySelected && 
          <button onClick={reset} className="btn btn-white whitespace-nowrap relative space-x-1">
            <span>Clear filters</span>
            <i className="fa-solid fa-xmark text-xs"></i>
          </button>
        }
      </div>
      { showFilters &&
        <div className="w-full z-10 relative pb-1 pl-2 text-sm">
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
        </div>
      }
    </div>
  )
}

export default Filters
