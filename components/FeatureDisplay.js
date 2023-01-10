import styles from "../styles/ideaGenerator.module.css"
import ReactMarkdown from 'react-markdown'

function FeatureDisplay({ feature={}, closeModal }) {
  if (!feature) {
    return null
  }

  let imgSrc = undefined

  if (feature?.Images) {
    imgSrc = feature.Images[0].url
  }

  const title = feature.Title || "Untitled"
  const artist = feature.Artist || "Artist unknown"
  const date = feature.Year
  const locationName = feature["Location description"]
  const address = feature["Street address"]
  const city = feature.City
  const description = feature.Description
  const link = feature["External link"]
  const linkText = feature["Link text"] || "More information"
  const imageCredit = feature["Image credit"]

  const fullAddress = [address, city].filter(i=>i).join(", ")
  
  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&size=120x120&markers=color:red|${feature.Latitude},${feature.Longitude}&style=feature:all|saturation:-100`
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${feature.Latitude},${feature.Longitude}`

  return (
    <div className="h-full w-full bg-white pt-8 border-3 rounded-xl border-black relative">
      <div className="w-full flex justify-end absolute top-0 left-0">
        <button onClick={closeModal} className={`text-lg font-medium btn-clear`}>✕</button>
      </div>
      <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-4 pt-0`}>
        
          {imgSrc &&
          <div className="mb-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-lightPurple">
              <img className={`w-full h-full object-cover ${styles.appear}`} src={imgSrc} alt={`Photo of artwork titled ${title}`} />
              { (imageCredit?.length > 2) && <small className={`absolute bottom-0 left-0 right-0 text-xs p-1 ${styles.bgCaption}`}><ReactMarkdown>{imageCredit}</ReactMarkdown></small> }
            </div>
          </div>
          }
          {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
          <p className="mb-1 text-sm">{artist}</p>
          {date && <p className="mb-1 text-sm">{date}</p>}
          {description && <div className="my-4"><ReactMarkdown>{description}</ReactMarkdown></div>}

          <a href={mapUrl} className="flex no-underline text-black" title="Click to open in Google Maps" target="_blank" rel="noreferrer noopener">
            <div className="flex-none aspect-square overflow-hidden bg-lightPurple h-[120px] w-[120px] rounded-lg">
              <img src={staticMapUrl} alt="location of artwork on map" width="120" height="120" className="aspect-square w-full h-full" />
            </div>
            <div className="w-full p-4">
              <h4 className="text mb-1 font-body font-medium">Location</h4>
              {locationName && <p className="mb-1 text-sm">{locationName}</p>}
              <p className="mb-1 text-sm">{fullAddress}</p>
            </div>
          </a>

          {link && <a className="btn btn-purple my-4" href={link} target="_blank" rel="noopener noreferrer">{`🔗 ${linkText}`}</a>}

      </div>
    </div>
  )
}

export default FeatureDisplay
