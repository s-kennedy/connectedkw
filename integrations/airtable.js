import Airtable from 'airtable'

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
    process.env.AIRTABLE_BASE_ID
);

const ideasTable = base('Activity Ideas');

const getIdeas = async () => {
  const records = await ideasTable
    .select({ filterByFormula: "{status} = 'Published'" })
    .firstPage();

  const ideas = records.map(r => ({ id: r.id, fields: r.fields }))

  return ideas
}




export { ideasTable, getIdeas };