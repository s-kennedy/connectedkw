import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
);

const activitiesTable = base('Activities');
const eventsTable = base('Events');

const getActivities = async (selectedTags) => {
  const records = await activitiesTable
    .select({ 
      filterByFormula: "{Status} = 'Published'",
      sort: [{ field: "Title", direction: "asc" }]
    })
    .all();

  const activities = records.map(r => ({ id: r.id, ...r.fields }))

  return activities
}

const getActivity = async (id) => {
  const result = await activitiesTable.find(id)
  const activity = { id: result.id, fields: result.fields }
  return activity
}

const getEvents = async (featured=false) => {

  const published = "{Status} = 'Published'"
  const upcoming = "OR(IS_AFTER({End date}, NOW()), IS_AFTER({Start date}, NOW()))"
  const featuredTrue = "{Featured} = TRUE()"

  let formulae = [published, upcoming]

  if (featured) {
    formulae.push(featuredTrue)
  }

  const fullFormula = formulae.join(',')
  const formulaString = `AND(${fullFormula})`

  const records = await eventsTable
    .select({
      filterByFormula: formulaString,
      sort: [{ field: "Start date", direction: "asc" }] })
    .all();

  const events = records.map(r => ({ id: r.id, fields: r.fields }))

  return events
}

const getEvent = async (id) => {
  const result = await eventsTable.find(id)
  const event = { id: result.id, fields: result.fields }
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
