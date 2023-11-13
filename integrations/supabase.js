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

const getEvents = async (props) => {
  let { data: events, error } = await supabase
    .from('events')
    .select(`
      *,
      location(*),
      categories(*),
      tags(*),
      data_source
    `)
    .eq('published', true)
    // .limit(limit)
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .order('start_time', { ascending: true })

  if (error) {
    console.log({error})
  }

  return events?.length > 0 ? events : []
}

const getEventCategories = async (events) => {
  const eventIds = events.map(e => e.id)

  let { data: categories, error } = await supabase
    .from('categories')
    .select('*, events!inner(*)')
    .in('events.id', eventIds)
 
  if (error) {
    console.log({error})
  }

  return categories?.length > 0 ? categories : []
}

const getEventTags = async (events) => {
  const eventIds = events.map(e => e.id)

  let { data: tags, error } = await supabase
    .from('tags')
    .select('*, events!inner(*)')
    .in('events.id', eventIds)
 
  if (error) {
    console.log({error})
  }

  return tags?.length > 0 ? tags : []
}

const getDataSources = async () => {
  let { data: dataSources, error } = await supabase
    .from('data_sources')
    .select('*')
    .eq('published', true)
 
  if (error) {
    console.log({error})
  }

  return dataSources?.length > 0 ? dataSources : []
}

const getEvent = async (id) => {
  let { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      location(*),
      categories(*),
      tags(*)
    `)
    .eq('id', id)
    .limit(1)
    .single()

  if (error) {
    console.log({error})
  }

  return event
}

const getEventBySlug = async (slug) => {
  let { data: event, error } = await supabase
    .from('events')
    .select(`
      *,
      location(*),
      categories(*),
      tags(*)
    `)
    .eq('slug', slug)
    .limit(1)
    .single()

  if (error) {
    console.log({error})
  }

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


export { 
  getActivities,
  getActivity,
  getEvents,
  getEvent,
  getEventCategories,
  getEventTags,
  getEventBySlug,
  getMapFeatures, 
  getDataSources,
};
