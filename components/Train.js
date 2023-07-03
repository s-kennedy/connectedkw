import styles from 'styles/navbar.module.css'
import Link from 'next/link'

export default function Train({stops, current, imagePath}) {

  return(
    <header className="w-full fixed border-b-3 border-black py-2 px-5 overflow-auto whitespace-nowrap space-x-4">
      { stops.map(stop => {
        const active = current === stop.slug
        return (
          <nav key={stop.slug} className={`${styles.nav} ${active ? styles.active : ''} inline-flex flex-col justify-center items-center relative`}>
            <Link href={`/${stop.slug}`} className="text-black no-underline uppercase text-sm font-medium">{stop.name}</Link>
            <div className={`${styles.stopDot}`} />
          </nav>git
        )
      })}
    </header>
  )
}