import { useState, useEffect } from 'react'
import { tagEmojiDict, eventCategories } from 'utils/constants'
import ReactModal from 'react-modal';

const TagButton = ({ name, isSelected, toggleFilter }) => {
  const tagEmoji = tagEmojiDict[name]
  const handleClick = () => {
    toggleFilter(name)
  }

  return (
    <button onClick={handleClick} className={`hover:bg-lightPurple text-sm px-2 py-1 m-1 ml-0 border-2 ${isSelected ? '!bg-purple !text-white' : 'bg-white text-black'}`}>
      <span className="whitespace-nowrap">{name}</span>
      {tagEmoji && <span className="ml-1">{tagEmoji}</span>}
    </button>
  )
}

const CategoryButton = ({ name, category, isSelected, toggleFilter }) => {
  const label = category.label ? category.label : name
  const handleClick = () => {
    toggleFilter(name)
  }

  return (
    <button onClick={handleClick} className={`hover:bg-lightPurple text-sm px-2 py-1 m-1 ml-0 border-2 ${isSelected ? '!bg-purple !text-white' : 'bg-white text-black'}`}>
      <span className="whitespace-nowrap">{label}</span>
    </button>
  )
}

const MapFilter = ({
  toggleFilter,
  selectedTags=[],
  toggleCategory,
  selectedCategories=[],
  reset,
  appElementId,
  categories,
  categoriesName,
  tags,
  tagsName,
}) => {

  useEffect(() => {
    ReactModal.setAppElement(appElementId)
  })

  const [isOpen, setOpen] = useState(false)
  const categoryNames = Object.keys(categories)

  const openFilters = () => {
    setOpen(true)
  }

  const closeFilters = () => {
    setOpen(false)
  }
  const toggleFilters = () => {
    setOpen(!isOpen)
  }

  const filterCount = selectedTags.length + selectedCategories.length

  return (
    <div className={`transition-all`}>
      <button onClick={openFilters} className="btn-purple rounded-lg border-2 text-sm items-baseline">
        {filterCount ? `Filters (${filterCount})` : 'Filters 🎯'}
      </button>

      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeFilters}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="max-w-md mx-auto h-full"
        style={{
          overlay: { padding: "6vw", zIndex: 100 }
        }}
      >
        <div className="h-full w-full bg-white pt-8 border-3 rounded-xl border-black relative">
          <div className="w-full flex justify-end absolute top-0 left-0">
            <button onClick={closeFilters} className={`text-lg font-medium btn-clear`}>✕</button>
          </div>
          <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-5 pt-0`}>
          {
            toggleCategory &&
            <div className="categories">
              <div className="flex items-baseline">
                <h2 className="text-lg font-body font-medium flex-1">
                  {`Filter by ${categoriesName}`}
                </h2>
              </div>
              <div className={`flex flex-wrap py-4`}>
                {categoryNames.map(cat => {
                  const isSelected = selectedCategories.includes(cat)
                  const category = categories[cat]
                  return (
                    <CategoryButton 
                      name={cat} 
                      key={cat} 
                      category={category} 
                      isSelected={isSelected} 
                      toggleFilter={toggleCategory} 
                    />
                  )
                })}
              </div>
            </div>
          }

          {
            toggleFilter &&
            <div className="tags">
              <div className="flex items-baseline">
                <h2 className="text-lg font-body font-medium flex-1">
                  {`Filter by ${tagsName}`}
                </h2>
              </div>
              <div className={`flex flex-wrap py-4`}>
                {tags.map(tag => {
                  const isSelected = selectedTags.includes(tag)
                  return (
                    <TagButton name={tag} key={tag} isSelected={isSelected} toggleFilter={toggleFilter} />
                  )
                })}
              </div>
            </div>
          }
          { (selectedTags?.length > 0 || selectedCategories?.length > 0) &&
            <div className="flex justify-between">
              <button onClick={reset} className="btn-clear text-red">Clear filters</button>
              <button onClick={closeFilters} className="btn-clear text-green">Done</button>
            </div>
          }
          </div>
        </div>
      </ReactModal>

    </div>
  )
}

export default MapFilter