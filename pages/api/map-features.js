import { getMapFeatures } from 'integrations/airtable';
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
  origin: "https://www.unboringkw.com"
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
  const { map } = req.query
  const decoded = decodeURIComponent(map)

  try {
    const features = await getMapFeatures(decoded)
    console.log({features})
    res.statusCode = 200;
    return res.json({ features })

  } catch (err) {
    console.log(err)
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong', error: err });
  }
};
