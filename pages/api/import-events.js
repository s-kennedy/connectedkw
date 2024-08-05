import Cors from 'cors'
import { generateActorInput } from 'utils/scraping-functions'
import { importExploreWaterlooEvents } from 'utils/import-functions'
import { ApifyClient } from 'apify-client'
const apify = new ApifyClient({
    token: process.env.APIFY_TOKEN
});

// Initializing the cors middleware
const cors = Cors({
  methods: ['POST', 'HEAD'],
  origin: "*"
})

const checkAuthorization = (req, res, done) => {
  const bearerToken = req.headers["authorization"]

  if (!bearerToken) {
    return res.status(401).end("No Bearer Token")
  }

  const token = bearerToken.split(" ")[1];

  if (token && token === process.env.UNBORING_SECRET_KEY) {
    return done("Authorized")
  } else {
    return res.status(401).end("Unauthorized")
  }
}

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
  await runMiddleware(req, res, checkAuthorization)

  if (req.method === "POST") {
    try {
      const { source } = req.body

      if (!source) {
        return res.status(500).json({ message: "Provide a source" })
      }

      if (source === "explore-waterloo") {
        const result = await importExploreWaterlooEvents()
        console.log({result})
        return res.status(200).json(result)
      }

      const actorInput = generateActorInput(source)
      const run = await apify.actor("apify/web-scraper").start(actorInput);
      console.log({run})
      res.status(200).json(run)

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
};

