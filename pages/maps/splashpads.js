import InteractiveMapParks from 'components/InteractiveMapParks'
import Section from 'components/Section'
import Layout from 'components/Layout'
import { getFeatures, getFeaturesTags, getCategoriesByGroup } from 'integrations/directus';

export async function getServerSideProps(context) {
  const features = await getFeatures('splashpads')
  const tags = await getFeaturesTags(features)
  const categories = await getCategoriesByGroup('availability')

  return {
    props: { features, tags, categories }
  }
}

export default function ParkMap({ features, tags, categories }) {

  const mapConfig = {
    mapId: "splashpads-map",
    categories: categories,
    categoriesName: "status",
    tags: tags,
    tagsName: "amenities",
    preview: {
      title: 'Title', 
      details: []
    },
    featureDisplayFields: ['description']
  }

  return (
    <Layout 
      title="Splashpads in Waterloo Region" 
      description="Make the most of your summer at the outdoor splashpads in Kitchener, Waterloo and Cambridge!"
      colour="yellow" 
      image="https://www.unboringkw.com/map-thumbnail.jpg"
    >
      <Section className="snap-center p-3">
        <div className="mb-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl mb-4">
            Splashpads in Waterloo Region
          </h1>
          <p>{`It's time to get out the sunscreen and crocs - it's splashpad season!`}</p>
          <p>{`We pulled this information from the following sources:`}</p>
          <ul className="mb-2">
            <li><a href="https://www.waterloo.ca/en/things-to-do/pools-and-splash-pad.aspx">{`City of Waterloo Pools and Splashpads`}</a></li>
            <li><a href="https://www.kitchener.ca/en/pools-and-swimming/splashpads.aspx">{`City of Kitchener Splashpads`}</a></li>
            <li><a href="https://facilities.cambridge.ca/?CategoryIds=&FacilityTypeIds=42&Keywords=&ScrollTo=google-map-trigger&CloseMap=true">{`City of Cambridge Parks and Facilities`}</a></li>
          </ul>
          <p>{`Happy splashing!`}</p>
        </div>
        <div className="w-full">
          <InteractiveMapParks 
            features={features} 
            mapConfig={mapConfig}
          />
        </div>
      </Section>
    </Layout>
  )
}
