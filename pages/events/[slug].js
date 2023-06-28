import Layout from 'components/Layout'
import EventDisplay from "components/EventDisplay"
import { getEvent } from 'integrations/airtable'

export async function getServerSideProps({ params }) {
	const id = params.slug.split('__')[1]
  const event = await getEvent(id)

  return {
    props: { event: event },
  }
}

export default function EventPage({ event }) {
  return (
    <Layout>
    	<EventDisplay event={event} />
    </Layout>
  )
}


