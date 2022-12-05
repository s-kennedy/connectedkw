import styles from "../styles/star.module.css"

export default function Star({ spinning, loading }) {
  return (
    <div className={`flex justify-center ${styles.star}`}>
      <svg className={`${styles.starpaths} ${loading ? styles.loading : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 230">
        <path className={styles.outline} d="M124.9,17.48c24.83,0,29.88,8.54,54.7,30.86s43.94,23.33,53.23,47.56-10.4,46.15-18.46,66.61c-7.6,19.31.34,39.44-22.76,60.26-22.89,20.64-46.63,1.94-75.29,2.88s-35,7.63-58.12-2.88S38.29,192.7,33.73,167.12,7.86,125.4,17,95.9,59.6,61.44,71.24,48.34,100.07,17.48,124.9,17.48Z" transform="translate(-10 -10)" />
      </svg>
    </div>
  )
}
