import { eventCategories, tagEmojiDict } from "../utils/constants"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const FeatureCard = ({ feature, setSelectedFeature, displayFields }) => {
  if (!feature) return null

  const image = feature.Images ? feature.Images[0] : null
  const imgSrc = image?.thumbnails?.large?.url
  const imageDescription = feature["Image description"]
  const title = feature.Title || "Untitled"

  return (
    <button onClick={() => setSelectedFeature(feature)} className={`snap-start transition-all relative p-0 items-start flex-col w-full bg-white border-3 rounded-xl border-black overflow-hidden mb-1`}>
      <div className={`w-full h-full min-h-0`}>
      { imgSrc &&
        <div className={`aspect-square flex-none overflow-hidden bg-lightPurple`}>
          <img
            className={`object-cover w-full h-full min-[500px]:max-md:aspect-square`}
            src={imgSrc}
            alt={imageDescription}
            width={image ? image?.thumbnails?.large?.width : undefined}
            height={image ? image?.thumbnails?.large?.height : undefined}
          />
        </div>
      }
        <div className={`basis-2/3 flex-auto text-left overflow-auto h-full styled-scrollbar p-3`}>
          <h3 className="mb-1 font-body font-medium">{title}</h3>
          { displayFields.map(field => {
            const text = feature[field]
            if (text) {
              return <p className="text-sm mb-1" key={field}>{feature[field]}</p>
            } 
          })}
        </div>
      </div>
    </button>
  )
}

const FeatureGrid = ({ features, categories, setSelectedFeature, displayFields=[] }) => {
  return(
      <ResponsiveMasonry
        columnsCountBreakPoints={{640: 1, 641: 2, 768: 3}}
      >
        <Masonry gutter="0.5rem" columnsCount={1}>
          { features.map(feature => <FeatureCard key={feature.id} feature={feature} setSelectedFeature={setSelectedFeature} displayFields={displayFields} />) }
        </Masonry>
      </ResponsiveMasonry>
  )
}

export default FeatureGrid