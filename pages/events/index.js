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
    <Layout title="Family-friendly events in Kitchener-Waterloo" description="Here you'll find things to do for families, children, and your inner child." color="red">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto pb-12">
        <EventsFeed events={events} />
      </div>
    </Layout>
  )
}


