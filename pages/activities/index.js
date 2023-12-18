import Layout from 'components/Layout'
import ActivitiesFeed from 'components/ActivitiesFeed'
import { getActivities, getEventCategories, getEventTags } from 'integrations/directus';
import slugify from 'slugify';

export async function getStaticProps() {
  const activities = await getActivities()
  const categories = await getEventCategories(activities)
  const tags = await getEventTags(activities)

  return {
    props: { activities, tags, categories }
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
      <div className="container mx-auto pb-12">
        <ActivitiesFeed activities={activities} filters={filters} />
      </div>
    </Layout>
  )
}


