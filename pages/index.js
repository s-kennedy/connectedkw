import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

import Layout from 'components/Layout'
import Section from 'components/Section'
import GridCard from "components/GridCard"

import { getPagesByTemplate, getEvents } from 'integrations/directus';

export async function getServerSideProps({ params }) {
  const places = await getPagesByTemplate('map')
  const events = await getEvents(10)

  // const randomActivities = [...Array(10)].map((item, i) => {
  //   const randomIndex = Math.floor(Math.random()*activities.length);
  //   const randomActivity = activities[randomIndex]
  //   activities.splice(randomIndex,1)
  //   return randomActivity
  // })

  return {
    props: { places, events }
  }
}

export default function Home({ places, events }) {

  const mapPages = places.map(page => {
    return {
      ...page,
      image: page.main_image,
      classification: 'map'
    }
  })

  return (
    <Layout color="rainbow">
      <section className="bg-slate-100 py-12">
        <div className="container mx-auto">
          <div className="lg:grid grid-cols-2 gap-6">
            <div className="flex justify-center items-center">
              <div>
                <h1 className="text-4 mb-6 md:text-6xl font-title">
                  Connected KW
                </h1>
                <p className="text-lg">{`Connected KW is a volunteer-run project with the goal of creating an inclusive and comprehensive resource for families in KW.`}</p> 
                <p className="text-lg">Stay connected to what's happening in the community by subscribing to our <Link href="/events">events calendar</Link> and our <a href="https://instagram.com/connectedkw" target="_blank">Instagram account</a>.</p> 
                <p className="text-lg">{`You can support us by making a donation or get involved by creating an account and helping us to add events and info for other families!`}</p>
                <div className="flex gap-4">
                  <a href="https://patreon.com/connectedkw?utm_medium=unknown&utm_source=join_link&utm_campaign=creatorshare_creator&utm_content=copyLink" target="_blank" className="btn my-6">
                    <i className={`mr-2 fa-solid fa-gift`}></i>
                    Make a donation                
                  </a>
                  <a href="https://cms.connectedkw.com/admin/register" target="_blank" className="btn my-6">
                    <i className={`mr-2 fa-solid fa-circle-user`}></i>
                    Create an account                
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex max-h-[75vh] justify-center items-center relative p-12">
              <div className="absolute -bottom-12 lg:-bottom-[5%] left-0 lg:left-[15%] bg-[url(/highlights-01.svg)] bg-contain bg-no-repeat h-1/5 w-1/5" />
              <div className="absolute top-0 lg:-top-[5%] right-0 lg:right-[15%] bg-[url(/highlights-02.svg)] bg-contain bg-no-repeat h-1/5 w-1/5" />
              <video width="480" height="960" autoPlay loop muted className="object-contain h-full w-auto max-h-[inherit] mx-auto relative">
                <source src="/events-phone-mockup.webm" type="video/webm" />
                <source src="/events-phone-mockup.mp4" type="video/mp4" />
                <Image
                  className={`object-contain`}
                  src={`/events-phone-mockup.png`}
                  alt="event listings on a phone" 
                  height="480"
                  width="960"
                />
              </video>
            </div>
          </div>
        </div>
      </section>

      <section className={`w-full relative py-12`} data-aos="fade-up">
        <div className="container mx-auto">
          <h2 className="font-title text-3xl md:text-4xl mt-6 mb-6">
            Upcoming Events 🗓
          </h2>
          <div className="flex flex-nowrap space-x-6 overflow-auto styled-scrollbar snap-x snap-mandatory ">
            {events.map(event => <GridCard item={event} showImage key={event.slug} className="w-10/12 md:w-5/12 lg:w-3/12 flex-none snap-center snap-always md:snap-start" />)}
          </div>
          <div className="w-full mt-4">
            <Link href="/events" className="btn">
              All events
              <i className={`mr-2 fa-solid fa-arrow-right ml-2`}></i>
            </Link>
          </div>
        </div>
      </section>

      <section className={`w-full relative pb-12`} data-aos="fade-up">
        <div className="container mx-auto">
          <h2 className="font-title text-3xl md:text-4xl mb-6">
            Local Info 🐝
          </h2>
          <div className="flex flex-nowrap space-x-6 overflow-auto styled-scrollbar snap-x snap-mandatory ">
            {mapPages.map(map => <GridCard item={map} showImage showDescription key={map.slug} className="w-10/12 md:w-5/12 lg:w-3/12 flex-none snap-center snap-always md:snap-start" />)}
          </div>
          <div className="w-full mt-4">
            <Link href="/articles" className="btn">
              All articles
              <i className={`mr-2 fa-solid fa-arrow-right ml-2`}></i>
            </Link>
          </div>
        </div>
      </section>
    
    </Layout>
  )
}


