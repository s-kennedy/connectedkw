import Section from 'components/Section'
import Layout from 'components/Layout'
import Link from 'next/link'

export default function EventsCalendar() {
  return (
    <Layout title="Events calendar" color="purple">
      <Section className="snap-center mt-12">
        <div className="bg-white rounded-xl border-black border-3 p-5 lg:p-10">
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4">
              Events Calendar
            </h1>
            <p><a href="https://airtable.com/shrxS10aCQxlJYcvQ/iCal?timeZone=America%2FToronto&userLocale=en">Sync to an external calendar (.ics)</a></p>
          </div>
          <div className="flex">
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/shrxS10aCQxlJYcvQ?backgroundColor=teal&viewControls=on"
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
