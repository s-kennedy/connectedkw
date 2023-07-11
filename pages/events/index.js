import Layout from 'components/Layout'
import EventsFeed from 'components/EventsFeed'
import { getEvents } from 'integrations/airtable';


export async function getServerSideProps() {
  const events = await getEvents()

  let eventCategories = []
  let eventTags = []
  events.forEach(event => {
    eventCategories = eventCategories.concat(event.fields.Category)
    eventTags = eventTags.concat(event.fields.Tags)
  })
  const categories = [...new Set(eventCategories)];
  const tags = [...new Set(eventTags)];
  return {
    props: { events, categories, tags },
  }
}

export default function Events({ events, categories, tags }) {
  console.log({tags})
  return (
    <Layout title="Family-friendly events in Kitchener-Waterloo" description="Here you'll find things to do for families, children, and your inner child." color="blue">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto pb-12">
        <EventsFeed events={events} categories={categories} tags={tags} />
      </div>
    </Layout>
  )
}


