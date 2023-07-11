import styles from "../styles/ideaGenerator.module.css"
import ReactMarkdown from 'react-markdown'
import slugify from 'slugify'
import Link from 'next/link'

const Tag = ({ name }) => {

  return (
    <div className="text-sm text-black px-2 py-1 m-1 ml-0 border-2 border-black rounded-md flex flex-nowrap">
      <span className="whitespace-nowrap">{name}</span>                        
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
    <div className="container sm:p-8 sm:max-w-screen-lg mx-auto">
      <div className="min-h-screen sm:min-h-0 h-full w-full bg-white sm:mt-10 relative sm:border-black sm:border-3 sm:rounded-xl">
        <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-5 sm:pt-5`}>
          <div className=''>
            {image &&
            <div className="mb-4">
              <div className="relative">
                <img className="w-full object-cover aspect-square sm:aspect-video" src={image.thumbnails.large.url} alt={imageDescription} width={image.thumbnails.large.width} height={image.thumbnails.large.height} />
                { (imageCredit?.length > 2) && <small className={`absolute bottom-0 left-0 right-0 text-xs p-1 ${styles.bgCaption}`}><ReactMarkdown>{imageCredit}</ReactMarkdown></small> }
              </div>
            </div>
            }
            {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
            {description && <div className="mb-4"><ReactMarkdown>{description}</ReactMarkdown></div>}
            {link && <a className="text-blue" href={getField("External link")} target="_blank" rel="noopener noreferrer">{linkText}</a>}
            <div className="flex flex-wrap my-4">
              {tags.map(tag => <Tag name={tag} key={tag} />)}
            </div>
          </div>
          <div className="my-6">
            <p>👈 <Link href="/activities">Back to activities</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityDisplay
