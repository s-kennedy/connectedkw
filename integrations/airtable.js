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

const getEvents = async (featured=false) => {

  const published = "{Status} = 'Published'"
  const upcoming = "IS_AFTER({End date}, NOW())"
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
    .firstPage();

  const events = records.map(r => ({ id: r.id, fields: r.fields }))

  return events
}


export { getIdeas, getEvents };