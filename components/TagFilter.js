import { useState, useEffect } from 'react'
import styles from 'styles/ideaGenerator.module.css'
import { tagEmojiDict, eventCategories } from 'utils/constants'
import ReactModal from 'react-modal';

const OptionButton = ({ filterId, optionId, label, isSelected, toggleFn }) => {
  const handleClick = () => {
    toggleFn(filterId, optionId)
  }

  return (
    <button onClick={handleClick} className={`btn hover:bg-lightPurple text-sm px-2 py-1 m-1 ml-0 border-2 ${isSelected ? '!bg-purple !text-white' : 'bg-white text-black'}`}>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  )
}

const TagFilter = ({
  filters=[],
  toggleFn,
  selectedFilters={},
  reset,
  appElementId
}) => {

  useEffect(() => {
    ReactModal.setAppElement(appElementId)
  })

  const [isOpen, setOpen] = useState(false)
  const [activeFilterId, setActiveFilterId] = useState(false)

  const openFilters = () => {
    setOpen(true)
  }

  const closeFilters = () => {
    setActiveFilterId(false)
    setOpen(false)
  }
  const toggleFilters = () => {
    setOpen(!isOpen)
  }

  const handleFilterClick = (filterId) => () => {
    setActiveFilterId(filterId)
    setOpen(true)
  }

  const selectedOptions = selectedFilters[activeFilterId]
  const activeFilter = filters.find(f => f.id === activeFilterId)
  const anySelectedOptions = Object.values(selectedFilters).flat().length > 0

  return (
    <div className={`transition-all`}>
      { anySelectedOptions &&
        <button onClick={reset} className="px-3 whitespace-nowrap mx-1">
          Clear ✕
        </button>
      }
      { filters.map(filter => {
        return (
          <button key={filter.id} onClick={handleFilterClick(filter.id)} className="px-3 whitespace-nowrap">
            <div>
              <span>{filter.label}</span>
              {(selectedFilters[filter.id].length > 0) && <span className="h-2 w-2 rounded-full bg-red inline-block absolute ml-1" /> }
            </div>
          </button>
        )
      })}

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeFilters}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="w-full mx-auto absolute bottom-0 pb-10"
      >
        <div className="w-full bg-white pt-8 border-t-3 border-black relative">
          <div className="w-full flex justify-end absolute top-0 left-0">
            <button onClick={closeFilters} className={`btn text-lg font-medium btn-clear`}>✕</button>
          </div>
          <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-4 pt-0`}>
            {
              activeFilterId &&
              <div className="categories">
                <div className="flex items-baseline">
                  <h2 className="text-lg font-body font-medium flex-1">
                    {activeFilter.label}
                  </h2>
                </div>
                <div className={`flex flex-wrap ${styles.appear}`}>
                  {activeFilter.options.map(option => {
                    const isSelected = selectedOptions.includes(option.id)
                    return (
                      <OptionButton 
                        key={option.id} 
                        optionId={option.id} 
                        filterId={activeFilterId} 
                        label={option.name}
                        isSelected={isSelected} 
                        toggleFn={toggleFn} 
                      />
                    )
                  })}
                </div>
              </div>
            }
          </div>
        </div>
      </ReactModal>

    </div>
  )
}

export default TagFilter