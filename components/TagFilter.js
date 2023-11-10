import { useState, useEffect } from 'react'
import styles from 'styles/ideaGenerator.module.css'
import { tagEmojiDict, eventCategories } from 'utils/constants'
import ReactModal from 'react-modal';

const TagButton = ({ tag, isSelected, toggleFilter }) => {
  const handleClick = () => {
    toggleFilter(tag)
  }

  return (
    <button onClick={handleClick} className={`btn hover:bg-lightPurple text-sm px-2 py-1 m-1 ml-0 border-2 ${isSelected ? '!bg-purple !text-white' : 'bg-white text-black'}`}>
      <span className="whitespace-nowrap">{tag.name}</span>
    </button>
  )
}

const CategoryButton = ({ category, isSelected, toggleFilter }) => {
  const handleClick = () => {
    toggleFilter(category)
  }

  return (
    <button onClick={handleClick} className={`btn hover:bg-lightPurple text-sm px-2 py-1 m-1 ml-0 border-2 ${isSelected ? '!bg-purple !text-white' : 'bg-white text-black'}`}>
      <span className="whitespace-nowrap">{category.name}</span>
    </button>
  )
}

const TagFilter = ({
  toggleFilter,
  selectedTags=[],
  toggleCategory,
  selectedCategories=[],
  toggleDataSource,
  selectedDataSources=[],
  reset,
  appElementId,
  categories,
  tags,
  dataSources
}) => {

  useEffect(() => {
    ReactModal.setAppElement(appElementId)
  })

  const [isOpen, setOpen] = useState(false)
  const tagNames = Object.keys(tagEmojiDict)
  const categoryNames = Object.keys(eventCategories)

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
      <button onClick={openFilters} className="btn btn-purple px-3 rounded-full items-center flex-col justify-center text-sm whitespace-nowrap ">
        <div>{filterCount ? `Filters (${filterCount})` : 'Filters 🎯'}</div>
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
            <button onClick={closeFilters} className={`btn text-lg font-medium btn-clear`}>✕</button>
          </div>
          <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-5 pt-0`}>
          {
            toggleCategory &&
            <div className="categories">
              <div className="flex items-baseline">
                <h2 className="text-lg font-body font-medium flex-1">
                  Filter by category
                </h2>
              </div>
              <div className={`flex flex-wrap py-4 ${styles.appear}`}>
                {categories.map(cat => {
                  const isSelected = selectedCategories.map(sc => sc.id).includes(cat.id)
                  return (
                    <CategoryButton category={cat} key={cat.id} isSelected={isSelected} toggleFilter={toggleCategory} />
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
                  Filter by tags
                </h2>
              </div>
              <div className={`flex flex-wrap py-4 ${styles.appear}`}>
                {tags.map(tag => {
                  const isSelected = selectedTags.map(tag => tag.id).includes(tag.id)
                  return (
                    <TagButton tag={tag} key={tag.id} isSelected={isSelected} toggleFilter={toggleFilter} />
                  )
                })}
              </div>
            </div>
          }

          {
            toggleDataSource &&
            <div className="tags">
              <div className="flex items-baseline">
                <h2 className="text-lg font-body font-medium flex-1">
                  Filter by sources
                </h2>
              </div>
              <div className={`flex flex-wrap py-4 ${styles.appear}`}>
                {dataSources.map(source => {
                  const isSelected = selectedDataSources.map(src => src.id).includes(source.id)
                  return (
                    <TagButton tag={source} key={source.id} isSelected={isSelected} toggleFilter={toggleDataSource} />
                  )
                })}
              </div>
            </div>
          }

          { (selectedTags?.length > 0 || selectedCategories?.length > 0 || selectedDataSources?.length > 0) &&
            <div className="flex justify-between absolute w-full bottom-0 left-0 p-3">
              <button onClick={reset} className="btn btn-clear text-red">Clear filters</button>
              <button onClick={closeFilters} className="btn btn-clear text-green">Search</button>
            </div>
          }
          </div>
        </div>
      </ReactModal>

    </div>
  )
}

export default TagFilter