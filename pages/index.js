import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import IdeaGenerator from '../components/IdeaGenerator'
import Section from '../components/Section'
import Sparkle from '../components/Sparkle'
import MailchimpSubscriptionForm from '../components/MailchimpSubscriptionForm'

export default function Home() {
  return (
    <div className="page-container">
      <Head>
        <title>Unboring KW</title>
        <meta name="description" content="Things to see and do in Kitchener Waterloo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <navbar>
        <nav>
          <a href="/" className="flex flex-auto justify-center items-center hover:text-black">
            <Image src="/unboring-kw-logo.svg" alt="Unboring KW logo" width={80} height={80} />
            <div className="title ml-1">unboring <span className="font-medium">kw</span></div>
          </a>
        </nav>
      </navbar>

      <main className={styles.main}>
        <Section className="bg-blue-shape">
          <div className="flex items-start flex-col md:flex-row">
            <div className="basis-1/2 md:p-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-body font-bold mb-6">Activity Roulette</h1>
            </div>
            <div className="basis-1/2 max-h-screen md:p-5 flex flex-col">
              <IdeaGenerator />
            </div>
          </div>
        </Section>

        <Section className="">
          <div className="flex items-start flex-col md:flex-row">
            <div className="basis-1/2 md:p-5">

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-body font-bold mb-6">Coming Soon</h1>
              <p className="text-xl mb-6">Unboring KW is just getting started! We're here to make it easier to find fun things to do in Kitchener Waterloo. We have some big plans for this website:</p>

              <div className="bg-white p-5 border-3 rounded-xl border-black mb-6">
                <h3 className="text-2xl mb-4">📆 Events calendar</h3>
                <ul className="list-disc ml-6">
                  <li>Instead of finding events across social media, browse them all in once place</li>
                  <li>Get reminders about the events you're interested in</li>
                </ul>
              </div>

              <div className="bg-white p-5 border-3 rounded-xl border-black mb-6 ">
                <h3 className="text-2xl mb-4">🗺 Community maps</h3>
                <p className="mb-4">All the interactive maps you never knew you needed, such as:</p>
                <ul className="list-disc ml-6">
                  <li>Coffee shops for studying/working</li>
                  <li>Public street art</li>
                  <li>Where to buy local/craft beer</li>
                  <li>Outdoor ice rinks</li>
                  <li>Tobogganing hills</li>
                  <li>Art galleries and studios</li>
                  <li>Dog-friendly indoor spaces</li>
                </ul>
              </div>

              <div className="bg-white p-5 border-3 rounded-xl border-black mb-6">
                <h3 className="text-2xl mb-4">🗺 Recommendations</h3>
                <p className="mb-4">Get ready for our curated (read: highly subjective) recommendations along the lines of:</p>
                <ul className="list-disc ml-6">
                  <li>Where to go for New Years Eve</li>
                  <li>Who has the best croissants in the city</li>
                  <li>Local farms worth visiting</li>
                  <li>Best places to go for date night</li>
                </ul>
              </div>
            </div>
            <div className="basis-1/2">
            </div>
          </div>
        </Section>

        <Section className="bg-red-shape">

          <div className="flex items-start flex-col md:flex-row">
            <div className="basis-1/2 md:p-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-body font-bold mb-6">Get Connected</h1>
            </div>
            <div className="basis-1/2 w-full max-h-screen md:p-5 flex flex-col mb-6">
              <MailchimpSubscriptionForm />
            </div>
          </div>
        </Section>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.nomadiclabs.ca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          From the 💻 of Nomadic Labs
        </a>
      </footer>
    </div>
  )
}
