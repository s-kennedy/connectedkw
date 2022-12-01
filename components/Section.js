import styles from "../styles/section.module.css"

export default function Section({ color, children }) {
  return (
    <section>
      <div className="w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 999 86.5">
          <path d="M.5,86.5s112.13-57.81,201-70.9c404.73-59.62,798,70.9,798,70.9Z" transform="translate(-0.5)" className={styles[color]} />
        </svg>
      </div>
      <div className={`bg-${color} p-4`}>
        <div className={`container mx-auto`}>
          {children}
        </div>
      </div>
    </section>
  )
}
