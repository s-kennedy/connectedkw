import InteractiveMapParks from 'components/InteractiveMapParks'
import Section from 'components/Section'
import Layout from 'components/Layout'
import { getMapFeatures } from 'integrations/airtable';

export async function getServerSideProps(context) {
  const features = await getMapFeatures('Parks')
  return {
    props: { features },
  }
}

export default function ParkMap({ features }) {
  const categories = {
    "Awesome!! 🤩": { color: "#ffd166", label: "Awesome!! 🤩" }, // yellow 
    "Pretty good 👍": { color: "#06d6a0", label: "Pretty good 👍" }, // green
    "Meh 😕": { color: "#118ab2", label: "Meh 😕" }, // blue
    "Hidden gem 💎": { color: "#ef476f", label: "Hidden gem 💎" }, // red
    "Unrated 🤷🏻‍♀️": { color: "#d7d1d8", label: "Unrated 🤷🏻‍♀️" }, // light purple
  }

  const tags = [
    "Splash pad",
    "Sports field",
    "Picnic shelter",
    "Baseball diamond",
    "Basketball court",
    "Pickleball court",
    "Tennis court",
    "Table tennis",
    "Cricket pitch",
    "Beach volleyball court",
    "Outdoor rink",
    "Outdoor field",
    "Indoor rink",
    "Indoor field",
    "Green space",
    "Trails",
    "Bicycle parking",
    "Off-leash dog park",
    "Bathrooms",
    "Skate park",
    "Concession stand",
    "Pool",
    "Tobogganing hill",
    "Community centre",
    "Playground"
  ]

  const mapConfig = {
    mapId: "playgrounds-map",
    categories: categories,
    categoriesName: "rating",
    tags: tags,
    tagsName: "amenities",
    preview: {
      title: 'Title', 
      details: []
    },
    featureDisplayFields: ['Category', 'Description']
  }

  return (
    <Layout 
      title="Playgrounds in Kitchener-Waterloo" 
      description="Explore the parks and playgrounds in Kitchener and Waterloo"
      color="yellow" 
      image="https://www.unboringkw.com/playgrounds-map-thumbnail.webp"
    >
      <Section className="snap-center mt-12 p-3">
        <div className="mb-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4">
            Playgrounds in Kitchener-Waterloo
          </h1>
          <p>{`Get outside and enjoy some of the public park spaces we have in our region!`}</p>
          <p>{`We pulled this information from the following sources:`}</p>
          <ul className="mb-2">
            <li><a href="https://www.waterloo.ca/en/things-to-do/parks-and-facilities.aspx">{`City of Waterloo Parks and Facilities`}</a></li>
            <li><a href="https://facilities.kitchener.ca/?CategoryIds=&FacilityTypeIds=40981&Keywords=&ScrollTo=facilityResultsContainer&CloseMap=true&Page=20">{`City of Kitchener Parks and Facilities`}</a></li>
          </ul>
          <p>{`Happy exploring!`}</p>
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
