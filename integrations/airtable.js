import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
);

const ideasTable = base('Activity Ideas');
const eventsTable = base('Events');

const getIdeas = async (selectedTags) => {
  const records = await ideasTable
    .select({ filterByFormula: "{Status} = 'Published'" })
    .firstPage();

  const ideas = records.map(r => ({ id: r.id, fields: r.fields }))

  return ideas
}

const getEvents = async (selectedTags) => {
  const records = await eventsTable
    .select({ filterByFormula: "{Status} = 'Published'" })
    .firstPage();

  const events = records.map(r => ({ id: r.id, fields: r.fields }))

  return events
}



export { getIdeas, getEvents };