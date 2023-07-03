import styles from 'styles/navbar.module.css'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {DndContext, useDroppable, useDraggable} from '@dnd-kit/core';
import { restrictToHorizontalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useState, useEffect, useRef, forwardRef } from 'react'

const DroppableNav = ({ stop, setCurrentStopPosition }) => {
  const {isOver, setNodeRef} = useDroppable({
    id: stop.slug,
  });

  return (
    <nav ref={setNodeRef} className={`${styles.nav} ${isOver ? styles.isOver : ''} inline-flex flex-col justify-center items-center`}>
      <Link href={`/${stop.slug}`} className="text-black no-underline uppercase text-sm font-medium">{stop.name}</Link>
      <div className={`${styles.stopDot}`} />
    </nav>
  )
}

const ActiveNav = forwardRef(function ActiveNav(props, ref) {
  const { stop} = props;

  return (
    <nav className={`${styles.nav} ${styles.active} inline-flex flex-col justify-center items-center`}>
      <Link href={`/${stop.slug}`} className="text-black no-underline uppercase text-sm font-medium">{stop.name}</Link>
      <div className={`${styles.stopDot}`} ref={ref} />
    </nav>
  )
})

const DraggableTrain = ({ imagePath, coordinates }) => {

  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: 'draggable-train',
  });

  const left = coordinates ? coordinates.x  : 0;
  const top = coordinates ? coordinates.y  : 0;

  const style = {
    position: 'absolute',
    left: `${(left - 35)}px`,
    top: `${top + 5}px`,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
  };

  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes} className={`absolute`}>
      <img src={imagePath} alt="" className={styles.navButton} />
    </button>
  );
}


export default function Train({stops, current, imagePath}) {
  const router = useRouter()
  const dotRef = useRef(null)
  const [isDropped, setIsDropped] = useState(false);
  const [selectedStop, setSelectedStop] = useState(current.slug);
  const [currentStopPosition, setCurrentStopPosition] = useState(null)

  const handleDragEnd = (event) => {
    console.log({event})
    if (event.over && event.over.id) {
      setIsDropped(true);
      setSelectedStop(event.over.id)
      const newPositionX = currentStopPosition.x + event.delta.x
      setCurrentStopPosition({ ...currentStopPosition, x: newPositionX })
    }
  }

  useEffect(() => {
    if (current.slug !== selectedStop) {
      const newPath = `/${selectedStop}`
      router.push(newPath)
    }
  }, [selectedStop])

  useEffect(() => {
    if (!currentStopPosition) {
      const positionX = dotRef.current.offsetLeft;
      const positionY = dotRef.current.offsetTop;
      setCurrentStopPosition({ x: positionX, y: positionY })
    }
  })

  return(
    <div className="fixed w-full z-50">
    <DndContext modifiers={[restrictToHorizontalAxis, restrictToWindowEdges]} onDragEnd={handleDragEnd}>
      <header className="w-full border-b-3 border-black inline-flex py-2 px-5 justify-around relative">
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