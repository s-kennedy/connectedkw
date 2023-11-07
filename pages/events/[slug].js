import Layout from 'components/Layout'
import EventDisplay from "components/EventDisplay"
import { getEventBySlug } from 'integrations/supabase'

export async function getServerSideProps({ params }) {
  const event = await getEventBySlug(params.slug)

  return {
    props: { event: event },
  }
}

export default function EventPage({ event }) {
  return (
    <Layout color="blue" title={event.title} description={event.description}>
    	<EventDisplay event={event} />
    </Layout>
  )
}


