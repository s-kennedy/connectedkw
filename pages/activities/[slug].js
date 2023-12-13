import Layout from 'components/Layout'
import EventDisplay from "components/EventDisplay"
import { getEventBySlug } from 'integrations/directus'
import ActivityDisplay from 'components/ActivityDisplay'

export async function getServerSideProps({ params }) {
  const event = await getEventBySlug(params.slug)

  return {
    props: { event },
  }
}

export default function EventPage({ event }) {
  return (
    <Layout color="white" title={event.title} description={event.description}>
      <ActivityDisplay activity={event} />
    </Layout>
  )
}


