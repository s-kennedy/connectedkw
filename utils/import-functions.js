
import { 
  createDirectus, 
  staticToken, 
  rest,
  createItem,
  readItems,
  importFile
} from '@directus/sdk';
import { NodeHtmlMarkdown } from 'node-html-markdown'
import { DateTime } from 'luxon'

const directus = createDirectus('https://cms.unboringkw.com').with(rest()).with(staticToken(process.env.DIRECTUS_TOKEN));
const markdown = new NodeHtmlMarkdown()
const EVENTS_ENDPOINT = "https://explorewaterloo.ca/wp-json/tribe/events/v1/events"
const tag_lookup = {
  "cycling": 21, 
  "arts-culture-heritage-live-performance": [1,6,9],
  "festivals": 10,
  "food-drink": 11,
  "outdoor-recreation": 21,
  "shopping": 20,
  "sports": 21,
}

const defaultLinkText = 'Explore Waterloo event page'
const data_source_id = 5

const importImage = async (url, title) => {
  if (!url) return null
  try {
    const image = await directus.request(
      importFile(url, {
        title: title
      })
    );
    return image
  } catch (err) {
    console.log(err)
    return null
  }    
}


export const importExploreWaterlooEvents = async (endpoint=EVENTS_ENDPOINT, eventsArray=[]) => {
  try {
    const response = await fetch(endpoint)

    console.log(`API response: ${response.status} ${response.statusText}`)

    if (response.status !== 200) {
      throw Error(`API call failed: ${response.status} ${response.statusText}`)
    } 

    const data = await response.json()
    const allEvents = eventsArray.concat(data.events)

    if (data.next_rest_url && allEvents.length <= 96) {
      return await importExploreWaterlooEvents(data.next_rest_url, allEvents)
    } else {
      const results = await saveToDatabase(allEvents)
      return results
    }
    const results = await saveToDatabase(allEvents)
    return results

  } catch (error) {
    console.log(error)
    return null
  }
}

const saveToDatabase = async(events) => {

  const created = []
  const failed = []

  const promises = events.map(async(event) => {
    try {
      const description = markdown.translate(event.description)
      const location_source_text = event.venue?.venue ? [event.venue.venue,event.venue.address].join(", ") : nul
      const title = event.title.replace(/&#(\d+);/g, (m, d) => String.fromCharCode(d))
      const image = await importImage(event.image?.url, title)
    
      const eventData = {
        title: title,
        description: description.replace(/&#(\d+);/g, (m, d) => String.fromCharCode(d)),
        starts_at: event.start_date,
        ends_at: event.end_date,
        external_link: event.website ? event.website : event.url,
        link_text: event.website ? "Event page" : defaultLinkText,
        data_source: data_source_id,
        location_source_text: location_source_text,
        image: image?.id,
        image_url: event.image?.url,
      }

      const locationSearch = event.venue?.address ? event.venue?.address : event.venue?.venue

      // if (locationSearch) {
      //   const locations = await directus.request(
      //     readItems('locations', {
      //       fields: ['id'],
      //       search: event.venue?.venue,
      //       limit: 1
      //     })
      //   );

      //   if (locations && locations[0]) {
      //     eventData.location = locations[0].id
      //   }
      // }

      const tagIds = event.categories.map(cat => {
        return tag_lookup[cat.slug]
      }).filter(i => i).flat()

      if (tagIds.length > 0) {
        eventData.tags = tagIds.map(t => ({ tags_id: t }))
      }

      // const result = await directus.request(
      //   createItem('events', eventData)
      // )

      // created.push(result)
      return eventData

    } catch (error) {
      console.log(error)
      failed.push({ ...event, error})
      return error
    }

  })

  const results = await Promise.all(promises)
  console.log(`Processed ${results.length} events`)

  return { created, failed }
}



