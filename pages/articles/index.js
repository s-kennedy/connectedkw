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
    <Layout title="All articles" color="purple">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto py-10">
        <div className="p-3 space-y-2">
        {
          articles.map(article => {
            const { meta } = article
            return (
              <Link href={article.link} className={`btn relative snap-start transition-all p-3 items-start flex-col w-full bg-white border-3 rounded-xl border-black`}>
                <div className="w-full article" key={article.id}>
                    <h3>{meta.title}</h3>
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
              </Link>
            )
          })
        }
        </div>
      </div>
    </Layout>
  )
}
