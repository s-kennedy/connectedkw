import styles from "../styles/ideaGenerator.module.css"
import ReactMarkdown from 'react-markdown'

function FeatureDisplay({ feature={}, closeModal }) {
  if (!feature) {
    return null
  }

  console.log({feature})

  const {
    id,
    title,
    description,
    external_link,
    link_text='More info',
    images,
    location
  } = feature;

  let image = images[0]
  let imageUrl;

  if (image) {
    imageUrl = image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.id}?key=small-640` : null
  }

  const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&size=120x120&markers=color:red|${location.coordinates.coordinates[1]},${location.coordinates.coordinates[0]}&style=feature:all|saturation:-100`
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${location.coordinates.coordinates[1]},${location.coordinates.coordinates[0]}`

  return (
    <div className="h-full w-full bg-white pt-8 border-3 rounded-xl border-black relative">
      <div className="w-full flex justify-end absolute top-0 left-0">
        <button onClick={closeModal} className={`text-lg font-medium btn-clear`}>✕</button>
      </div>
      <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-4 pt-0`}>
        
          {image &&
          <div className="mb-4">
            <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-lightPurple">
              <img className={`w-full h-full object-cover ${styles.appear}`} src={imageUrl} alt={`Photo of artwork titled ${title}`} />
              { (image.credit?.length > 2) && <small className={`absolute bottom-0 left-0 right-0 text-xs p-1 ${styles.bgCaption}`}><ReactMarkdown>{`Image credit: ${image.credit}`}</ReactMarkdown></small> }
            </div>
          </div>
          }
          {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
          {/*{artist && <p className="mb-1 text-sm">{artist}</p>}*/}
          {/*{date && <p className="mb-1 text-sm">{date}</p>}*/}
          {description && <div className="my-4"><ReactMarkdown>{description}</ReactMarkdown></div>}

          <a href={mapUrl} className="flex no-underline text-black" title="Click to open in Google Maps" target="_blank" rel="noreferrer noopener">
            <div className="flex-none aspect-square overflow-hidden bg-lightPurple h-[120px] w-[120px] rounded-lg">
              <img src={staticMapUrl} alt="location of artwork on map" width="120" height="120" className="aspect-square w-full h-full" />
            </div>
            <div className="w-full p-4">
              <h4 className="text mb-1 font-body font-medium">Location</h4>
              {location && <p className="mb-1 text-sm">{location.name}</p>}
              {location && <p className="mb-1 text-sm">{[location.street_address, location.city].join(', ')}</p>}
              {location.note && <p className="mb-1 text-sm">{location.note}</p>}
            </div>
          </a>

          {external_link && <a className="btn btn-purple my-4" href={external_link} target="_blank" rel="noopener noreferrer">{`🔗 ${link_text}`}</a>}

      </div>
    </div>
  )
}

export default FeatureDisplay
