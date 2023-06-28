import styles from "../styles/ideaGenerator.module.css"
import { tagEmojiDict } from "../utils/constants"
import ReactMarkdown from 'react-markdown'
import slugify from 'slugify'

const Tag = ({ name }) => {
  const tagEmoji = tagEmojiDict[name]

  return (
    <div className="text-sm px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap">
      <span className="whitespace-nowrap">{name}</span>
      {tagEmoji && <span className="ml-1">{tagEmoji}</span>}
    </div>
  )
}

function ActivityDisplay({ activity }) {

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

  return (
    <div className="container sm:py-8 md:p-8 sm:max-w-screen-lg mx-auto">
      <div className="min-h-screen sm:min-h-0 h-full w-full bg-white pt-10 md:mt-10 relative md:border-black md:border-3 md:rounded-xl">
        <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-5 pt-0`}>
          <div className=''>
            {image &&
            <div className="mb-4">
              <div className="relative">
                <img className={`object-cover aspect-square md:aspect-video ${styles.appear}`} src={imgSrc} alt={imageDescription || title} width={image ? image.thumbnails.large.width : undefined } height={image ? image.thumbnails.large.height : undefined} />
                { (imageCredit?.length > 2) && <small className={`absolute bottom-0 left-0 right-0 text-xs p-1 ${styles.bgCaption}`}><ReactMarkdown>{imageCredit}</ReactMarkdown></small> }
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
      </div>
    </div>
  )
}

export default ActivityDisplay
