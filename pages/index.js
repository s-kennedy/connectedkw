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
          <Image src="/unboring-kw-logo.svg" alt="Unboring KW logo" width={120} height={120} />
          <div className="title">unboring <span className="bold">kw</span></div>
        </nav>
      </navbar>

      <main className={styles.main}>
        <Section color="green">
          <IdeaGenerator />
        </Section>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
