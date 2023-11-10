import Layout from 'components/Layout'
import EventsFeed from 'components/EventsFeed'
import { getEvents, getEventCategories, getEventTags, getDataSources } from 'integrations/supabase';


export async function getServerSideProps() {
  const events = await getEvents({limit: 20})
  const categories = await getEventCategories(events)
  const tags = await getEventTags(events)
  const dataSources = await getDataSources()

  return {
    props: { events, tags, categories, dataSources },
  }
}

export default function Events({ events, categories=[], tags=[], dataSources=[] }) {
  return (
    <Layout title="Family-friendly events in Kitchener-Waterloo" description="Here you'll find things to do for families, children, and your inner child." color="blue">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto pb-12">
        <EventsFeed events={events} categories={categories} tags={tags} dataSources={dataSources} />
      </div>
    </Layout>
  )
}


