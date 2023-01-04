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

export default function TestMap({ features }) {
  const categories = {
    "Street art": { color: "#ef476f" },
    "Sculpture": { color: "#06d6a0" },
  }

  return (
    <Layout title="Public Art in Kitchener Waterloo" color="blue">
      <Section className="snap-center mt-12">
        <div className="mb-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4">
            Public Art in KW
          </h1>
        </div>
        <div className="bg-white rounded-xl border-black border-3 overflow-hidden h-visibleScreen w-full">
          <InteractiveMap features={features} categories={categories} />
        </div>
      </Section>
    </Layout>
  )
}
