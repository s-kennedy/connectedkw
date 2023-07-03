import styles from "styles/events.module.css"
import { useState, useEffect } from "react"
import ReactModal from "react-modal";
import Link from 'next/link'
import Image from 'next/image'
import TagFilter from "components/TagFilter"
import ActivityDisplay from "components/ActivityDisplay"
import ReactMarkdown from 'react-markdown'
import OutsideClickHandler from 'react-outside-click-handler';
import Blob from 'components/Blob'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"
import { activityCategories } from 'utils/constants'
import { useRouter } from 'next/router'
import slugify from 'slugify'
import { tagEmojiDict } from "../utils/constants"

const Tag = ({ name }) => {
  const tagEmoji = tagEmojiDict[name]

  return (
    <div className="text-sm text-black px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap">
      <span className="whitespace-nowrap">{name}</span>
      {tagEmoji && <span className="ml-1">{tagEmoji}</span>}
    </div>
  )
}

const ActivityCard = ({ activity, setSelectedActivity }) => {
  const getField = (fieldName) => {
    return activity?.fields?.[fieldName]
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

  const slug = `${slugify(title, { lower: true })}__${activity.id}`

  return (
    <Link href={`/activities/${slug}`} className={`${styles.eventCard} btn relative snap-start transition-all p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black ${styles.result}`}>
      <div className="info p-3 text-left">
        {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
        <div className="flex flex-wrap mt-4">
          {tags.map(tag => <Tag name={tag} key={tag} />)}
        </div>
      </div>
    </Link>
  )
}


const ActivitiesFeed = ({ activities }) => {
  const [allActivities, setAllActivities] = useState(activities)
  const [filteredActivities, setFilteredActivities] = useState(activities)
  const [featuredActivities, setFeaturedActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuredActivityIndex, setFeaturedActivityIndex] = useState(0)


  useEffect(() => {
    filterActivities()
  }, [selectedTags, selectedCategories])

  useEffect(() => {
    ReactModal.setAppElement("#activity-feed")
  })

  const filterActivities = () => {
    let filteredActivities = allActivities;

    if (selectedTags.length > 0) {
      filteredActivities = filteredActivities.filter(activity => {
        const activityTags = activity.fields.Tags || []
        const matches = selectedTags.map(tag => activityTags.includes(tag))

        // only allow activities that match ALL the selected filters.
        // use .some() to keep the activities that match ANY of the selected filters.
        return matches.every(m => m)
      })
    }

    setFilteredActivities(filteredActivities)
  }

  const fetchActivities = () => {
    setLoading(true)
    fetch("/api/activities")
      .then((res) => res.json())
      .then((data) => {
        setAllActivities(data.activities)
        setFilteredActivities(data.activities)
        setLoading(false)
      })
  }

  const reset = () => {
    setSelectedTags([])
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

  const toggleCategory = (categoryName) => {
    const alreadySelected = selectedCategories.includes(categoryName)

    if (alreadySelected) {
      const filteredCategories = selectedCategories.filter(item => item != categoryName)
      setSelectedCategories(filteredCategories)
    } else {
      const newCategories = [...selectedCategories, categoryName]
      setSelectedCategories(newCategories)
    }
  }

  const openMenu = () => setMenuOpen(true)
  const closeMenu = () => setMenuOpen(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const nextFeaturedActivity = () => {
    const maxIndex = featuredActivities.length - 1
    if (featuredActivityIndex < maxIndex) {
      setFeaturedActivityIndex(featuredActivityIndex + 1)
    } else {
      setFeaturedActivityIndex(0)
    }
  }

  const prevFeaturedActivity = () => {
    const maxIndex = featuredActivities.length - 1
    if (featuredActivityIndex === 0) {
      setFeaturedActivityIndex(maxIndex)
    } else {
      setFeaturedActivityIndex(featuredActivityIndex - 1)
    }
  }

  const allOut = filteredActivities?.length === 0;

  return (
    <div id="activity-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="p-3">
        { isLoading ? (
          <div className="border-3 rounded-xl border-black bg-white w-full h-full flex justify-center items-center min-h-halfscreen">
            <Image src="/loading.svg" width={40} height={40} alt="loading" />
          </div>
          ) : (
          <div className={`flex-auto flex-col space-y-2 overflow-auto styled-scrollbar snap-y`}>
            {
              filteredActivities.map(activity => {
                return <ActivityCard setSelectedActivity={setSelectedActivity} activity={activity} key={activity.id} />
              })
            }
          </div>
        )}
      </div>
      <ReactModal
        isOpen={!!selectedActivity}
        onRequestClose={() => setSelectedActivity(null)}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="max-w-md mx-auto h-full"
        style={{
          overlay: { zIndex: 100 }
        }}
      >
        <ActivityDisplay activity={selectedActivity} closeModal={() => setSelectedActivity(null)} />
      </ReactModal>
      <div className="flex justify-end action-bar border-t-3 border-black fixed bottom-0 right-0 left-0 w-full bg-white p-2">
        <div className="">
        <TagFilter
          toggleFilter={toggleFilter}
          selectedTags={selectedTags}
          reset={reset}
          appElementId="#activity-feed"
        />
        </div>
      </div>
    </div>
  )
}

export default ActivitiesFeed