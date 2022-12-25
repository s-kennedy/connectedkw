import Layout from 'components/Layout'
import Link from 'next/link'

export default function ArticleLayout({ meta, color, children }) {
  return (
    <Layout 
      title={meta.title} 
      description={meta.description} 
      color={color}
    >
      <div className="container px-4 sm:py-8 lg:p-8 max-w-screen-lg mx-auto mt-12">
        <article className="bg-white rounded-xl border-black border-3 p-5 lg:p-10 article">
          {children}
          <div className="my-6">
            <p>👈 <Link href="/">Back home</Link></p>
          </div>
        </article>
      </div>
    </Layout>
  )
}
