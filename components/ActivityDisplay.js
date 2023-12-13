import styles from "../styles/ideaGenerator.module.css"
import ReactMarkdown from 'react-markdown'
import slugify from 'slugify'
import Link from 'next/link'
import { buildDateString } from 'utils/dates'
import Tag from 'components/Tag'

function ActivityDisplay({ activity }) {

  const { title,
    description,
    start_date,
    end_date,
    start_time,
    end_time,
    external_link,
    link_text,
    price,
    tags,
    categories,
    image,
    location 
  } = activity;

  const dateString = buildDateString(start_date, end_date, start_time, end_time)
  const imageUrl = image ? `${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${image.id}` : null

  return (
    <div className="container sm:p-8 sm:max-w-screen-lg mx-auto">
      <div className="min-h-screen sm:min-h-0 h-full w-full bg-white relative sm:border-black sm:border-3 sm:rounded-xl">
        <div className={`overflow-auto styled-scrollbar min-h-0 h-full w-full p-5 sm:pt-5`}>
          <div className=''>
            {image &&
            <div className="mb-4">
              <div className="relative">
                <img className="w-full object-cover aspect-square sm:aspect-video" src={imageUrl} alt={image.description} width={image.width} height={image.height} />
                { (image.credit) && <small className={`absolute bottom-0 left-0 right-0 text-xs p-1 ${styles.bgCaption}`}><ReactMarkdown>{image.credit}</ReactMarkdown></small> }
              </div>
            </div>
            }
            {title && <h3 className="text-xl mb-2 font-body font-medium">{title}</h3>}
            {description && <div className="mb-4"><ReactMarkdown>{description}</ReactMarkdown></div>}
            {external_link && <a className="text-blue" href={external_link} target="_blank" rel="noopener noreferrer">{link_text}</a>}
            <div className="flex flex-wrap my-4">
              {tags.map(tag => <Tag tag={tag} key={tag.id} />)}
            </div>
          </div>
          <div className="my-6">
            <p>👈 <Link href="/activities">Back to activities</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityDisplay
