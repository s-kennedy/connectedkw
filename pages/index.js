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
    <Layout color="blue">
      <MouseParallaxContainer
        globalFactorX={0.2}
        globalFactorY={0.2}
      >
        <section className={`w-full relative`} id="landing">
          <div className="container p-3 lg:p-8 max-w-sm sm:max-w-screen-md lg:max-w-screen-lg mx-auto flex flex-col sm:flex-row h-full">
            <div className="basis-1/2">
              <MouseParallaxChild factorX={0.3} factorY={0.2} inverted>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-body font-bold mb-8 sm:mb-16 -rotate-6">
                  Hi KW 👋
                </h1>
              </MouseParallaxChild>
              <p className="text-lg sm:text-xl mb-4">{`Here you'll find things to do for families, children, and your inner child. Let's have some fun!`}</p>
              <div data-aos="zoom-in-right" data-aos-delay="500">
                <Link
                  href="/events"
                  className="transition-all btn btn-green">
                  Give me something to do 🙏
                </Link>
              </div>
            </div>
            <div className="basis-1/2 relative max-w-md md:mx-auto flex-auto min-h-0 place-self-start md:place-self-end md:mb-12 mt-20 p-5">
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
        </section>
      </MouseParallaxContainer>
      
      {/*<section className={`w-full relative`} id="subscribe">
        <div className="container p-3 lg:p-8 max-w-sm sm:max-w-screen-md lg:max-w-screen-lg mx-auto flex flex-col">
          <div className="flex items-center flex-col md:flex-row md:space-x-8">
            <MailchimpSubscriptionForm />
          </div>
        </div>
      </section>*/}
    </Layout>
  )
}


