import { verifyEmail } from "integrations/directus";

export default async (req, res) => {

  if (req.method === "GET") {
    try {
        const { token } = req.query
        const result = await verifyEmail(token)
        console.log({result})
        
        if (result.errors) {
            return res.redirect(307, '/register?verification=failed')
        }
      
        return res.redirect(307, '/login?verification=success')
    } catch (err) {
      console.log(err);
      return res.redirect(307, '/register?verification=failed')
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};