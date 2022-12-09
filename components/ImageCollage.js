import Image from 'next/image'

import styles from "../styles/collage.module.css"

const Blob = ({ fill="var(--theme-blue)", opacity="0.25", blobStyles={} }) => {
  const style = {
    fill: fill,
    opacity: opacity,
    ...blobStyles
  }

  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 886.35 774.85">
      <path
        d="M568.25,741.2C691.41,691.92,901.4,553.86,893.94,366.09,885.61,156.2,609-30,380.15,18.78c-275.69,58.77-444.76,450.6-342,636.34C124,810.25,393.55,811.1,568.25,741.2Z"
        transform="translate(-7.78 -10.93)"
        style={style}
      />
    </svg>
  )
}

export default function ImageCollage({
  src,
  alt="",
  color,
  className,
  width="500",
  height="500",
  rotation="0",
  blobStyles
}) {
  return (
    <div className={`${styles.collageContainer} ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} />
      <Blob blobStyles={blobStyles} fill={color} />
    </div>
  )
}
