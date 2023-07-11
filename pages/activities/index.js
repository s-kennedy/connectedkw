import Layout from 'components/Layout'
import ActivitiesFeed from 'components/ActivitiesFeed'
import { getActivities } from 'integrations/airtable';


export async function getServerSideProps() {
  const activities = await getActivities()
  let activityCategories = []
  let activityTags = []
  activities.forEach(activity => {
    activityCategories = activityCategories.concat(activity.fields.Category).filter(i => i)
    activityTags = activityTags.concat(activity.fields.Tags).filter(i => i)
  })
  const categories = [...new Set(activityCategories)];
  const tags = [...new Set(activityTags)];

  return {
    props: { activities, categories, tags }
  }
}

export default function Activities({ activities, categories, tags }) {
  return (
    <Layout title="Activity ideas for all ages" description="A curated, seasonal list of family-friendly activity ideas that you can filter for your interests." color="green">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto pb-12">
        <ActivitiesFeed activities={activities} categories={categories} tags={tags} />
      </div>
    </Layout>
  )
}


