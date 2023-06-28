import Link from 'next/link'
import Section from 'components/Section'
import Layout from 'components/Layout'

export default function Activities() {
  return (
    <Layout title="All activity ideas" color="blue">
      <Section className="snap-center mt-12">
        <div className="bg-white rounded-xl border-black border-3 p-5 lg:p-10">
          <div className="mb-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4">
              Activities
            </h1>
            <p>This the full selection of activities that can show up in the Activity Roulette. Feel free to browse or search.</p>
            <p>We welcome activity suggestions, please fill out this form to <Link href="/activities/new">submit your idea!</Link></p>
          </div>
          <div className="flex">
            <iframe
              className="airtable-embed"
              src="https://airtable.com/embed/shrilfem0OpcCvx8F?backgroundColor=teal&viewControls=on"
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
