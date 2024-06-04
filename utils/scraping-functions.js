import { DEFAULT_CATEGORY_ID } from './constants'
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

export const defaultActorInput = {
  "breakpointLocation": "NONE",
  "browserLog": false,
  "closeCookieModals": false,
  "debugLog": false,
  "downloadCss": true,
  "downloadMedia": true,
  "headless": false,
  "ignoreCorsAndCsp": false,
  "ignoreSslErrors": false,
  "injectJQuery": true,
  "keepUrlFragments": false,
  "linkSelector": "",
  "maxPagesPerCrawl": 300,
  "postNavigationHooks": "// We need to return array of (possibly async) functions here.\n// The functions accept a single argument: the \"crawlingContext\" object.\n[\n    async (crawlingContext) => {\n        // ...\n    },\n]",
  "preNavigationHooks": "// We need to return array of (possibly async) functions here.\n// The functions accept two arguments: the \"crawlingContext\" object\n// and \"gotoOptions\".\n[\n    async (crawlingContext, gotoOptions) => {\n        // ...\n    },\n]\n",
  "proxyConfiguration": {
      "useApifyProxy": true
  },
  "runMode": "PRODUCTION",
  "startUrls": [],
  "useChrome": false,
  "waitUntil": [
      "networkidle2"
  ],
  "initialCookies": [],
  "customData": {},
  "pageFunction": ""
}

export async function pageFunctionCityKitchener(context) {
  const $ = context.jQuery;
  const pageTitle = $('title').first().text();

  // Print some information to actor log
  context.log.info(`URL: ${context.request.url}, TITLE: ${pageTitle}`);

  if (!context.request.url.startsWith("https://calendar.kitchener.ca/default/Detail/")) {
      return null
  }

  var months = ["January","February","March","April","May","June","July",
          "August","September","October","November","December"];

  const dateText = $('.dateTime p.headerDate').first().text().replace(/\t|\n/g, '')
  const dateParts = dateText.split(' ')
  const monthName = dateParts[1]
  const monthIndex = months.indexOf(monthName)
  const zeroPaddedMonth = `0${monthIndex + 1}`.slice(-2)
  const day = dateParts[2].replace(',', '')
  const zeroPaddedDay = `0${day}`.slice(-2)
  const year = dateParts[3]
  const startTime = dateParts[4]
  const [startHour, startMinute] = startTime.split(':')
  const startHourInt = parseInt(startHour)
  const startHour24 = (dateParts[5] === "pm" &&  startHourInt < 12) ? (startHourInt + 12) : startHourInt
  const endTime = dateParts[7]
  const [endHour, endMinute] = endTime.split(':')
  const endHourInt = parseInt(endHour)
  const endHour24 = dateParts[8] === "pm" && endHourInt < 12? (endHourInt + 12) : endHourInt

  const date = `${year}-${zeroPaddedMonth}-${zeroPaddedDay}`
  const startDateTime = `${date}T${startHour24}:${startMinute}`
  const endDateTime = `${date}T${endHour24}:${endMinute}`

  const title = $('h1#pageHeadingH1').first().text().replace(/\t|\n/g, '')
  $('h2:contains(Event Details:)').parent().attr('id', 'description-section');
  $('#description-section').find('h2.sectionHeader').remove()
  const description = $('#description-section').html().replace(/\t|\n/g, '')
  const locationWithMaps = $('h2:contains(Address:)').siblings().text().replace(/\t|\n/g, '')
  const location = locationWithMaps.split('View on Google Maps')[0].replace(/\t|\n/g, '')
  const price = $('.calendar-details-header:contains(Fee)').next().text().replace(/\t|\n/g, '')

  return {
      url: context.request.url,
      title,
      description,
      location,
      price,
      startDateTime,
      endDateTime,
      all_day: false,
      linkText: "City of Kitchener event page",
      sourceDatabaseId: 2 // id in supabase
  };
}

export async function pageFunctionCityWaterloo(context) {
  const $ = context.jQuery;
  const pageTitle = $('title').first().text();
  
  // Print some information to actor log
  context.log.info(`URL: ${context.request.url}, TITLE: ${pageTitle}`);

  if (!context.request.url.startsWith("https://events.waterloo.ca/default/Detail")) {
      return null
  }

  var months = ["January","February","March","April","May","June","July",
          "August","September","October","November","December"];

  const dateText = $('.dateTime p.headerDate').first().text().replace(/\t|\n/g, '')
  const dateParts = dateText.split(' ')
  const monthName = dateParts[1]
  const monthIndex = months.indexOf(monthName)
  const zeroPaddedMonth = `0${monthIndex + 1}`.slice(-2)
  const day = dateParts[2].replace(',', '')
  const zeroPaddedDay = `0${day}`.slice(-2)
  const year = dateParts[3]
  const startTime = dateParts[4]
  const [startHour, startMinute] = startTime.split(':')
  const startHourInt = parseInt(startHour)
  const startHour24 = (dateParts[5] === "pm" &&  startHourInt < 12) ? (startHourInt + 12) : startHourInt
  const endTime = dateParts[7]
  const [endHour, endMinute] = endTime.split(':')
  const endHourInt = parseInt(endHour)
  const endHour24 = dateParts[8] === "pm" && endHourInt < 12? (endHourInt + 12) : endHourInt

  const date = `${year}-${zeroPaddedMonth}-${zeroPaddedDay}`
  const startDateTime = `${date}T${startHour24}:${startMinute}`
  const endDateTime = `${date}T${endHour24}:${endMinute}`

  const title = $('#pageHeading h1').first().text().replace(/\t|\n/g, '')
  $('h2:contains(Event Details:)').parent().attr('id', 'description-section');
  $('#description-section').find('h2.sectionHeader').remove()
  const description = $('#description-section').html().replace(/\t|\n/g, '')
  const locationWithMaps = $('h2:contains(Address:)').siblings().text().replace(/\t|\n/g, '')
  const location = locationWithMaps.split('View on Google Maps')[0].replace(/\t|\n/g, '')
  
  return {
      url: context.request.url,
      title,
      description,
      location,
      date,
      startDateTime,
      endDateTime,
      all_day: false,
      linkText: "City of Waterloo event page",
      sourceDatabaseId: 3 // id in supabase
  };
}

export const saveEventsToDatabase = async(events) => {

  const created = []
  const failed = []

  const promises = events.map(async(event) => {
    console.log(event)

    try {
      const description = markdown.translate(event.description)
      const image = await importImage(event.imageUrl, event.title)
      const locationText = event.location.trim()

      const eventData = {
        title: event.title,
        description: description,
        starts_at: event.startDateTime,
        ends_at: event.endDateTime,
        all_day: event.allDay,
        location_source_text: locationText,
        external_link: event.url,
        link_text: event.linkText,
        price: event.price,
        data_source: event.sourceDatabaseId,
        categories: [{ categories_id: DEFAULT_CATEGORY_ID }],
        image: image?.id
      }

      const locations = await directus.request(
        readItems('locations', {
          fields: ['id'],
          search: locationText,
          limit: 1
        })
      );

      if (locations && locations[0]) {
        eventData.location = locations[0].id
      }

      const result = await directus.request(
        createItem('events', eventData)
      )

      created.push(result)
      return result

    } catch (error) {
      console.log({error})
      failed.push({ ...event, ...error})
      return error
    }

  })

  const results = await Promise.all(promises)
  console.log(`Processed ${results.length} events`)

  return { created: created.length, failed: failed.length }
}

export const generateActorInput = (source) => {
  if (source === "kitchener") {
    const today = DateTime.now().setZone("America/Toronto")
    const queryStartDate = `${today.month}/${today.day}/${today.year}`
    const oneMonthFromToday = DateTime.now().setZone("America/Toronto").plus({ days: 1 })
    const queryEndDate = `${oneMonthFromToday.month}/${oneMonthFromToday.day}/${oneMonthFromToday.year}`
    
    return {
      ...defaultActorInput,
      "linkSelector": ".calendar-list-container .calendar-list-list .calendar-list-info a",
      "startUrls": [
          {
              "url": `https://calendar.kitchener.ca/default/_List?StartDate=${queryStartDate}&EndDate=${queryEndDate}&Public%20Events=City-Run%20Events&Public%20Events=Arts,%20Culture,%20Film%20and%20Music&Public%20Events=Free%20Community%20Events&Public%20Events=Children%20and%20Youth%20Friendly%20Events&Public%20Events=Downtown%20Events&Public%20Events=The%20Market&Public%20Events=Tech%20Events&limit=150`
          }
      ],
      "pageFunction": pageFunctionCityKitchener
    }
  } else if (source === "waterloo") {
    const today = DateTime.now().setZone("America/Toronto")
    const queryStartDate = `${today.month}/${today.day}/${today.year}`
    const oneMonthFromToday = DateTime.now().setZone("America/Toronto").plus({ days: 1 })
    const queryEndDate = `${oneMonthFromToday.month}/${oneMonthFromToday.day}/${oneMonthFromToday.year}`
    
    return {
      ...defaultActorInput,
      "linkSelector": ".calendar-list-container .calendar-list-list .calendar-list-info a",
      "startUrls": [
          {
              "url": `https://events.waterloo.ca/default/_List?limit=100&StartDate=${queryStartDate}&EndDate=${queryEndDate}`
          }
      ],
      "pageFunction": pageFunctionCityWaterloo
    }
  }
}

