import Link from 'next/link'
import Section from 'components/Section'
import Layout from 'components/Layout'
import Blob from 'components/Blob'
import { getPagesByTemplate } from 'integrations/directus';

export async function getStaticProps() {
  const pages = await getPagesByTemplate('article')

  return {
    props: { pages }
  }
}

const locale = 'en-CA';
const options = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
};

export default function AllArticles({ pages }) {
  return (
    <Layout title="All articles" color="red">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto py-5">
        <h1 className="text-8xl md:text-9xl font-display mb-2">{`Blog`}</h1>

        <div className="space-y-2">
        {
          pages.map(page => {
            const publishedOn = new Date(page.date_created).toLocaleDateString(locale, options);
            return (
              <Link key={page.slug} href={`/articles/${page.slug}`} className={`btn relative snap-start transition-all p-3 items-start flex-col w-full bg-white border-3 rounded-xl border-black`}>
                <div className="w-full article">
                    <h3>{page.title}</h3>
                    <p className="uppercase text-sm mb-2 text-grey"><time>{publishedOn}</time></p>
                    <p className="">
                      {page.description}
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
