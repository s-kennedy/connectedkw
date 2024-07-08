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
        const startDateTime = new Date(`${event.starts_at}`)
        const now = new Date()
        return startDateTime < now
      }
    },
  ]

  return (
    <Layout 
      title="Summer camps 2024" 
      description="Discover the summer camp options in KW" 
      color="blue"
      image="https://www.connectedkw.com/articles/summer-camps-2024.jpg"
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
            <p>{`There are a few ways to use this directory:`}</p>
            <p><span className="font-semibold mr-1">👉 List view:</span>{`Browse through the different camps and click on the card to see the full description`}</p>
            <p><span className="font-semibold mr-1">👉 Calendar view:</span>{`The calendar shows the dates when registration opens, so you can add the ones you're interested in to your personal calendar and get reminders.`}</p>
            <p><span className="font-semibold mr-1">👉 Map view:</span>{`See which camps are close to you or easy to access.`}</p>
            <p>{`If you have any feedback or suggestions feel free to me at shay@connectedkw.com.`}</p>
          </div>
        </EventsFeed>
      </div>
    </Layout>
  )
}


