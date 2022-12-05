import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import IdeaGenerator from '../components/IdeaGenerator'
import Section from '../components/Section'

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
            <Image src="/unboring-kw-logo.svg" alt="Unboring KW logo" width={120} height={120} />
            <div className="title">unboring <span className="bold">kw</span></div>
          </a>
        </nav>
      </navbar>

      <main className={styles.main}>
        <Section color="green">
          <div className="max-w-md mx-auto p-4 lg:min-h-halfscreen max-h-screen p-5 md:p-0 flex flex-col">
            <IdeaGenerator />
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
