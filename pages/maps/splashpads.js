import InteractiveMapParks from 'components/InteractiveMapParks'
import Section from 'components/Section'
import Layout from 'components/Layout'
import { getFeatures, getFeaturesTags } from 'integrations/directus';

export async function getServerSideProps(context) {
  const features = await getFeatures('splashpads')
  const tags = await getFeaturesTags(features)

  return {
    props: { features, tags }
  }
}

export default function ParkMap({ features, tags }) {
  console.log({tags})

  const categories = {
    "Open for the season 😎": { color: "#06d6a0", label: "Open for the season 😎" }, // green 
    "Closed 🚧": { color: "#d7d1d8", label: "Closed 🚧" }, // purple
  }

  const taggs = [
    "Playground",
    "Picnic shelter",
    "Baseball diamond",
    "Basketball court",
    "Sports field",
    "Cricket pitch",
    "Green space",
    "Trails",
    "Bicycle parking",
    "Off-leash dog park",
    "Bathrooms",
    "Skate park",
    "Pool",
    "Community centre",
  ]

  const mapConfig = {
    mapId: "splashpads-map",
    categories: categories,
    categoriesName: "status",
    tags: tags.map(t => t.name),
    tagsName: "amenities",
    preview: {
      title: 'Title', 
      details: []
    },
    featureDisplayFields: ['Category', 'Description']
  }

  return (
    <Layout 
      title="Splashpads in Waterloo Region" 
      description="Make the most of your summer at the outdoor splashpads in Kitchener, Waterloo and Cambridge!"
      color="yellow" 
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
