import styles from "../styles/section.module.css"

export default function Section({ className, children, id }) {
  return (
    <section className={`p-4 ${className}`} id={id}>
      <div className={`container sm:px-4 sm:py-8 lg:p-8 max-w-screen-lg mx-auto`}>
        {children}
      </div>
    </section>
  )
}
