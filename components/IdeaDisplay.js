import styles from '../styles/ideaGenerator.module.css'

function IdeaDisplay({ selectedIdea, isLoading }) {

  const getField = (fieldName) => {
    return selectedIdea?.fields?.[fieldName]
  }

  if (!selectedIdea) {
    return null
  }

  const getImageObj = () => {
    return selectedIdea?.fields?.Image?.[0]
  }

  const title = getField("Title")
  const description = getField("Description")
  const link = getField("External link")
  const linkText = `👉 ${getField("Link text") || "More info"}`
  const image = getImageObj()
  const tags = getField("Tags") || []

  return (
    <div className={`bg-white p-5 pt-10 border-3 rounded-xl border-black ${styles.result}`}>
      <div className={isLoading ? '' : styles.appear}>
        {image &&
        <div className="bg-yellow mb-4">
          <img src={image.thumbnails.large.url} alt={getField("Image description")} width={image.thumbnails.large.width} height={image.thumbnails.large.height} />
        </div>
        }
        {title && <h3 className="text-xl pb-4">{title}</h3>}
        <div className="flex">
          {tags.map(tag => (
            <div className="text-sm px-2 py-0 m-1 border-2 border-black rounded-md">{tag}</div>
          ))}
        </div>
        {description && <p className="mb-4">{description}</p>}
        {link && <a className="text-blue" href={getField("External link")} target="_blank" rel="noopener noreferrer">{linkText}</a>}
      </div>
    </div>
  )
}

export default IdeaDisplay