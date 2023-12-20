import { eventCategories, tagEmojiDict } from "../utils/constants"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import Image from 'next/image'
import dynamic from 'next/dynamic'

const previewFields = {
  "artist_year": dynamic(() => import('components/ArtistYear')),
  "location": dynamic(() => import('components/Location')),
  "address": dynamic(() => import('components/Address')),
  "tags": dynamic(() => import('components/Tags')),
  "description": dynamic(() => import('components/Description')),
}

const FeatureCard = ({ feature, setSelectedFeature, preview }) => {
  if (!feature) return null

  const image = feature.images ? feature.images[0] : null
  const imgSrc = image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.id}?key=small-640` : null
  const title = feature.title || "Untitled"

  return (
    <button onClick={() => setSelectedFeature(feature)} className={`snap-start transition-all relative p-0 block w-full bg-white border-3 rounded-xl border-black mb-1 overflow-hidden`}>
      { imgSrc &&
          <Image
            className={`bg-lightPurple aspect-square w-full object-cover`}
            src={imgSrc}
            alt={image.description || ''}
            width={image.width}
            height={image.height}
          />
      }
        <div className={`basis-2/3 flex-auto text-left overflow-auto h-full styled-scrollbar p-3`}>
          <h3 className="mb-1 font-body font-medium">{title}</h3>
          { preview.map(field => {
            const DynamicComponent = previewFields[field.preview_field];
            if (!DynamicComponent) return null

            return <DynamicComponent key={field.preview_field} feature={feature} />
          })}
        </div>
    </button>
  )
}

const FeatureGrid = ({ features, categories, setSelectedFeature, preview=[] }) => {
  return(
      <ResponsiveMasonry
        columnsCountBreakPoints={{640: 1, 641: 2, 768: 3}}
      >
        <Masonry gutter="0.5rem" columnsCount={1}>
          { features.map(feature => <FeatureCard key={feature.id} feature={feature} setSelectedFeature={setSelectedFeature} preview={preview} />) }
        </Masonry>
      </ResponsiveMasonry>
  )
}

export default FeatureGrid