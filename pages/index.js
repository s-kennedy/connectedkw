import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"

import IdeaGenerator from '../components/IdeaGenerator'
import WeatherWidget from '../components/WeatherWidget'
import Section from '../components/Section'
import Sparkle from '../components/Sparkle'
import MailchimpSubscriptionForm from '../components/MailchimpSubscriptionForm'
import ImageCollage from '../components/ImageCollage'
import Blob from '../components/Blob'
import Marquee from '../components/Marquee'

export default function Home() {
  return (
    <div className="flex flex-auto flex-col justify-stretch items-stretch min-h-screen w-full">
      <Head>
        <title>Unboring KW</title>
        <meta name="description" content="Things to see and do in Kitchener Waterloo" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="image" content="https://www.unboringkw.com/share-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Unboring KW" />
        <meta name="twitter:url" content="https://www.unboringkw.com" />
        <meta name="twitter:description" content="Things to see and do in Kitchener Waterloo" />
        <meta name="twitter:image" content="https://www.unboringkw.com/share-image.jpg" />
        <meta name="twitter:creator" content="@unboringkw" />
      </Head>

      <div className={`w-full fixed z-40 border-b-3 border-black py-2 px-4 ${styles.navbar}`}>
        <navbar className="flex justify-between">
          <nav className="flex-auto">
            <a href="/" className="logo flex justify-start items-center hover:text-black space-x-4 transition-all hover:text-red hover:no-underline">
              <Image src="/unboring-kw-logo.svg" alt="Unboring KW logo" width={30} height={30} />
              <div className="text-2xl">unboring <span className="font-medium">kw</span></div>
            </a>
          </nav>

          <div className="flex text-white space-x-4 items-center">
            <a
              href="mailto:hi@unboringkw.com"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="20" width="20">
                <path
                  d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                  fill="var(--theme-black)"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com/unboringkw"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="20" width="20">
                <path
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                  fill="var(--theme-black)"
                />
              </svg>
            </a>

            <a
              href="https://instagram.com/unboringkw"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="20" width="20">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                  fill="var(--theme-black)"
                />
              </svg>
            </a>
          </div>
        </navbar>
      </div>

      <main className={`flex-auto snap-y`}>

        <MouseParallaxContainer
          globalFactorX={0.2}
          globalFactorY={0.2}
        >

          <section className={`${styles.landingSection} w-screen sm:h-screen relative`} id="landing">

            <div className="container px-4 py-8 lg:p-8 max-w-sm sm:max-w-screen-md lg:max-w-screen-lg mx-auto flex flex-col sm:flex-row h-full">
              <div className="basis-1/2">
                <MouseParallaxChild factorX={0.3} factorY={0.2} inverted>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-8 sm:mb-16 -rotate-6">
                    Hi KW 👋
                  </h1>
                </MouseParallaxChild>

                <p className="text-2xl mb-4">We're here to make it easier to find things to do in Kitchener-Waterloo.</p>
                <p className="text-2xl mb-6">Let's have some fun!</p>
                <div data-aos="zoom-in-right" data-aos-delay="500">
                  <a
                    href="#activity-roulette"
                    className="transition-all btn btn-green">
                    👉 Give me something to do 👈
                  </a>
                </div>
              </div>

              <div className="basis-1/2 relative max-w-md md:mx-auto flex-auto min-h-0 place-self-start md:place-self-end md:mb-12 mt-20">

                <MouseParallaxChild factorX={0.1} factorY={0.1}>
                  <div className={`object-cover`}>
                    <Image
                      src="/via-tracks-shape.png"
                      alt="Via rail train tracks"
                      width="800"
                      height="500"
                    />
                  </div>
                </MouseParallaxChild>

                <MouseParallaxChild factorX={0.1} factorY={0.2}>
                  <Image src="/blob-green.svg" width="280" height="280" className="absolute bottom-0 right-0" />
                </MouseParallaxChild>

                <MouseParallaxChild factorX={0.3} factorY={0.4}>
                  <Image src={"/biking-girl.png"} width="320" height="320" className="absolute bottom-8 right-0" />
                </MouseParallaxChild>
              </div>

            </div>


            <Marquee />


          </section>

        </MouseParallaxContainer>

        <MouseParallaxContainer
          globalFactorX={0.2}
          globalFactorY={0.2}
        >
          <section id="activity-roulette" className={`w-screen lg:h-screen relative flex flex-col lg:flex-row justify-center items-start sm:items-center snap-center p-5`} id="activity-roulette">
            <div className="container mx-auto relative">


              <div className="flex items-start justify-center sm:items-center flex-col sm:flex-row my-6 sm:my-12 min-h-0 relative">
                <div className="absolute w-full h-full flex justify-center items-center">
                  <div className="max-w-xs mx-auto sm:max-w-md w-full max-sm:scale-x-125">
                    <MouseParallaxChild factorX={0.3} factorY={0.3} className="h-auto w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 886.35 774.85"
                        preserveAspectRatio="none"
                        className="rotate-180"
                      >
                        <path
                          d="M568.25,741.2C691.41,691.92,901.4,553.86,893.94,366.09,885.61,156.2,609-30,380.15,18.78c-275.69,58.77-444.76,450.6-342,636.34C124,810.25,393.55,811.1,568.25,741.2Z"
                          transform="translate(-7.78 -10.93)"
                          fill="var(--theme-yellow)"
                        />
                      </svg>
                    </MouseParallaxChild>
                  </div>
                </div>

                <div className={`max-w-xs mx-auto max-h-screen flex-auto w-full flex flex-col ${styles.ideaGeneratorContainer}`} data-aos="fade-up">
                  <IdeaGenerator />
                </div>
              </div>
            </div>

          <div className="p-4 lg:absolute bottom-8 right-0 max-sm:my-8 mx-auto" data-aos="zoom-in-left" data-aos-delay="1000">
            <WeatherWidget />
          </div>

          </section>
        </MouseParallaxContainer>


        <Section className="snap-center" id="coming-soon">
          <MouseParallaxContainer
            globalFactorX={0.3}
            globalFactorY={0.3}
            containerStyle={{overflow: "visible"}}
          >
            <div className="bg-white rounded-xl border-black border-3 p-5 lg:p-10">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-8 sm:mb-16 -rotate-6">
                Coming Soon
              </h2>
              <div className="flex items-start flex-col md:flex-row md:space-x-8">
                <div className="basis-1/2">
                  <p className="text-lg md:text-xl mb-4 sm:mb-6">Unboring KW is just getting started! We're here to make it easier to find fun things to do in Kitchener Waterloo. We have some big plans:</p>
                  <ul className="text-lg md:text-xl">
                      <li className="mb-2 sm:mb-4" data-aos="fade-up">📆&nbsp;&nbsp;Events calendar</li>
                      <li className="mb-2 sm:mb-4" data-aos="fade-up">🗺&nbsp;&nbsp;Community maps</li>
                      <li className="mb-2 sm:mb-4" data-aos="fade-up">️⭐&nbsp;&nbsp;Recommendations</li>
                      <li className="mb-2 sm:mb-4" data-aos="fade-up">✌&nbsp;&nbsp;Community engagement</li>
                    </ul>
                </div>
                <div className="basis-1/2 w-full">
                  <div className={`relative`}>

                      <MouseParallaxChild factorX={0.1} factorY={0.1}>
                        <Blob fill="var(--theme-red)" className="inline-block w-10/12 ml-6" />
                      </MouseParallaxChild>

                      <MouseParallaxChild factorX={0.1} factorY={0.2}>
                        <Blob fill="var(--theme-yellow)" className="absolute w-3/4 h-auto bottom-0 left-8 rotate-45" />
                      </MouseParallaxChild>

                      <MouseParallaxChild factorX={0.3} factorY={0.4}>
                        <Image
                          src="/ion-illustrated.png"
                          alt=""
                          width="400"
                          height="300"
                          className="absolute w-full h-auto bottom-6"
                        />
                      </MouseParallaxChild>

                    </div>
                  </div>
                </div>
            </div>
          </MouseParallaxContainer>
        </Section>

        <Section className="snap-center" id="get-connected">
          <MouseParallaxContainer
            globalFactorX={0.3}
            globalFactorY={0.3}
            containerStyle={{overflow: "visible"}}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-8 sm:mb-16 -rotate-6">Get Connected</h2>
            <div className="flex items-center flex-col md:flex-row md:space-x-8">
              <div className="basis-1/2 w-full p-5">
                <div className={`relative`}>
                  <MouseParallaxChild factorX={0.1} factorY={0.1}>
                    <Blob fill="var(--theme-green)" className="inline-block w-10/12 ml-6 rotate-45" />
                  </MouseParallaxChild>

                  <MouseParallaxChild factorX={0.1} factorY={0.2}>
                    <Blob fill="var(--theme-blue)" className="absolute w-3/4 h-auto bottom-0 left-4 rotate-180" />
                  </MouseParallaxChild>

                  <MouseParallaxChild factorX={0.3} factorY={0.4}>
                    <Image
                      src="/goose.png"
                      alt=""
                      width="400"
                      height="400"
                      className="absolute w-11/12 h-auto bottom-0 left-6"
                    />
                  </MouseParallaxChild>
                </div>
              </div>

              <div className="basis-1/2 flex-auto w-full flex flex-col mb-6" data-aos="fade-up">
                <MailchimpSubscriptionForm />
              </div>
            </div>
          </MouseParallaxContainer>
        </Section>

      </main>

      <div className="w-full">

      <footer className={`w-full relative bg-purple`}>
        <div className="container px-4 py-8 lg:p-8 max-w-screen-lg mx-auto">
          <div className="w-full" data-aos="fade-up" data-aos-duration="1000">
            <Image className="w-full" src="/unboring-outline.svg" alt="unboring kw logo" width="600" height="200" />
          </div>
          <div className="w-full flex text-white space-x-8">
            <a
              href="mailto:hi@unboringkw.com"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="40" width="40">
                <path
                  d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com/unboringkw"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="40" width="40">
                <path
                  d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                />
              </svg>
            </a>

            <a
              href="https://instagram.com/unboringkw"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="40" width="40">
                <path
                  d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}
