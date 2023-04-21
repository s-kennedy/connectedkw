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
    "Park with amenities": { color: "#ef476f" }, //red 
    "Community centre": { color: "#ffd166" }, // yellow
    "Wooded area": { color: "#06d6a0" }, //green
  }

  const previewConfig = {
    title: 'Title', 
    details: []
  }

  return (
    <Layout 
      title="Parks, playgrounds, and community centres in Waterloo Region" 
      description="Explore the parks in Kitchener, Waterloo and Cambridge!"
      color="green" 
      image="https://www.unboringkw.com/map-thumbnail.jpg"
    >
      <Section className="snap-center mt-12">
        <div className="mb-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4">
            Parks in Waterloo Region
          </h1>
          <p>{`Get outside and enjoy some of the public park spaces we have in our region!`}</p>
          <p>{`We pulled this information from the following sources:`}</p>
          <ul className="mb-2">
            <li><a href="https://www.waterloo.ca/en/things-to-do/parks-and-facilities.aspx">{`City of Waterloo Parks and Facilities`}</a></li>
          </ul>
          <p>{`Happy exploring!`}</p>
        </div>
        <div className="w-full">
          <InteractiveMapParks 
            features={features} 
            categories={categories}
            previewConfig={previewConfig}
          />
        </div>
      </Section>
    </Layout>
  )
}
