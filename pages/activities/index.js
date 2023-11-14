import Layout from 'components/Layout'
import ActivitiesFeed from 'components/ActivitiesFeed'
import { getActivities } from 'integrations/airtable';
import slugify from 'slugify';

export async function getStaticProps() {
  const activities = await getActivities()

  let activityCategories = []
  let activityTags = []

  activities.forEach(activity => {
    activityCategories = activityCategories.concat(activity.fields.Category).filter(i => i)
    activityTags = activityTags.concat(activity.fields.Tags).filter(i => i)
  })
  const categories = [...new Set(activityCategories)].map(cat => {
    return { id: cat, name: cat }
  })
  const tags = [...new Set(activityTags)].map(tag => {
    return { id: tag, name: tag }
  })

  const formattedActivities = activities.map(activity => {

    return {
      id: activity.id,
      ...activity.fields
    }
  })

  return {
    props: { activities: formattedActivities, categories, tags }
  }
}

export default function Activities({ activities=[], categories=[], tags=[] }) {

  const filters = [
    {
      label: 'Categories',
      id: 'categories',
      type: 'select-multiple',
      options: categories,
      multipleSelect: true,
      attributeFn: (activity) => activity.Category
    },
    {
      label: 'Tags',
      id: 'tags',
      type: 'select-multiple',
      options: tags,
      multipleSelect: true,
      attributeFn: (activity) => activity.Tags
    }
  ]

  return (
    <Layout title="Activity ideas for families and kids in Kitchener-Waterloo" description="A curated, seasonal list of family-friendly activity ideas that you can filter for your interests." color="green">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto pb-12">
        <ActivitiesFeed activities={activities} filters={filters} />
      </div>
    </Layout>
  )
}


