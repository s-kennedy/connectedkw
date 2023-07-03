import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import OutsideClickHandler from 'react-outside-click-handler';
import Train from 'components/Train'
import styles from 'styles/navbar.module.css'

const stops = [
  { name: `Events`, slug: `events` },
  { name: `Activities`, slug: `activities` },
  { name: `Places`, slug: `maps` },
  { name: `Articles`, slug: `articles` },
  { name: `Subscribe`, slug: `subscribe` }
]


const Layout = ({
  title="Unboring KW",
  description="Things to do in Kitchener Waterloo for families, children, and your inner child",
  image="https://www.unboringkw.com/share-image.jpg",
  color="rainbow",
  children }) => {

  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuHidden, setMenuHidden] = useState(true)
  const url = `https://www.unboringkw.com${router.pathname}`

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    if (!menuOpen) {
      setTimeout(() => {
        setMenuHidden(true)
      }, 500)
    }
  }, [menuOpen])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  const openMenu = () => {
    setMenuHidden(false)
    setTimeout(() => {
      setMenuOpen(true)
    }, 50)
  }

  useEffect(() => {
    router.events.on('hashChangeStart', closeMenu);
    router.events.on('routeChangeStart', closeMenu);

    return () => {
      router.events.off('hashChangeStart', closeMenu);
      router.events.off('routeChangeStart', closeMenu);
    }
  }, [router.events]);

  const currentStop = stops.find(stop => router.pathname.startsWith(`/${stop.slug}`)) || 'events'

  return (
    <div className={`page-bg-${color} flex flex-auto flex-col justify-stretch items-stretch min-h-screen w-full`}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="image" content={image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:creator" content="@unboringkw" />
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={image} />
        <meta property="og:description" content={description} />
      </Head>


        <Train stops={stops} current={currentStop} imagePath={'/ion-illustraged.png'} />


      <main className={`flex-auto snap-y`}>

        {children}

      </main>
    </div>
  )
}

export default Layout
