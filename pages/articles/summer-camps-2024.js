import Layout from 'components/Layout'
import EventsFeed from 'components/EventsFeed'
import { getTags } from 'integrations/directus';
import { useState, useEffect } from 'react'

export async function getServerSideProps() {
  const tags = await getTags('Events and activities')

  return {
    props: { tags },
  }
}

export default function SummerCamps({tags=[]}) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetch('/api/camps');
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

  const config = {
    labels: {
      date: 'Registration opens:',
      location: 'Location:',
      price: 'Cost:',
      categories: 'Registration:',
      tags: 'Tags:'
    },
    views: ['list', 'calendar', 'map']
  }

  const filters = [
    // {
    //   label: 'Tags',
    //   id: 'tags',
    //   type: 'select-multiple',
    //   options: tags,
    //   multipleSelect: true,
    //   attributeFn: (event) => event.tags.map(t => t.id)
    // },  
    {
      label: 'Open for registration ✅',
      id: 'availability',
      type: 'boolean',
      options: [],
      multipleSelect: false,
      attributeFn: (event) => {
        const startDateTime = new Date(`${event.start_date}T${event.start_time}`)
        const now = new Date()
        return startDateTime < now
      }
    },
  ]

  return (
    <Layout 
      title="Summer camps 2024" 
      description="Discover the summer camp options in KW" 
      color="yellow"
      image="https://www.unboringkw.com/articles/summer-camps-2024.jpg"
    >
      <div className="container py-5 mx-auto">
        <EventsFeed 
          title={"Summer Camps"}
          config={config} 
          events={events} 
          filters={filters} 
          loading={loading} 
        >
          <div className="py-3">
            <p>{`The Christmas lights may still be up, but it's already time to start thinking about summer camps 😑`}</p>
            <p>{`I'm putting together a big list of summer day camps in Waterloo Region! There are a LOT so I'll be adding them over the next few days.`}</p>
            <p>{`You can filter for the ones that have already opened for registration, browse the calendar view (to see registration dates), or use the map view to see the camp locations.`}</p>
            <p>{`If you have any feedback or suggestions feel free to me at hi@unboringkw.com.`}</p>
          </div>
        </EventsFeed>
      </div>
    </Layout>
  )
}


