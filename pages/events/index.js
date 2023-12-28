import Layout from 'components/Layout'
import EventsFeed from 'components/EventsFeed'
import { getCategories, getTags, getDataSources } from 'integrations/directus';
import { useState, useEffect } from 'react'

export async function getServerSideProps() {
  const categories = await getCategories('Age groups')
  const tags = await getTags('Events and activities')
  const dataSources = await getDataSources()

  return {
    props: { tags, categories, dataSources },
  }
}

export default function Events({ categories=[], tags=[], dataSources=[] }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetch('/api/events');
      const json = await data.json();
      setEvents(json);
      setLoading(false)
    }

    try {
      setLoading(true)
      fetchEvents()
    } catch(err) {
      setLoading(false)
      console.log(err)
    }
  }, [])

  const filters = [
    {
      label: 'Unboring picks ⭐',
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
      <div className="container mx-auto pb-12">
        <EventsFeed events={events} filters={filters} loading={loading} />
      </div>
    </Layout>
  )
}


