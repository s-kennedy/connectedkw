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
    <Layout color="white md-blue" title={event.title} description={event.description}>
      <div className="container sm:p-8 sm:max-w-screen-lg mx-auto">
        <div className="h-full w-full bg-white relative sm:border-black sm:border-3 sm:rounded-xl">
        	<EventDisplay event={event} />
        </div>
      </div>
    </Layout>
  )
}


