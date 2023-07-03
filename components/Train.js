import styles from 'styles/navbar.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {useRouter} from 'next/router'
import {DndContext, useDroppable, useDraggable} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useState, useEffect, useRef, forwardRef } from 'react'
import { useCookies } from 'react-cookie';
import { Tooltip } from 'react-tooltip'

const COOKIE_MAXAGE = 2147483647;
const COOKIE_NAME = 'train-nav-has-been-dragged';

const DroppableNav = ({ stop }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: stop.slug,
  });

  const slug = stop.slug === 'home' ? '' : stop.slug
  const anchor = stop.name === "Home" ? <Image alt={stop.name} src="/home-icon.svg" height={20} width={20} /> : stop.name

  return (
    <nav ref={setNodeRef} className={`${styles.nav} ${isOver ? styles.isOver : ''} inline-flex flex-col justify-center items-center`}>
      <Link href={`/${slug}`} className="text-black no-underline uppercase text-sm font-medium">{anchor}</Link>
      <div className={`${styles.stopDot}`} />
    </nav>
  )
}

const ActiveNav = forwardRef(function ActiveNav(props, ref) {
  const { stop } = props;
  const slug = stop.slug === 'home' ? '' : stop.slug
  const anchor = stop.name === "Home" ? <Image alt={stop.name} src="/home-icon.svg" height={20} width={20} /> : stop.name

  return (
    <nav className={`${styles.nav} ${styles.active} inline-flex flex-col justify-center items-center`}>
      <Link href={`/${slug}`} className="text-black no-underline uppercase text-sm font-medium">{anchor}</Link>
      <div className={`${styles.stopDot}`} ref={ref} />
    </nav>
  )
})

const DraggableTrain = ({ imagePath, coordinates }) => {
  const [show, setShow] = useState(false)
  const [ cookies, setCookie ] = useCookies([COOKIE_NAME]);

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable-train',
  });

  const left = coordinates ? coordinates.x  : 0;
  const top = coordinates ? coordinates.y  : 0;

  const style = {
    position: 'absolute',
    left: `${(left - 35)}px`,
    top: `${top + 2}px`,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  useEffect(() => {
    window.setTimeout(() => {
      const hasBeenDragged = cookies[COOKIE_NAME] === 'true'
      if (!hasBeenDragged) {
        setShow(true)
      }
    }, 3000)
  })

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={`${styles.trainBtn} absolute`}>
      <img src={imagePath} alt="" className={styles.navButton} data-tooltip-id="train-tooltip" data-tooltip-content="Move me!" />
      <Tooltip 
        id="train-tooltip" 
        isOpen={show}
        variant="light"
        className={styles.trainTooltip}
        place="bottom-start"
        offset={4}
      />
    </button>
  );
}


export default function Train({stops, current, imagePath}) {
  const router = useRouter()
  const dotRef = useRef(null)
  const [isDropped, setIsDropped] = useState(false);
  const [selectedStop, setSelectedStop] = useState(current.slug);
  const [currentStopPosition, setCurrentStopPosition] = useState(null)
  const [ cookies, setCookie ] = useCookies([COOKIE_NAME]);

  const handleDragEnd = (event) => {
    if (event.over && event.over.id) {
      setIsDropped(true);
      setSelectedStop(event.over.id)
      const newPositionX = currentStopPosition.x + event.delta.x
      setCurrentStopPosition({ ...currentStopPosition, x: newPositionX })
      setCookie(COOKIE_NAME, 'true', { maxAge: COOKIE_MAXAGE })
    }
  }

  useEffect(() => {
    if (current.slug !== selectedStop) {
      const newPath = (selectedStop === 'home') ? '/' : `/${selectedStop}`
      router.push(newPath)
    }
  }, [selectedStop])

  useEffect(() => {
    if (!currentStopPosition && dotRef.current) {
      const positionX = dotRef.current.offsetLeft;
      const positionY = dotRef.current.offsetTop;
      setCurrentStopPosition({ x: positionX, y: positionY })
    }
  })

  return(
    <div className="fixed w-full z-50 top-0 left-0 right-0">
      <DndContext modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]} onDragEnd={handleDragEnd}>
        <header className="w-full border-b-3 border-black inline-flex p-2 md:px-5 justify-around relative">
          { stops.map(stop => {
            const active = current === stop
            if (active) {
              return <ActiveNav key={stop.slug} stop={stop} ref={dotRef} />
            } else {
              return <DroppableNav stop={stop} key={stop.slug} />
            }
          })}
          <DraggableTrain imagePath={imagePath} coordinates={currentStopPosition} />
        </header>
      </DndContext>
    </div>
  )
}