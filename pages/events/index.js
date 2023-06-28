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
      <div className="container sm:py-8 lg:p-8 max-w-xs sm:max-w-screen-lg mx-auto">
        <EventsFeed events={events} />
      </div>
    </Layout>
  )
}


