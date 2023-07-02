import InteractiveMap from 'components/InteractiveMap'
import Section from 'components/Section'
import Layout from 'components/Layout'
import { getMapFeatures } from 'integrations/airtable';

export async function getServerSideProps(context) {
  const features = await getMapFeatures('Public Art')
  return {
    props: { features },
  }
}

export default function PublicArtMap({ features }) {
  const categories = {
    "Mural": { color: "#ef476f" }, //red 
    "Sculpture": { color: "#ffd166" }, // yellow
    "Photography": { color: "#06d6a0" }, //green
    "New media": { color: "#d7d1d8" }, //light purple
    "Memorial": { color: "#118ab2" }, //blue
    "Other": { color: "#FFFFFF" }, // white
  }

  return (
    <Layout 
      title="Public Art in Waterloo Region" 
      description="Explore the public art in our region with this interactive map covering Kitchener, Waterloo, and Cambridge!"
      color="yellow" 
      image="https://www.unboringkw.com/map-thumbnail.jpg"
    >
      <Section className="snap-center mt-12 p-3">
        <div className="mb-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4">
            Public Art in Waterloo Region
          </h1>
          <p>{`Who knew our region has/is a massive outdoor art gallery with over 150 pieces??`}</p>
          <p>{`We've pulled together public art information from the following sources:`}</p>
          <ul className="mb-2">
            <li><a href="https://issuu.com/dtkownit/docs/field_guide_for_web">{`A Field Guide to DTK's Art Walk`}</a></li>
            <li><a href="https://uptownwaterloobia.com/art-walks/">{`Uptown Waterloo Art Walks`}</a></li>
            <li><a href="https://www.regionofwaterloo.ca/en/exploring-the-region/resources/Documents/public_art-where_in_the_region_current-access.pdf">{`Where to See Regional Public Art`}</a></li>
            <li><a href="https://www.kitchener.ca/en/arts-culture-and-events/public-art-collection.aspx">{`City of Kitchener Public Art Collection`}</a></li>
            <li><a href="https://www.cambridge.ca/en/parks-recreation-culture/resources/public-art-brochure---River-Walk.pdf">{`City of Cambridge River Walk`}</a></li>
            <li><a href="https://cambridgesculpturegarden.com/">{`Cambridge Sculpture Garden`}</a></li>
          </ul>
          <p>{`Happy exploring!`}</p>
        </div>
        <div className="w-full">
          <InteractiveMap 
            features={features} 
            categories={categories} 
          />
        </div>
      </Section>
    </Layout>
  )
}
