import styles from "../styles/section.module.css"

export default function Section({ className, children, id }) {
  return (
    <section className={`p-4 ${className}`} id={id}>
      <div className={`container px-4 py-8 lg:p-8 max-w-screen-lg mx-auto`}>
        {children}
      </div>
    </section>
  )
}
