import { useState } from 'react'
import styles from '../styles/ideaGenerator.module.css'
import { tagEmojiDict } from '../utils/constants'
import ReactModal from 'react-modal';

ReactModal.setAppElement("#idea-generator")

const TagButton = ({ name, isSelected, toggleFilter }) => {
  const tagEmoji = tagEmojiDict[name]
  const handleClick = () => {
    toggleFilter(name)
  }

  return (
    <button onClick={handleClick} className={`transition-all text-sm px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap ${isSelected ? 'bg-purple text-white' : 'bg-white text-black'}`}>
      <span className="whitespace-nowrap">{name}</span>
      {tagEmoji && <span className="ml-1">{tagEmoji}</span>}
    </button>
  )
}

function TagFilter({ toggleFilter, selectedTags, reset }) {
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
    <div className={`transition-all py-2`}>
      <button onClick={openFilters} className="w-full items-baseline font-body bg-purple text-white p-2 border-3 rounded-xl border-black">
        {selectedTagsCount ? `Filters (${selectedTagsCount})` : 'Filters 🎯'}
      </button>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeFilters}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="max-w-md mx-auto bg-white p-5 border-3 rounded-xl border-black relative"
        style={{
          overlay: { padding: "6vw" }
        }}
      >
        <>
          <div className="flex items-start">
            <h2 className="text-lg font-body font-medium flex-1">
              What kind of activity are you looking for?
            </h2>
            <button onClick={closeFilters} className={`flex-0 text-2xl font-medium`}>✕</button>
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
            <button onClick={reset} className="text-blue">Clear filters</button>
          }
        </>
      </ReactModal>

    </div>
  )
}

export default TagFilter