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
      startDateTime,
      endDateTime,
      linkText: "City of Waterloo event page",
      sourceDatabaseId: 3 // id in supabase
  };
}

export async function pageFunctionCityCambridge(context) {
  const $ = context.jQuery;
  const pageTitle = $('title').first().text();
  
  // Print some information to actor log
  context.log.info(`URL: ${context.request.url}, TITLE: ${pageTitle}`);

  if (!context.request.url.startsWith("https://calendar.cambridge.ca/default/Detail/")) {
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
  const startTime = `${dateParts[4]} ${dateParts[5].toUpperCase()}`
  const endTime = `${dateParts[7]} ${dateParts[8].toUpperCase()}`
  
  const date = `${year}-${zeroPaddedMonth}-${zeroPaddedDay}`
  const startDateObj = new Date(`${date} ${startTime}`)
  const endDateObj = new Date(`${date} ${endTime}`)
  const startDateTime = startDateObj.toISOString()
  const endDateTime = endDateObj.toISOString()

  const title = $('#pageHeading h1').first().text().replace(/\t|\n/g, '')
  $('h2:contains(Event Details:)').parent().attr('id', 'description-section');
  $('#description-section').find('h2.sectionHeader').remove()
  const description = $('#description-section').html().replace(/\t|\n/g, '')
  const locationWithMaps = $('h2:contains(Address:)').siblings().text().replace(/\t|\n/g, '')
  const location = locationWithMaps.split('View on Google Maps')[0].replace(/\t|\n/g, '')
  const price = $('.calendar-details-header:contains(Fee)').next().text().replace(/\t|\n/g, '')

  // Return an object with the data extracted from the page.
  // It will be stored to the resulting dataset.
  return {
      url: context.request.url,
      title,
      description,
      location,
      price,
      startDateTime,
      endDateTime,
      linkText: "City of Cambridge event page",
      sourceDatabaseId: 8 // id in supabase
  };
}

export async function pageFunctionMuseums(context) {
  const $ = context.jQuery;
  const pageTitle = $('title').first().text();
  
  // Print some information to actor log
  context.log.info(`URL: ${context.request.url}, TITLE: ${pageTitle}`);

  if (!context.request.url.startsWith("https://calendar.waterlooregionmuseum.ca/Default/Detail/")) {
      return null
  }

  var months = ["January","February","March","April","May","June","July",
          "August","September","October","November","December"];

  const dateText = $('.dateTime p').first().text().replace(/\t|\n/g, '')
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
  $('h3:contains(Details:)').parent().attr('id', 'description-section');
  $('#description-section').find('h3.sectionHeader').remove()
  const description = $('#description-section').html().replace(/\t|\n/g, '')
  const locationWithMaps = $('h3:contains(Address:)').siblings().text().replace(/\t|\n/g, '')
  const location = locationWithMaps.split('View on Google Maps')[0].replace(/\t|\n/g, '')

  const imagePath = $(".contentRight img").first().attr("src")
  const imageUrl = imagePath ? `https://calendar.waterlooregionmuseum.ca${imagePath}` : null;
  
  // Return an object with the data extracted from the page.
  // It will be stored to the resulting dataset.
  return {
      url: context.request.url,
      title,
      description,
      location,
      startDateTime,
      endDateTime,
      linkText: "Region of Waterloo Museums",
      sourceDatabaseId: 10, // id in supabase
      imageUrl
  };
}

export async function pageFunctionEventbrite(context) {
  const $ = context.jQuery;
  const title = $('h1.event-title').first().text();

  if (!title) {
      return null
  }

  const description = document.querySelector('.event-details__main-inner .eds-text--left')?.innerHTML.replace(/\t|\n/g, '')
  const startDateTime = document.querySelector('meta[property="event:starts_at"]')?.content
  const endDateTime = document.querySelector('meta[property="event:end_time"]')?.content
  const locationTitle = document.querySelector('.location-info__address-text')?.textContent
  const locationAddress = document.querySelector('meta[name="twitter:data1"]')?.getAttribute('value')
  const location = [locationTitle, locationAddress].join(", ")
  let price = document.querySelector('.ticket-card-compact-size__price')?.textContent
  if (!price) {
      price = document.querySelector('.conversion-bar__panel-info')?.textContent
  }
  const imageUrl = document.querySelector('meta[property="og:image"]')?.content

  // Print some information to actor log
  context.log.info(`URL: ${context.request.url}, TITLE: ${pageTitle}`);

  return {
      url: context.request.url,
      title,
      description,
      location,
      startDateTime,
      endDateTime,
      price,
      linkText: "Eventbrite",
      sourceDatabaseId: 9, // id in supabase
      imageUrl
  };
}

export const saveEventsToDatabase = async(datasetItems) => {

  const created = []
  const failed = []

  const events = datasetItems.filter(item => !!item.url && !!item.title)

  const promises = events.map(async(event) => {
    try {
      const description = event.description ? markdown.translate(event.description) : ""
      const image = await importImage(event.imageUrl, event.title)
      const locationText = event.location.trim()

      const eventData = {
        title: event.title.trim(),
        description: description.trim(),
        starts_at: event.startDateTime,
        ends_at: event.endDateTime,
        location_source_text: locationText,
        external_link: event.url,
        link_text: event.linkText,
        price: event.price.trim(),
        data_source: event.sourceDatabaseId,
        image: image?.id,
        image_url: event.imageUrl
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
    const oneMonthFromToday = DateTime.now().setZone("America/Toronto").plus({ months: 1 })
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
    const oneMonthFromToday = DateTime.now().setZone("America/Toronto").plus({ months: 1 })
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
  } else if (source === "cambridge") {
    const today = DateTime.now().setZone("America/Toronto")
    const queryStartDate = `${today.month}/${today.day}/${today.year}`
    const oneMonthFromToday = DateTime.now().setZone("America/Toronto").plus({ months: 1 })
    const queryEndDate = `${oneMonthFromToday.month}/${oneMonthFromToday.day}/${oneMonthFromToday.year}`
    
    return {
      ...defaultActorInput,
      "linkSelector": ".calendar-list-container .calendar-list-list .calendar-list-info a",
      "startUrls": [
          {
              "url": `https://calendar.cambridge.ca/default/_List?StartDate=${queryStartDate}&EndDate=${queryEndDate}&limit=100&Events%20Calendar=Centre+for+the+Arts+Events%7cCambridge+Farmers+Market%7cCommunity+Submitted+Events%7cFestivals+and+Events`
          }
      ],
      "pageFunction": pageFunctionCityCambridge
    }
  } else if (source === "museums") {
    const today = DateTime.now().setZone("America/Toronto")
    const queryStartDate = `${today.month}/${today.day}/${today.year}`
    const oneMonthFromToday = DateTime.now().setZone("America/Toronto").plus({ months: 1 })
    const queryEndDate = `${oneMonthFromToday.month}/${oneMonthFromToday.day}/${oneMonthFromToday.year}`
    
    return {
      ...defaultActorInput,
      "linkSelector": ".calendar-list-container .calendar-list-list .calendar-list-info a",
      "startUrls": [
          {
              "url": `https://calendar.waterlooregionmuseum.ca/Default/_List?limit=100&StartDate=${queryStartDate}&EndDate=${queryEndDate}`
          }
      ],
      "pageFunction": pageFunctionMuseums
    }
  } else if (source === "eventbrite") {
    return {
      ...defaultActorInput,
      "linkSelector": ".discover-search-desktop-card a.event-card-link",
      "globs": [
          {
              "glob": "https://www.eventbrite.com/e/*"
          },
          {
              "glob": "https://www.eventbrite.ca/e/*"
          }
      ],
      "startUrls": [
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/kids/"
        },
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/family/"
        },
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/community/"
        },
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/kids/?page=2"
        },
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/kids/?page=3"
        },
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/family/?page=2"
        },
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/family/?page=3"
        },
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/community/?page=2"
        },
        {
            "url": "https://www.eventbrite.ca/d/canada--waterloo--10327/community/?page=3"
        },
      ],
      "pageFunction": pageFunctionEventbrite
    }
  }
}

