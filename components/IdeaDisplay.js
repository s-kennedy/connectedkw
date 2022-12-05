import styles from '../styles/ideaGenerator.module.css'
import { tagEmojiDict } from '../utils/constants'

const Tag = ({ name }) => {
  const tagEmoji = tagEmojiDict[name]

  return (
    <div className="text-sm px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap">
      <span className="whitespace-nowrap">{name}</span>
      {tagEmoji && <span className="ml-1">{tagEmoji}</span>}
    </div>
  )
}

function IdeaDisplay({ selectedIdea, isLoading }) {

  const getField = (fieldName) => {
    return selectedIdea?.fields?.[fieldName]
  }

  const getImageObj = () => {
    return selectedIdea?.fields?.Image?.[0]
  }

  const title = getField("Title")
  const description = getField("Description")
  const link = getField("External link")
  const linkText = `🔗 ${getField("Link text") || "More info"}`
  const image = getImageObj()
  const tags = getField("Tags") || []

  return (
    <div className={`overflow-auto w-full bg-white p-5 border-3 rounded-xl border-black ${styles.result}`}>
      <div className={isLoading ? '' : styles.appear}>
        { !selectedIdea &&
          <div>
            <p className="font-title text-2xl mb-4">
              Looking for something to do?
            </p>
            <p className="font-body text-xl mb-4">
              Try our activity idea generator!
            </p>
          </div>
        }
        {image &&
        <div className="bg-yellow mb-4">
          <img src={image.thumbnails.large.url} alt={getField("Image description")} width={image.thumbnails.large.width} height={image.thumbnails.large.height} />
        </div>
        }
        {title && <h3 className="text-lg mb-2 font-body font-medium">{title}</h3>}
        {description && <p className="mb-4">{description}</p>}
        {link && <a className="text-blue" href={getField("External link")} target="_blank" rel="noopener noreferrer">{linkText}</a>}
        <div className="flex flex-wrap mt-4">
          {tags.map(tag => <Tag name={tag} key={tag} />)}
        </div>
      </div>
    </div>
  )
}

export default IdeaDisplay
