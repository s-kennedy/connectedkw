import Link from 'next/link'
import Section from 'components/Section'
import Layout from 'components/Layout'
import Blob from 'components/Blob'
import { getArticles } from 'utils/articles';

export async function getStaticProps() {
  const articles = await getArticles()
  return {
    props: { articles }
  }
}

export default function AllArticles({ articles }) {
  return (
    <Layout title="All articles" color="green">
      <Section className="snap-center mt-12">
        <div className="bg-white rounded-xl border-black border-3 p-5 lg:p-10">
          <h1 className="text-5xl sm:text-6xl md:text-7xl mb-4 lg:mb-8">
            All articles
          </h1>

          <div className="flex flex-col">
            {
              articles.map(article => {
                const { meta } = article
                return (
                  <div className="w-full article" key={article.id}>
                    <Link href={article.link}>
                      <h3>{meta.title}</h3>
                    </Link>
                    <p className="uppercase text-sm mb-2 text-grey"><time>{meta.date}</time></p>
                    <p className="">
                      {meta.description}
                    </p>
                    <div className="divider flex justify-center items-center space-x-4 my-6">
                      <Blob fill="var(--theme-red)" className="inline-block w-2 rotate-45" />
                      <Blob fill="var(--theme-yellow)" className="inline-block w-2" />
                      <Blob fill="var(--theme-green)" className="inline-block w-2 -rotate-45" />
                    </div>
                  </div>
                )
              })
            }
          </div>
            
          <div className="my-6">
            <p>👈 <Link href="/">Back home</Link></p>
          </div>
        </div>
      </Section>
    </Layout>
  )
}
