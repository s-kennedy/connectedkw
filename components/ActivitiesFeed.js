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
import { useRouter } from 'next/router'
import slugify from 'slugify'
import { tagEmojiDict } from "../utils/constants"

const Tag = ({ name }) => {

  return (
    <div className="text-sm text-black px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap">
      <span className="whitespace-nowrap">{name}</span>
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


const ActivitiesFeed = ({ activities, categories, tags }) => {
  const [allActivities, setAllActivities] = useState(activities)
  const [filteredActivities, setFilteredActivities] = useState(activities)
  const [featuredActivities, setFeaturedActivities] = useState([])
  const [selectedActivity, setSelectedActivity] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)
  const [featuredActivityIndex, setFeaturedActivityIndex] = useState(0)
  const router = useRouter()


  useEffect(() => {
    filterActivities()
  }, [selectedTags, selectedCategories])

  useEffect(() => {
    ReactModal.setAppElement("#activity-feed")
  })

  const filterActivities = () => {
    let filteredActivities = allActivities;

    if (selectedCategories.length > 0) {
      filteredActivities = filteredActivities.filter(activity => {
        const activityCategories = activity.fields.Category || []
        const matches = selectedCategories.map(cat => activityCategories.includes(cat) || activityCategories.includes("All ages"))
        // only allow events that match ALL the selected filters.
        // use .some() to keep the events that match ANY of the selected filters.
        return matches.some(m => m)
      })
    }

    if (selectedTags.length > 0) {
      filteredActivities = filteredActivities.filter(activity => {
        const activityTags = activity.fields.Tags || []
        const matches = selectedTags.map(tag => activityTags.includes(tag))

        // only allow activities that match ALL the selected filters.
        // use .some() to keep the activities that match ANY of the selected filters.
        return matches.some(m => m)
      })
    }

    setFilteredActivities(filteredActivities)
  }

  const reset = () => {
    setSelectedTags([])
    setSelectedCategories([])
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

  const selectRandom = () => {
    setLoading(true)
    const activity = filteredActivities[Math.floor(Math.random()*filteredActivities.length)];
    const slug = `${slugify(activity.fields.Title, { lower: true })}__${activity.id}`
    router.prefetch(`/activities/${slug}`)

    const timer = setTimeout(() => {
      router.push(`/activities/${slug}`)
    }, 750)
  }

  useEffect(() => {
    setLoading(false)
  }, [router.query.slug])

  const filters = selectedCategories.concat(selectedTags).join(', ')

  return (
    <div id="activity-feed" className={`relative min-h-0 flex flex-col w-full h-full styled-scrollbar`}>
      <div className="p-3">
        { isLoading ? (
          <div className="fixed inset-0 bg-white w-full h-full flex justify-center items-center">
            <div className="spinning w-[40px] h-[40px] text-4xl">🎲</div>
            {/*<Image src="/loading.svg" width={40} height={40} alt="loading" />*/}
          </div>
          ) : (
          <div className={`flex-auto flex-col space-y-2 overflow-auto styled-scrollbar snap-y`}>
            <h1 className="text-4xl md:text-5xl font-body font-bold">{`Activity Ideas (${filteredActivities.length})`}</h1>
            {filters.length > 0 && <p>{`Filtered by: ${filters}`}</p>}
            {filters.length > 0 && <button className="btn btn-transparent" onClick={reset}>{`Clear filters`}</button>}
            {
              filteredActivities.map(activity => {
                return <ActivityCard setSelectedActivity={setSelectedActivity} activity={activity} key={activity.id} />
              })
            }
          </div>
        )}
      </div>
      <div className="flex justify-end action-bar border-t-3 border-black fixed bottom-0 right-0 left-0 w-full bg-white p-2 space-x-1 flex-wrap">
        <Link href="/activities/new" className="btn btn-white rounded-full text-sm whitespace-nowrap ">Submit +</Link>
        <div className="">
          <TagFilter
            toggleFilter={toggleFilter}
            selectedTags={selectedTags}
            toggleCategory={toggleCategory}
            selectedCategories={selectedCategories}
            reset={reset}
            appElementId="#activity-feed"
            categories={categories}
            tags={tags}
          />
        </div>
        <button onClick={selectRandom} className="btn btn-green rounded-full text-sm whitespace-nowrap ">Pick for me! 🎲</button>
      </div>
    </div>
  )
}

export default ActivitiesFeed