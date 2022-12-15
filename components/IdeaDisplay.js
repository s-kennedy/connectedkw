import styles from "../styles/ideaGenerator.module.css"
import { tagEmojiDict } from "../utils/constants"
import ReactMarkdown from 'react-markdown'

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
  const imageCredit = getField("Image credit")
  const imageDescription = getField("Image description")

  return (
    <div className={`overflow-auto w-full bg-white p-5 border-3 rounded-xl border-black ${styles.result}`}>
      <div className={isLoading ? '' : styles.appear}>
        { !selectedIdea &&
          <div>
            <h3 className="text-2xl md:text-3xl mb-1 md:mb-4">
              Activity Roulette
            </h3>
            <p className="sm:text-lg md:text-xl md:mb-4">
              Looking for something to do?
            </p>
            <p className="sm:text-lg md:text-xl md:mb-4">
              Click &quot;Let&apos;s go&quot; to get an activity suggestion...
            </p>
          </div>
        }
        {image &&
        <div className="mb-4">
          <div className="relative">
            <img className="object-cover aspect-video" src={image.thumbnails.large.url} alt={imageDescription} width={image.thumbnails.large.width} height={image.thumbnails.large.height} />
            { imageCredit && <small className={`absolute bottom-0 left-0 right-0 p-1 text-xs ${styles.bgCaption}`}><ReactMarkdown>{imageCredit}</ReactMarkdown></small> }
          </div>
        </div>
        }
        {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
        {description && <div className="mb-4"><ReactMarkdown>{description}</ReactMarkdown></div>}
        {link && <a className="text-blue" href={getField("External link")} target="_blank" rel="noopener noreferrer">{linkText}</a>}
        <div className="flex flex-wrap mt-4">
          {tags.map(tag => <Tag name={tag} key={tag} />)}
        </div>
      </div>
    </div>
  )
}

export default IdeaDisplay
