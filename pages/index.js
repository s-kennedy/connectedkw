import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import IdeaGenerator from '../components/IdeaGenerator'
import Section from '../components/Section'
import Sparkle from '../components/Sparkle'
import MailchimpSubscriptionForm from '../components/MailchimpSubscriptionForm'
import ImageCollage from '../components/ImageCollage'

export default function Home() {
  return (
    <div className="page-container">
      <Head>
        <title>Unboring KW</title>
        <meta name="description" content="Things to see and do in Kitchener Waterloo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full bg-white border-bottom border-b-3 border-black">
        <navbar>
          <nav>
            <a href="/" className="flex flex-auto justify-center items-center hover:text-black">
              <Image src="/unboring-kw-logo.svg" alt="Unboring KW logo" width={80} height={80} />
              <div className="title ml-1">unboring <span className="font-medium">kw</span></div>
            </a>
          </nav>
        </navbar>
      </div>

      <main className={styles.main}>
        <Section className={`${styles.rouletteBg} bg-blue-shape py-16`}>
          <div className="flex items-start flex-col md:flex-row">
            <div className="basis-1/2 md:p-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-body font-bold mb-6">
                Activity Roulette
              </h1>
            </div>
            <div className="basis-1/2 max-h-screen md:p-5 flex flex-col">
              <div data-aos="fade-up">
                <IdeaGenerator />
              </div>
            </div>
          </div>
        </Section>

        <Section className="">
          <div className="flex items-start flex-col md:flex-row">
            <div className="basis-1/2 md:p-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-body font-bold mb-6">Coming Soon</h1>
              <p className="text-xl mb-6">Unboring KW is just getting started! We're here to make it easier to find fun things to do in Kitchener Waterloo. We have some big plans for this website:</p>

              <div className="bg-white p-5 border-3 rounded-xl border-black mb-6" data-aos="fade-up">
                <h3 className="text-2xl mb-4">📆 Events calendar</h3>
                <ul className="list-disc ml-6">
                  <li>Instead of finding events across social media, browse them all in once place</li>
                  <li>Get reminders about the events you're interested in</li>
                </ul>
              </div>

              <div className="bg-white p-5 border-3 rounded-xl border-black mb-6" data-aos="fade-up">
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

              <div className="bg-white p-5 border-3 rounded-xl border-black mb-6" data-aos="fade-up">
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
            <div className="basis-1/2 w-full flex justify-center">
              <ImageCollage
                src={"/ion-illustrated.png"}
                color1="var(--theme-yellow)"
                color2="var(--theme-blue)"
              />
            </div>
          </div>
        </Section>

        <Section className="bg-red-shape ">

          <div className="flex items-start flex-col md:flex-row">
            <div className="basis-1/2 md:p-5">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-body font-bold mb-6">Get Connected</h1>
            </div>
            <div className="basis-1/2 w-full max-h-screen md:p-5 flex flex-col mb-6" data-aos="fade-up">
              <MailchimpSubscriptionForm />
            </div>
          </div>
        </Section>

      </main>

      <div className="w-full">

      <footer className={`w-full relative`}>
        <div className="container px-4 py-8 lg:p-8 max-w-screen-lg mx-auto">
          <div className="w-full">
            <Image className="w-full" src="/unboring-outline.svg" alt="unboring kw logo" width="600" height="200" />
          </div>
          <div className="w-full flex text-white space-x-8">
            <a
              href="mailto:hi@unboringkw.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="40" width="40">
                <path
                  d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                  fill="var(--theme-white)"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com/unboringkw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="40" width="40">
                <path
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  fill="var(--theme-white)"
                />
              </svg>
            </a>

            <a
              href="https://instagram.com/unboringkw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="40" width="40">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  fill="var(--theme-white)"
                />
              </svg>
            </a>
          </div>
        </div>
        <Image className="absolute inset-0" src="/via-tracks.png" width="1500" height="844" />
      </footer>
      </div>
    </div>
  )
}
