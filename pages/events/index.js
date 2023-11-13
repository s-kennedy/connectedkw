import Layout from 'components/Layout'
import EventsFeed from 'components/EventsFeed'
import { getEvents, getEventCategories, getEventTags, getDataSources } from 'integrations/supabase';

export async function getStaticProps() {
  const events = await getEvents()
  const categories = await getEventCategories(events)
  const tags = await getEventTags(events)
  const dataSources = await getDataSources()

  return {
    props: { events, tags, categories, dataSources },
  }
}

export default function Events({ events=[], categories=[], tags=[], dataSources=[] }) {
  const filters = [
    {
      label: 'Featured',
      id: 'featured',
      type: 'boolean',
      default: false,
      attributeFn: (event) => event.featured
    },
    {
      label: 'Categories',
      id: 'categories',
      type: 'select-multiple',
      options: categories,
      multipleSelect: true,
      attributeFn: (event) => event.categories.map(c => c.id)
    },
    {
      label: 'Tags',
      id: 'tags',
      type: 'select-multiple',
      options: tags,
      multipleSelect: true,
      attributeFn: (event) => event.tags.map(t => t.id)
    },  
    {
      label: 'Sources',
      id: 'sources',
      type: 'select-multiple',
      options: dataSources,
      multipleSelect: true,
      attributeFn: (event) => [event.data_source]
    },
  ]
  return (
    <Layout title="Family-friendly events in Kitchener-Waterloo" description="Here you'll find things to do for families, children, and your inner child." color="blue">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto pb-12">
        <EventsFeed events={events} categories={categories} tags={tags} dataSources={dataSources} filters={filters} />
      </div>
    </Layout>
  )
}


