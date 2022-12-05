import styles from '../styles/ideaGenerator.module.css'
import { useState, useEffect } from 'react'
import ReactModal from 'react-modal';

import IdeaDisplay from "./IdeaDisplay"
import TagFilter from "./TagFilter"
import GeneratorButton from "./GeneratorButton"

function IdeaGenerator() {
  const [allIdeas, setAllIdeas] = useState([])
  const [availableIdeas, setAvailableIdeas] = useState([])
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    fetchIdeas()
  }, [])

  useEffect(() => {
    filterIdeas()
  }, [selectedTags])

  const filterIdeas = () => {
    if (selectedTags.length < 1) {
      return setAvailableIdeas(allIdeas)
    }

    const filteredIdeas = allIdeas.filter(idea => {
      const ideaTags = idea.fields.Tags
      const matches = selectedTags.map(tag => ideaTags.includes(tag))

      // only allow ideas that match ALL the selected filters.
      // use .some() to keep the ideas that match ANY of the selected filters.
      return matches.every(m => m)
    })

    setAvailableIdeas(filteredIdeas)
  }

  const fetchIdeas = () => {
    // setLoading(true)
    fetch('/api/ideas')
      .then((res) => res.json())
      .then((data) => {
        setAllIdeas(data.ideas)
        setAvailableIdeas(data.ideas)
        // setLoading(false)
      })
  }

  const reset = () => {
    setSelectedTags([])
  }

  const selectIdea = () => {
    setLoading(true)
    const timer = setTimeout(() => {
      const idea = availableIdeas[Math.floor(Math.random()*availableIdeas.length)];
      const remainingIdeas = availableIdeas.filter((item) => {
        return item.id !== idea.id
      })

      setSelectedIdea(idea)
      setLoading(false)

      if (remainingIdeas.length > 0) {
        setAvailableIdeas(remainingIdeas)
      } else {
        console.log("reload ideas!")
        setAvailableIdeas(allIdeas)
        filterIdeas()
      }
    }, 300)
  }

  const toggleFilter = (tagName) => {
    const alreadySelected = selectedTags.includes(tagName)

    if (alreadySelected) {
      const filteredTags = selectedTags.filter(item => item != tagName)
      setSelectedTags(filteredTags)
    } else {
      const newTags = [...selectedTags, tagName]
      setSelectedTags(newTags)
    }
  }

  console.log(selectedTags)
  console.log({availableIdeas})

  const allOut = availableIdeas.length === 0;

  return (
    <div id="idea-generator" className={`flex flex-col w-full h-full ${styles.ideaGenerator}`}>
      <div className="flex-auto flex overflow-hidden relative">
        <IdeaDisplay allOut={allOut} selectedIdea={selectedIdea} isLoading={isLoading} />
      </div>
      <div className="flex-none flex relative mb-2">
        <TagFilter
          toggleFilter={toggleFilter}
          selectedTags={selectedTags}
          reset={reset}
        />
        <GeneratorButton
          selectIdea={selectIdea}
          selectedIdea={selectedIdea}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default IdeaGenerator