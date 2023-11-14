import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import Image from 'next/image'
import Filters from "components/Filters"
import slugify from 'slugify'
import { useRouter } from 'next/router'

const defaultValues = {
  "boolean": false,
  "select-multiple": []
}

const Tag = ({ name }) => {
  return (
    <div className="text-sm text-black px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap">
      <span className="whitespace-nowrap">{name}</span>
    </div>
  )
}

const ActivityCard = ({ activity, setSelectedActivity }) => {
  const getField = (fieldName) => {
    return activity?.[fieldName]
  }

  const getImageObj = () => {
    return activity?.fields?.Image?.[0]
  }

  const title = getField("Title")
  const description = getField("Description")
  const link = getField("External link")
  const linkText = `🔗 ${getField("Link text") || "More info"}`
  const image = getImageObj()
  const tags = getField("Tags") || []
  const imageCredit = getField("Image credit")
  const imageDescription = getField("Image description")
  const categories = getField("Category") || []

  const slug = `${slugify(title, { lower: true })}__${activity.id}`
  const tagsString = tags.join(', ')
  const categoriesString = categories.join(', ')

  return (
    <Link href={`/activities/${slug}`} className={`${styles.eventCard} btn relative snap-start transition-all p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black ${styles.result}`}>
      <div className="info p-3 text-left">
        {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
        <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>#️⃣</span><span>{tagsString}</span></p>
        <p className="text-sm mb-1 space-x-3 flex flex-nowrap"><span>👶</span><span>{categoriesString}</span></p>
      </div>
    </Link>
  )
}


const ActivitiesFeed = ({ activities=[], filters=[] }) => {
  const emptyFilters = filters.reduce((a, f) => {
    const defaultValue = defaultValues[f.type]
    return { ...a, [f.id]: defaultValue}
  }, {}) 
  const [selectedFilters, setSelectedFilters] = useState(emptyFilters)
  const [filteredActivities, setFilteredActivities] = useState(activities)
  const router = useRouter()

  useEffect(() => {
    filterActivities()
  }, [selectedFilters])

  useEffect(() => {
    ReactModal.setAppElement("#activity-feed")
  })

  const selectRandom = () => {
    const activity = filteredActivities[Math.floor(Math.random()*filteredActivities.length)];
    const slug = `${slugify(activity.Title, { lower: true })}__${activity.id}`
    router.push(`/activities/${slug}`)
  }

  const filterActivities = () => {
    let filteredActivities = activities;

    filters.forEach(filter => {
      switch (filter.type) {
      case "boolean":
        if (selectedFilters[filter.id] === true) {
          filteredActivities = filteredActivities.filter(activity => filter.attributeFn(activity) === true) 
        }
        break;
      case "select-multiple":
        if (Boolean(selectedFilters[filter.id]?.length)) {
          filteredActivities = filteredActivities.filter(activity => {
            const attributeIds = filter.attributeFn(activity) || []
            const selectedFilterIds = selectedFilters[filter.id]
            const matches = selectedFilterIds.map(id => attributeIds.includes(id))
            // only allow activities that match ALL the selected filters.
            // use .some() to keep the activities that match ANY of the selected filters.
            return matches.some(m => m)
          })
        }
        break;
      }
    })

    setFilteredActivities(filteredActivities)
  }

  const reset = () => {
    setSelectedFilters(emptyFilters)
  }

  const toggleFn = (filter, value) => {
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

  return (
    <div id="activity-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="p-3">
        <div className={`flex-auto flex-col space-y-2`}>
          <h1 className="text-4xl md:text-5xl font-body font-bold">{`Activities (${filteredActivities.length})`}</h1>
          <Filters
            filters={filters}
            selectedFilters={selectedFilters}
            toggleFn={toggleFn}
            reset={reset}
          >
            <button onClick={selectRandom} className="btn btn-white relative space-x-1 mb-2">
              <div className="relative">
                <span>Pick for me 🎲</span>
              </div>
            </button>
          </Filters>
          <div className="flex-auto flex-col space-y-2 overflow-auto styled-scrollbar snap-y relative my-2">
          {filteredActivities.map(activity => <ActivityCard activity={activity} key={activity.id} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivitiesFeed

