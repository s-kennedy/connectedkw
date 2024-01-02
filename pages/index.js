import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"

import Layout from 'components/Layout'
import Section from 'components/Section'
import MailchimpSubscriptionForm from 'components/MailchimpSubscriptionForm'
import Blob from 'components/Blob'
import Marquee from 'components/Marquee'
import GridCard from "components/GridCard"

import { getPagesByTemplate, getActivities, getEvents } from 'integrations/directus';

export async function getStaticProps({ params }) {
  const places = await getPagesByTemplate('map')
  const activities = await getActivities(10)
  const events = await getEvents(10)

  return {
    props: { places, activities, events }
  }
}

export default function Home({ places, activities, events }) {

  const mapPages = places.map(page => {
    return {
      ...page,
      image: page.main_image,
      classification: 'map'
    }
  })

  return (
    <Layout color="rainbow">
      <section className={`relative`} id="landing">
        <div className="container p-3 mx-auto flex justify-center items-center">
          <div className={``}>
            <h1 className={`text-[27vw] md:text-[24vw] font-display mt-8 mb-6 text-center`}>
              <span className="text-black">unboring </span>
              <span className="text-red">kw</span>
            </h1>
            <div className="flex justify-center w-full relative">
              <p className="text-lg md:text-2xl mb-4 w-5/12 md:w-3/12">
                {`Family-friendly things to do and places to go in Kitchener-Waterloo`}
              </p>
              <Image src="/goose.png" height="200" width="200" className="mt-4 object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className={`w-full relative mb-6`} id="subscribe">
        <div className="container p-3 mx-auto">
          <h2 className="font-title text-4xl md:text-6xl mb-6">
            Upcoming events
          </h2>
          <div className="flex flex-nowrap space-x-4 overflow-auto styled-scrollbar snap-x snap-mandatory ">
            {events.map(event => <GridCard item={event} showImage key={event.slug} className="w-full md:w-3/12 flex-none snap-start snap-always " />)}
          </div>
        </div>
      </section>

      <section className={`w-full relative mb-6`} id="subscribe">
        <div className="container p-3 mx-auto">
          <h2 className="font-title  text-4xl md:text-6xl mb-6">
            Activity ideas
          </h2>
          <div className="flex flex-nowrap space-x-4 overflow-auto styled-scrollbar snap-x snap-mandatory ">
            {activities.map(activity => <GridCard item={activity} showImage key={activity.slug} className="w-full md:w-3/12 flex-none snap-start snap-always" />)}
          </div>
        </div>
      </section>

      <section className={`w-full relative mb-6`} id="subscribe">
        <div className="container p-3 mx-auto">
          <h2 className="font-title  text-4xl md:text-6xl mb-6">
            Interactive maps
          </h2>
          <div className="flex flex-nowrap space-x-4 overflow-auto styled-scrollbar snap-x snap-mandatory ">
            {mapPages.map(map => <GridCard item={map} showImage showDescription key={map.slug} className="w-full md:w-3/12 flex-none snap-start snap-always" />)}
          </div>
        </div>
      </section>
      
      <section className={`w-full relative`} id="subscribe">
        <div className="container p-3 lg:p-8 max-w-sm sm:max-w-screen-md lg:max-w-screen-lg mx-auto flex flex-col">
          <div className="flex items-center flex-col md:flex-row md:space-x-8">
            <MailchimpSubscriptionForm />
          </div>
        </div>
      </section>
    </Layout>
  )
}


