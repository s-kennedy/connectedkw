import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY)

const getActivities = async (selectedTags) => {
  const records = await activitiesTable
    .select({ 
      filterByFormula: "{Status} = 'Published'",
      sort: [{ field: "Title", direction: "asc" }]
    })
    .all();

  const activities = records.map(r => ({ id: r.id, fields: r.fields }))

  return activities
}

const getActivity = async (id) => {
  const result = await activitiesTable.find(id)
  const activity = { id: result.id, fields: result.fields }
  return activity
}

const getEvents = async (featured=false) => {
  let { data: events, error } = await supabase
    .from('events')
    .select(`
      *,
      image(*),
      location(*),
      categories(*),
      tags(*)
    `)
    .eq('published', true)

    console.log({error})

  return events
}

const getEvent = async (id) => {
  let { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      image(*),
      location(*),
      categories(*),
      tags(*)
    `)
    .eq('id', id)
    .limit(1)
    .single()

  return event
}

const getMapFeatures = async (tableName) => {
  const table = base(tableName)
  const records = await table
    .select({ 
      filterByFormula: "{Status} = 'Published'",
      sort: [{ field: "Title", direction: "asc" }]
    })
    .all();

  const features = records.map(r => ({ 
    id: r.id, 
    ...r.fields 
  }))

  return features
}


export { getActivities, getActivity, getEvents, getEvent, getMapFeatures };
