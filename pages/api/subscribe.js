import ow from "ow";
import md5 from "blueimp-md5";

const MAILCHIMP_SERVER = 'getunboring'
const MAILCHIMP_LIST_ID = '0dec77fbe34db1b0cd94df181&amp;id=5922adb2bc&amp;f_id=002627e7f0'

function owWithMessage(val, message, validator) {
  try {
    ow(val, validator);
  } catch (error) {
    throw new Error(message);
  }
}

owWithMessage(
  process.env.MAILCHIMP_API_KEY,
  "MAILCHIMP_API_KEY environment variable is not set",
  ow.string.minLength(1)
);

const isEmail = ow.string.is((e) => /^.+@.+\..+$/.test(e));
const authorization =
  "Basic " +
  Buffer.from("randomstring:" + process.env.MAILCHIMP_API_KEY).toString(
    "base64"
  );

function addNewMember(email, firstName) {
  return fetch(`https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization,
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
      },
    }),
  });
}

function subscribeContact(email) {
  return fetch(
    `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${md5(
      email.toLowerCase()
    )}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: "subscribed",
      }),
      headers: {
        authorization,
      },
    }
  );
}

function checkContactStatus(email) {
  return fetch(
    `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${md5(
      email.toLowerCase()
    )}`,
    {
      headers: {
        authorization,
      },
    }
  );
}
export default async (req, res) => {
  const { firstName, email } = req.body;

  try {
    console.log("> Validating input", " name: ", firstName, " email:", email);
    owWithMessage(firstName, "the name is too long", ow.string.maxLength(120));
    owWithMessage(
      email,
      "The email is invalid. Please enter a valid email address.",
      isEmail
    );
  } catch (e) {
    console.log("> Validation failed", e.message);
    res.status(403).json({ message: e.message });
  }

  if (req.method === "POST") {
    try {
      const { status } = await (await checkContactStatus(email)).json();

      if (status === 404) {
        const message = await (await addNewMember(email, firstName)).json();

        if (message.status === 400) {
          message.status = 406;
          return res.status(406).json({ message });
        }

        if (message) {
          return res.status(200).json({ message });
        }
      } else if (status === "subscribed") {
        res.status(400).json({ message: "User already subscribed" });
      } else {
        const message = await (await subscribeContact(email)).json();
        if (message) {
          res.status(200).json({ message });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};