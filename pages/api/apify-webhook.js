import Cors from 'cors'
import { ApifyClient, DownloadItemsFormat } from 'apify-client';
import { DateTime } from 'luxon'

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


  if (req.method === "POST") {
    try {
      
      const data = req.body
      console.log({data})
      const datasetId = data.DatabaseClient.id
      const dataset = await apify.dataset(datasetId)
      const datasetItems = await dataset.listItems()
      console.log({datasetItems})

      // Respond to the webhook
      res.status(200).json({ message: 'Webhook received' });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
