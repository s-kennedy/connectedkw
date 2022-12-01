import { useState, useEffect } from 'react'
import Arrow from "./Arrow"
import IdeaDisplay from "./IdeaDisplay"

function IdeaGenerator() {
  const [allIdeas, setAllIdeas] = useState([])
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = () => {
    // setLoading(true)
    fetch('/api/ideas')
      .then((res) => res.json())
      .then((data) => {
        setAllIdeas(data.ideas)
        // setLoading(false)
      })
  }

  const selectIdea = () => {
    setLoading(true)
    const timer = setTimeout(() => {
      const idea = allIdeas[Math.floor(Math.random()*allIdeas.length)];
      const remainingIdeas = allIdeas.filter((item) => {
        return item.id !== idea.id
      })

      setSelectedIdea(idea)
      setLoading(false)

      if (remainingIdeas.length >= 1) {
        setAllIdeas(remainingIdeas)
      } else {
        fetchIdeas()
      }
    }, 500)
  }

  return (
    <div className="flex-auto bg-green">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto p-2 lg:px-4">
          <h1 className="font-title text-3xl mb-6">
            Looking for something to do?
          </h1>
          <p className="font-body text-xl mb-6">
            Try our activity idea generator!
          </p>
          <div className="flex justify-center">
            <button onClick={selectIdea} className={`relative p-16 text-xl font-title text-black`}>
              <div className={`absolute inset-0 `}>
                <Arrow arrowDown={!!selectedIdea} loading={isLoading} />
              </div>
              <span className="absolute inset-0 flex p-4 items-center">Let's go</span>
            </button>
          </div>

          <IdeaDisplay selectedIdea={selectedIdea} isLoading={isLoading} />

        </div>
      </div>
    </div>
  )
}

export default IdeaGenerator