import Link from 'next/link'
import Section from 'components/Section'
import Layout from 'components/Layout'

export default function AllEvents() {
  return (
    <Layout title="All events" color="green">
      <Section className="snap-center mt-12">
        <div className="bg-white rounded-xl border-black border-3 p-5 lg:p-10">
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4">
              Events
            </h1>
            <p>This the full list of events that for the event calendar. Feel free to browse or search.</p>
            <p>Do you want to add your event? Please fill out this form to <Link href="/events/new">submit an event!</Link></p>
          </div>
          <div className="flex">
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/shrbZZ1RBY1cQO0Np?backgroundColor=teal&viewControls=on"
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
            <p>👈 <Link href="/">Back home</Link></p>
          </div>
        </div>
      </Section>
    </Layout>
  )
}
