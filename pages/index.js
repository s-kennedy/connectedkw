import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"

import Layout from 'components/Layout'
import IdeaGenerator from 'components/IdeaGenerator'
import EventsFeed from 'components/EventsFeed'
import WeatherWidget from 'components/WeatherWidget'
import Section from 'components/Section'
import MailchimpSubscriptionForm from 'components/MailchimpSubscriptionForm'
import Blob from 'components/Blob'
import Marquee from 'components/Marquee'
import { getArticles } from 'utils/articles';

export async function getStaticProps() {
  const articles = await getArticles()
  return {
    props: { articles },
  }
}


export default function Home({ articles }) {

  return (
    <Layout>
      <MouseParallaxContainer
        globalFactorX={0.2}
        globalFactorY={0.2}
      >
        <section className={`pt-[61px] w-screen sm:h-screen relative`} id="landing">
          <div className="container px-4 py-8 lg:p-8 max-w-sm sm:max-w-screen-md lg:max-w-screen-lg mx-auto flex flex-col sm:flex-row h-full">
            <div className="basis-1/2">
              <MouseParallaxChild factorX={0.3} factorY={0.2} inverted>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-8 sm:mb-16 -rotate-6">
                  Hi KW 👋
                </h1>
              </MouseParallaxChild>
              <p className="text-2xl mb-4">{`We're here to make it easier to find things to do in Kitchener-Waterloo.`}</p>
              <p className="text-2xl mb-6">{`Let's have some fun!`}</p>
              <div data-aos="zoom-in-right" data-aos-delay="500">
                <a
                  href="#activity-roulette"
                  className="transition-all btn btn-green">
                  Give me something to do 🙏
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
                <Image src="/blob-green.svg" width="280" height="280" className="absolute bottom-0 right-0" alt="" />
              </MouseParallaxChild>
              <MouseParallaxChild factorX={0.3} factorY={0.4}>
                <Image src={"/biking-girl.png"} width="320" height="320" className="absolute bottom-8 right-0" alt="" />
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
        <section id="activity-roulette" className={`w-screen lg:h-screen relative flex flex-col lg:flex-row justify-center items-start sm:items-center snap-center scroll-mt-10 p-5`}>
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
              <div className={`max-w-xs mx-auto max-h-screen flex-auto w-full flex flex-col max-h-visibleScreen`} data-aos="fade-up">
                <IdeaGenerator />
              </div>
            </div>
          </div>
        <div className="p-4 lg:absolute bottom-8 right-0 max-sm:my-8 mx-auto" data-aos="zoom-in-left" data-aos-delay="1000">
          <WeatherWidget />
        </div>
        </section>
      </MouseParallaxContainer>

      <Section className="snap-start scroll-mt-10" id="events">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-8 -rotate-6">
          Events
        </h2>
        <div className={`flex-auto w-full flex flex-col md:max-h-visibleScreen`}>
          <EventsFeed />
        </div>
      </Section>

      <Section className="snap-start scroll-mt-10" id="maps">
        <div className="bg-white rounded-xl border-black border-3 p-5 lg:p-10">
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-8 sm:mb-16 -rotate-6">
            Maps
          </h2>
          <div className="flex flex-col">
            <div className="w-full map flex flex-col sm:flex-row space-y-4 sm:space-x-4">
              <div className="image basis-1/3 overflow-hidden rounded-lg border-2 border-black">
                <Link href="/maps/public-art-in-waterloo-region">
                  <Image src="/map-thumbnail.jpg" width={400} height={265} alt="Screenshot of map" className="object-cover h-full w-full" />
                </Link>
              </div>
              <div className="info basis-2/3">
                <Link href="/maps/public-art-in-waterloo-region">
                  <h3>Public Art in Waterloo Region</h3>
                </Link>
                <p className="uppercase text-sm mb-2 text-grey">January 11, 2023</p>
                <p className="">
                  {`Who knew our region has/is a massive outdoor art gallery with over 150 pieces?? This map includes public art from Kitchener, Waterloo, Cambridge, and the Region of Waterloo, all in one interactive map. Happy exploring!`}
                </p>
              </div>

            </div>
          </div>
        </div>
      </Section>

      <Section className="snap-start scroll-mt-10" id="articles">
          <div className="bg-white rounded-xl border-black border-3 p-5 lg:p-10">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-8 sm:mb-16 -rotate-6">
              Articles
            </h2>
            <div className="flex flex-col">
            {
              articles.map(article => {
                const { meta } = article
                return (
                  <div className="w-full article" key={article.id}>
                    <Link href={article.link}>
                      <h3>{meta.title}</h3>
                    </Link>
                    <p className="uppercase text-sm mb-2 text-grey"><time>{meta.date}</time></p>
                    <p className="">
                      {meta.description}
                    </p>
                    <div className="divider flex justify-center items-center space-x-4 my-6">
                      <Blob fill="var(--theme-red)" className="inline-block w-2 rotate-45" />
                      <Blob fill="var(--theme-yellow)" className="inline-block w-2" />
                      <Blob fill="var(--theme-green)" className="inline-block w-2 -rotate-45" />
                    </div>
                  </div>
                )
              })
            }
            </div>
            <Link href="/articles" className="btn btn-purple mt-8">All articles</Link>
          </div>
      </Section>

      <Section className="snap-start scroll-mt-10" id="coming-soon">
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
                <p className="text-lg md:text-xl mb-4 sm:mb-6">Unboring KW is just getting started! We&apos;re here to make it easier to find fun things to do in Kitchener Waterloo. We have some big plans:</p>
                <ul className="text-lg md:text-xl">
                    <li className="mb-2 sm:mb-4" data-aos="fade-up">🗺&nbsp;&nbsp;Community maps</li>
                    <li className="mb-2 sm:mb-4" data-aos="fade-up">️⭐&nbsp;&nbsp;Reviews and recommendations</li>
                    <li className="mb-2 sm:mb-4" data-aos="fade-up">✌&nbsp;&nbsp;Community engagement</li>
                  </ul>
                <p className="text-lg md:text-xl mb-4 sm:mb-6">We&apos;re very open to ideas, suggestions, and feedback. Feel free to contact us at <a href="mailto:hi@unboringkw.com">hi@unboringkw.com</a>.</p>
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

      <Section className="snap-start scroll-mt-10" id="get-connected">
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
    </Layout>
  )
}


