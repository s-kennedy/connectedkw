import Image from 'next/image'
import Link from 'next/link'
import styles from 'styles/Home.module.css'
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse"

import Layout from 'components/Layout'
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
              <p className="text-2xl mb-4">{`Here you'll find things to do for families, children, and your inner child.`}</p>
              <p className="text-2xl mb-6">{`Let's have some fun!`}</p>
              <div data-aos="zoom-in-right" data-aos-delay="500">
                <a
                  href="#events"
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


