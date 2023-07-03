import Section from 'components/Section'
import Layout from 'components/Layout'
import Link from 'next/link'

export default function SubmitEvent() {
  return (
    <Layout title="Submit an event" color="white">
      <div className="container sm:p-8 sm:max-w-screen-lg mx-auto">
        <div className="min-h-screen sm:min-h-0 h-full w-full bg-white sm:mt-10 relative sm:border-black sm:border-3 sm:rounded-xl p-5">
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4">
              Submit an event
            </h1>
            <p>{`We would love to add your event to our calendar! Please fill out the form below to submit your event. We will review it before publishing.`}</p>
            <p>You may want to check the <Link href="/events">full list of events</Link> to make sure you&apos;re not duplicating one that is already in there.</p>
          </div>
          <div className="flex">
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/shrhKO3DQD1NNs5yQ?backgroundColor=teal"
              frameBorder="0"
              onmousewheel=""
              width="100%"
              height="533"
              style={{
                background: "transparent",
                border: "1px solid #ccc"
              }}
            />
          </div>
          <div className="my-6">
            <p>👈 <Link href="/events">Back to events</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
