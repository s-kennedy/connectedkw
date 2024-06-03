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
    // jQuery is handy for finding DOM elements and extracting data from them.
    // To use it, make sure to enable the "Inject jQuery" option.
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
    const startTime24 = `${startHour24}:${startMinute}`
    const endTime24 = `${endHour24}:${endMinute}`

    const title = $('h1#pageHeadingH1').first().text().replace(/\t|\n/g, '')
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
        date,
        startTime: startTime24,
        endTime: endTime24
    };
  }
