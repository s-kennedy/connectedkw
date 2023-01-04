import styles from "../styles/ideaGenerator.module.css"
import { eventCategories, tagEmojiDict } from "../utils/constants"
import ReactMarkdown from 'react-markdown'

function FeatureDisplay({ feature={}, closeModal }) {
  console.log(feature)
  let imgSrc = undefined

  if (feature.Images) {
    imgSrc = feature.Images[0].url
  }

  const title = feature.Title || "Untitled"
  const artist = feature.Artist || "Artist unknown"
  const date = feature.Year || "ND"
  const locationName = feature["Location description"]
  const address = feature["Street address"]
  const city = feature.City
  const description = feature.Description
  const link = feature["External link"]
  const imageCredit = feature["Image credit"]

  const fullAddress = [address, city].join(", ")
  const artistInfo = [artist, date].join(", ")

  return (
    <div className="h-full w-full bg-white pt-8 border-3 rounded-xl border-black relative">
      <div className="w-full flex justify-end absolute top-0 left-0">
        <button onClick={closeModal} className={`text-lg font-medium btn-clear`}>✕</button>
      </div>
      <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-4 pt-0`}>
        
          {imgSrc &&
          <div className="mb-4">
            <div className="relative w-full aspect-square overflow-hidden bg-lightPurple">
              <img className={`w-full h-full object-cover ${styles.appear}`} src={imgSrc} alt={`Photo of artwork titled ${title}`} />
              { (imageCredit?.length > 2) && <small className={`absolute bottom-0 left-0 right-0 text-xs p-1 ${styles.bgCaption}`}><ReactMarkdown>{imageCredit}</ReactMarkdown></small> }
            </div>
          </div>
          }
          {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
          <p className="mb-1 space-x-3 flex flex-nowrap text-sm"><span>🖌</span><span>{artistInfo}</span></p>
          <p className="mb-1 space-x-3 flex flex-nowrap text-sm"><span>📍</span><span>{locationName}<br />{fullAddress}</span></p>
          {description && <div className="my-4"><ReactMarkdown>{description}</ReactMarkdown></div>}

          {link && <a className="btn btn-purple my-4" href={link} target="_blank" rel="noopener noreferrer">{`🔗 More information`}</a>}

      </div>
    </div>
  )
}

export default FeatureDisplay
