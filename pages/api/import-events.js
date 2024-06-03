import Cors from 'cors'
import { ApifyClient } from 'apify-client'
import { DateTime } from 'luxon'
import { defaultActorInput, pageFunctionCityKitchener } from 'utils/scraping-functions'
const apify = new ApifyClient({
    token: process.env.APIFY_TOKEN
});

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'HEAD'],
  origin: "*"
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async (req, res) => {
  await runMiddleware(req, res, cors)

  // const { source } = JSON.parse(req.body);

  if (req.method === "POST") {
    try {
      const today = DateTime.now().setZone("America/Toronto")
      const queryStartDate = `${today.month}/${today.day}/${today.year}`
      const oneMonthFromToday = DateTime.now().setZone("America/Toronto").plus({ days: 1 })
      const queryEndDate = `${oneMonthFromToday.month}/${oneMonthFromToday.day}/${oneMonthFromToday.year}`
      
      const input = {
        ...defaultActorInput,
        "linkSelector": ".calendar-list-container .calendar-list-list .calendar-list-info a",
        "startUrls": [
            {
                "url": `https://calendar.kitchener.ca/default/_List?StartDate=${queryStartDate}&EndDate=${queryEndDate}&Public%20Events=City-Run%20Events&Public%20Events=Arts,%20Culture,%20Film%20and%20Music&Public%20Events=Free%20Community%20Events&Public%20Events=Children%20and%20Youth%20Friendly%20Events&Public%20Events=Downtown%20Events&Public%20Events=The%20Market&Public%20Events=Tech%20Events&limit=150`
            }
        ],
        "pageFunction": pageFunctionCityKitchener
      }

      const run = await apify.actor("apify/web-scraper").start(input);
      console.log({run})

      console.log('Results from dataset');
      console.log(`💾 Check your data here: https://console.apify.com/storage/datasets/${run.defaultDatasetId}`);
      // const { items } = await apify.dataset(run.defaultDatasetId).listItems();

      res.status(200).json({run})

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
