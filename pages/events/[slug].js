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
    	<EventDisplay event={event} />
    </Layout>
  )
}


