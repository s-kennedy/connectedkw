import styles from "../styles/section.module.css"

export default function Section({ className, children }) {
  return (
    <section className={`p-4 ${className}`}>
      <div className={`container p-4 lg:p-8 max-w-screen-lg mx-auto`}>
        {children}
      </div>
    </section>
  )
}
