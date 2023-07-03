import Layout from 'components/Layout'
import EventsFeed from 'components/EventsFeed'
import { getEvents } from 'integrations/airtable';


export async function getServerSideProps() {
  const events = await getEvents()
  return {
    props: { events },
  }
}

export default function Events({ events }) {
  return (
    <Layout>
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto pb-12">
        <EventsFeed events={events} />
      </div>
    </Layout>
  )
}


