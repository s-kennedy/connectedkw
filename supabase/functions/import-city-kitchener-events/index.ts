// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import slugify from 'https://esm.sh/slugify@1.6.6'

const supabase = createClient(Deno.env.get("SUPABASE_URL"), Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"))
const endpoint = `https://api.apify.com/v2/actor-tasks/unboringkw~city-of-kitchener-events/runs/last/dataset/items?token=apify_api_HdIllAbdTTtBnGiFp43mp0wXn2ckSU2N1T2E`


const scrapeEvents = async () => {
  const response = await fetch(endpoint)

  if (response.status !== 200) {
    throw Error(`API call failed: ${response.status} ${response.statusText}`)
  } 

  const data = await response.json()
  const events = data.filter(item => !!item.url)

  const results = await saveToSupabase(events)

  return results
}

const saveToSupabase = async(events) => {

  const created = []
  const failed = []

  const promises = events.map(async(event) => {
    const locationData = {
      name: event.location
    }

    const { data: location, error: locationError } = await supabase
      .from('locations')
      .select('id')
      .eq('name', event.location)
      .limit(1)
      .maybeSingle()

    let locationId = location?.id

    if (!locationId) {
      const locationResult = await supabase
        .from('locations')
        .insert(locationData)
        .select()

      if (locationResult.status === 201 && locationResult.data) {
        console.log("CREATED LOCATION")
        console.log(locationResult)
        locationId = locationResult.data[0].id
      } else {
        console.log("ERROR INSERTING LOCATION")
        console.log(locationResult.error)
      } 
    }

    const slug = slugify(`${event.title}-${event.date}-${event.startTime}`, { lower: true, remove: /[*+~.()'"!:@]/g })

    const eventData = {
      title: event.title,
      description: event.description,
      start_date: event.date,
      end_date: event.date,
      start_time: event.startTime,
      end_time: event.endTime,
      location: locationId,
      external_link: event.url,
      link_text: 'Event page',
      price: event.price,
      slug: slug
    }

    const eventResult = await supabase
      .from('events')
      .insert(eventData)
      .select()

    if (eventResult.status === 201) {
      console.log("CREATED EVENT")
      console.log(eventResult.data)
      created.push(eventResult.data[0])
    } else  {
      console.log("ERROR CREATING EVENT")
      console.log(eventResult.error)
      failed.push(eventResult.error)
    }

  })

  await Promise.all(promises)

  return { created, failed }
}

Deno.serve(async (req) => {

  const result = await scrapeEvents()

  const data = {
    result,
    message: `Scraping City of Kitchener events: ${result?.created?.length} created, ${result?.failed?.length} failed`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})

