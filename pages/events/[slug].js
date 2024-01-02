import Layout from 'components/Layout'
import EventDisplay from "components/EventDisplay"
import { getEventBySlug } from 'integrations/directus'

export async function getServerSideProps({ params }) {
  const event = await getEventBySlug(params.slug)

  return {
    props: { event },
  }
}

export default function EventPage({ event }) {

  return (
    <Layout color="white md-blue" className="md:bg-lightBlue" title={event.title} description={event.description}>
      <div className="container py-5 sm:max-w-screen-lg mx-auto">
        <div className="h-full w-full bg-white relative sm:border-black sm:border-3 sm:rounded-xl sm:p-5">
        	<EventDisplay event={event} />
        </div>
      </div>
    </Layout>
  )
}


