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

export default function Home() {
  return (
    <div className="page-container">
      <Head>
        <title>Unboring KW</title>
        <meta name="description" content="Things to see and do in Kitchener Waterloo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`w-full fixed z-50 border-b-3 border-black ${styles.navbar}`}>
        <navbar className="flex justify-between">
          <nav className="flex-auto">
            <a href="/" className="flex justify-start items-center hover:text-black space-x-4">
              <Image src="/unboring-kw-logo.svg" alt="Unboring KW logo" width={30} height={30} />
              <div className="title text-2xl">unboring <span className="font-medium">kw</span></div>
            </a>
          </nav>

          <div className="flex text-white space-x-4 items-center">
            <a
              href="mailto:hi@unboringkw.com"
              target="_blank"
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
              target="_blank"
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
              target="_blank"
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

      <main className={`${styles.main} snap-y`}>

        <MouseParallaxContainer
          globalFactorX={0.3}
          globalFactorY={0.3}
          containerStyle={{overflow: "visible"}}
          enabled={true}
        >
          <section id="landing" className="w-screen h-screen relative flex justify-center items-center">
            <div className="container w-full lg:w-11/12 xl:w-9/12 mx-auto py-16 h-full">
              <div className="relative w-full h-full flex justify-center items-center">

                <div className="relative max-w-sm lg:max-w-lg xl:max-w-xl mx-auto p-10 pl-14">
                  <MouseParallaxChild factorX={0.1} factorY={0.1} className="relative z-10">
                    <div className="flex justify-center items-center w-full h-full">
                    <h1 className="flex text-5xl lg:text-6xl xl:text-8xl font-body font-bold -rotate-6">
                      Let's have some fun
                    </h1>
                    </div>
                  </MouseParallaxChild>

                  <div className="absolute inset-0 -top-1/4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 982.47 751.6">
                      <path
                        d="M15.05,425c-32.57,181.73,30.05,273.4,93,324.88,85.15,69.62,224.47,38.7,343.26,52.93,162.52,19.46,243.51,83.33,366.07,49.83C937.18,819.86,1012.07,675.9,982,533.28,937.64,323.44,737.64,149,574.76,120,319.21,74.56,56.17,195.51,15.05,425Z"
                        transform="translate(-6.14 -110.57)"
                        fill="var(--theme-red)"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex absolute top-8 left-0" data-aos="zoom-in-down" data-aos-delay="100">
                  <MouseParallaxChild factorX={0.} factorY={0.4}>
                    <div className="flex items-start">
                      <Image src="/goose-flipped.png" height="180" width="140" alt="" className="translate-x-12 -translate-y-8" />
                      <div className="border-black border-3 rounded-xl bg-white p-6 pl-8 text-left max-w-xs">
                        <p className="text-xl font-medium">Hot tip</p>
                        <p className="">Water your plants</p>
                      </div>
                    </div>
                  </MouseParallaxChild>
                </div>

                <div className="flex absolute bottom-8 left-0" data-aos="zoom-in-right" data-aos-delay="500">
                  <MouseParallaxChild factorX={0.6} factorY={0.2}>
                    <WeatherWidget />
                  </MouseParallaxChild>
                </div>

                <div className="flex absolute bottom-6 right-0" data-aos="zoom-in-left" data-aos-delay="1000">
                  <MouseParallaxChild factorX={0.3} factorY={0.3}>
                    <a href="#activity-roulette" className="flex items-end">
                      <div className="border-black border-3 rounded-xl bg-white p-6 pr-10 text-left max-w-xs translate-x-16 ">
                        <div className="text-xl font-medium">Activity Roulette</div>
                        <div className="">Try your luck!</div>
                      </div>
                      <Image src="/biking-girl.png" height="220" width="220" alt="" className="rotate-6 translate-y-6" />
                    </a>
                  </MouseParallaxChild>
                </div>

              </div>
            </div>



            {/*
                    <MouseParallaxContainer
          globalFactorX={0.3}
          globalFactorY={0.3}
          containerStyle={{overflow: "visible"}}
          enabled={true}
        >
        <div className="basis-1/2 relative flex-auto min-h-0">
              <div className={styles.banner}>
              </div>
              <MouseParallaxChild factorX={0.1} factorY={0.1}>
                <div className={`object-cover`}>
                  <Image
                    src="/via-tracks.png"
                    alt="Via rail train tracks"
                    width="1500"
                    height="500"
                    className="object-cover rounded-xl border-3 border-black"
                  />
                </div>
              </MouseParallaxChild>

              <MouseParallaxChild factorX={0.1} factorY={0.2}>
                <Image src="/blob-green.svg" width="300" height="300" className="absolute bottom-0 left-1/3" />
              </MouseParallaxChild>

              <MouseParallaxChild factorX={0.3} factorY={0.4}>
                <Image src={"/biking-girl.png"} width="320" height="320" className="absolute bottom-8 left-1/3" />
              </MouseParallaxChild>
            </div>
            </MouseParallaxContainer>*/}

            <div className="enable-animation absolute bottom-px left-0 right-0">
              <div className="marquee marquee--hover-pause bg-white border-y-3 border-black">
                <ul className="marquee__content">
                  <li>new website 👋 </li>
                  <li>coming in hot 🔥</li>
                  <li>new website 🐣</li>
                  <li>you're gonna love it 😻</li>
                  <li>new website 🦄</li>
                  <li>yes please 👀</li>
                  <li>new website ✨</li>
                  <li>unboring kw 🌈</li>
                </ul>

                <ul aria-hidden="true" className="marquee__content">
                  <li>new website 👋 </li>
                  <li>coming in hot 🔥</li>
                  <li>new website 🐣</li>
                  <li>you're gonna love it 😻</li>
                  <li>new website 🦄</li>
                  <li>yes please 👀</li>
                  <li>new website ✨</li>
                  <li>unboring kw 🌈</li>
                </ul>
              </div>
            </div>
          </section>
        </MouseParallaxContainer>

        <Section className={`${styles.rouletteBg} my-24 mt-28 snap-center scroll-mt-28`} id="activity-roulette">
          <div className="flex items-start flex-col md:flex-row md:space-x-8">
            <div className="basis-1/2">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-10 -rotate-6">Activity Roulette</h2>
            </div>
            <div className="basis-1/2 max-h-screen flex flex-col">
              <div data-aos="fade-up">
                <IdeaGenerator />
              </div>
            </div>
          </div>
        </Section>

        <Section className="" id="coming-soon">
          <div className="bg-white rounded-xl border-black border-3 p-8 lg:p-10">
              <h2 className="text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-16 -rotate-6">Coming Soon</h2>
              <div className="flex items-start flex-col md:flex-row md:space-x-8">
                <div className="basis-1/2">
                  <p className="text-xl mb-6">Unboring KW is just getting started! We're here to make it easier to find fun things to do in Kitchener Waterloo. We have some big plans:</p>
                  <ul className="text-xl">
                      <li className="mb-4" data-aos="fade-up" data-aos-offset="50">📆&nbsp;&nbsp;Events calendar</li>
                      <li className="mb-4" data-aos="fade-up" data-aos-offset="100">🗺&nbsp;&nbsp;Community maps</li>
                      <li className="mb-4" data-aos="fade-up" data-aos-offset="150">️⭐&nbsp;&nbsp;Recommendations</li>
                      <li className="mb-4" data-aos="fade-up" data-aos-offset="250">✌&nbsp;&nbsp;Community engagement</li>
                    </ul>
                </div>
                <div className="basis-1/2 w-full">
                  <ImageCollage
                    src={"/ion-illustrated.png"}
                    color1="var(--theme-red)"
                    color2="var(--theme-yellow)"
                  />
                </div>
              </div>
          </div>
        </Section>

        <Section className="" id="get-connected">
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-16 -rotate-6">Get Connected</h2>
          <div className="flex items-start flex-col md:flex-row md:space-x-8">
            <div className="basis-1/2">
              <ImageCollage
                src={"/goose.png"}
                color1="var(--theme-blue)"
                color2="var(--theme-green)"
              />
            </div>
            <div className="basis-1/2 w-full max-h-screen flex flex-col mb-6" data-aos="fade-up">
              <MailchimpSubscriptionForm />
            </div>
          </div>
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
      </footer>
      </div>
    </div>
  )
}
