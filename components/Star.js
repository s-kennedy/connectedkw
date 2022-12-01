import styles from "../styles/star.module.css"

export default function Star({ spinning, loading }) {
  return (
    <div className={`flex justify-center overflow-hidden ${styles.star}`}>
      <svg className={`${styles.starpaths} ${spinning ? styles.spinning : ''} ${loading ? styles.loading : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800">
        <path className={styles.outline} d="M436.63,117.88C500.08,111.1,601.75,206.35,666.88,227s180,9.63,220.53,67-23.23,157.48-28.53,263.35c-6,119,44.56,167.52.34,219.79-49.08,58-147.29,38.84-244.64,62.58C514.19,864.2,447.94,923.57,391,899.62c-71.69-30.16-80.13-135.07-128-213.51-52-85.26-143.79-130.86-133.18-193.93S240.88,376.61,300,299.57C357.23,225,380.42,123.89,436.63,117.88Z" transform="translate(-127 -115.54)" />
      </svg>
    </div>
  )
}
