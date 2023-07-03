import Layout from 'components/Layout'
import Section from 'components/Section'
import Link from 'next/link'
import Image from 'next/image'

export default function Maps() {
  return (
    <Layout title="Maps" color="green">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto py-10">
        <div className="p-3 space-y-2">
          <Link href="/maps/splashpads" className={`btn relative snap-start transition-all p-3 items-start flex-col w-full bg-white border-3 rounded-xl border-black`}>
            <div className="flex flex-col space-y-6">
              <div className="w-full map flex flex-col sm:flex-row space-y-4 sm:space-x-4">
                <div className="image basis-1/3 overflow-hidden rounded-lg">
                  <Image src="/splashpads.gif" width={400} height={265} alt="Screenshot of map" className="object-cover h-full w-full" />
                </div>
                <div className="info basis-2/3">
                  <h3>Splashpads in Waterloo Region</h3>
                  <p className="uppercase text-sm mb-2 text-grey">May 30, 2023</p>
                  <p className="">
                    {`Get out the sunscreen and crocs - it's splashpad season!`}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/maps/playgrounds" className={`btn relative snap-start transition-all p-3 items-start flex-col w-full bg-white border-3 rounded-xl border-black`}>
            <div className="flex flex-col space-y-6">
              <div className="w-full map flex flex-col sm:flex-row space-y-4 sm:space-x-4">
                <div className="image basis-1/3 overflow-hidden rounded-lg">
                  <Image src="/playgrounds-map-thumbnail.webp" width={400} height={265} alt="Screenshot of map" className="object-cover h-full w-full" />
                </div>
                <div className="info basis-2/3">
                  <h3>Playgrounds in Kitchener-Waterloo</h3>
                  <p className="uppercase text-sm mb-2 text-grey">May 29, 2023</p>
                  <p className="">
                    {`Discover new places to play in KW with our playground map! You can filter by amenities (ie. splash pad, pickleball court, skate park, etc.) or by my completely subjective rankings.`}
                  </p>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/maps/public-art" className={`btn relative snap-start transition-all p-3 items-start flex-col w-full bg-white border-3 rounded-xl border-black`}>
            <div className="flex flex-col space-y-6">
              <div className="w-full map flex flex-col sm:flex-row space-y-4 sm:space-x-4">
                <div className="image basis-1/3 overflow-hidden rounded-lg">
                  <Image src="/map-thumbnail.jpg" width={400} height={265} alt="Screenshot of map" className="object-cover h-full w-full" />
                </div>
                <div className="info basis-2/3">
                  <h3>Public Art in Waterloo Region</h3>
                  <p className="uppercase text-sm mb-2 text-grey">January 11, 2023</p>
                  <p className="">
                    {`Who knew our region has/is a massive outdoor art gallery with over 150 pieces?? This map includes public art from Kitchener, Waterloo, Cambridge, and the Region of Waterloo, all in one interactive map. Happy exploring!`}
                  </p>
                </div>
              </div>
            </div>
          </Link>

        </div>
      </div>
    </Layout>
  )
}


