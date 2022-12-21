import { useState, useEffect } from 'react'
import styles from 'styles/ideaGenerator.module.css'
import { tagEmojiDict } from 'utils/constants'
import ReactModal from 'react-modal';

const TagButton = ({ name, isSelected, toggleFilter }) => {
  const tagEmoji = tagEmojiDict[name]
  const handleClick = () => {
    toggleFilter(name)
  }

  return (
    <button onClick={handleClick} className={`btn-white text-sm px-2 py-1 m-1 ml-0 border-2 ${isSelected ? 'bg-purple text-white' : 'bg-white text-black'}`}>
      <span className="whitespace-nowrap">{name}</span>
      {tagEmoji && <span className="ml-1">{tagEmoji}</span>}
    </button>
  )
}

function TagFilter({ toggleFilter, selectedTags, reset, appElementId }) {
  useEffect(() => {
    ReactModal.setAppElement(appElementId)
  })

  const [isOpen, setOpen] = useState(false)
  const tagNames = Object.keys(tagEmojiDict)

  const openFilters = () => {
    setOpen(true)
  }

  const closeFilters = () => {
    setOpen(false)
  }
  const toggleFilters = () => {
    setOpen(!isOpen)
  }

  const selectedTagsCount = selectedTags.length

  return (
    <div className={`transition-all`}>
      <button onClick={openFilters} className="btn-purple items-baseline">
        {selectedTagsCount ? `Filters (${selectedTagsCount})` : 'Filters 🎯'}
      </button>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeFilters}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="max-w-md mx-auto bg-white p-5 border-3 rounded-xl border-black relative"
        style={{
          overlay: { padding: "6vw", zIndex: 60 }
        }}
      >
        <>
          <div className="flex items-baseline">
            <h2 className="text-lg font-body font-medium flex-1">
              What kind of activity are you looking for?
            </h2>
            <button onClick={closeFilters} className={`flex-0 text-2xl font-medium btn-clear`}>✕</button>
          </div>
          <div className={`flex flex-wrap py-4 ${styles.appear}`}>
            {tagNames.map(tag => {
              const isSelected = selectedTags.includes(tag)
              return (
                <TagButton name={tag} key={tag} isSelected={isSelected} toggleFilter={toggleFilter} />
              )
            })}
          </div>
          { (selectedTags.length > 0) &&
            <div className="flex justify-between">
              <button onClick={reset} className="btn-clear text-red">Clear filters</button>
              <button onClick={closeFilters} className="btn-clear text-green">Done</button>
            </div>
          }
        </>
      </ReactModal>

    </div>
  )
}

export default TagFilter