import Layout from 'components/Layout'
import ActivitiesFeed from 'components/ActivitiesFeed'
import { getActivities } from 'integrations/airtable';


export async function getServerSideProps() {
  const activities = await getActivities()
  return {
    props: { activities },
  }
}

export default function Activities({ activities }) {
  return (
    <Layout title="Activity ideas for all ages" description="A curated, seasonal list of family-friendly activity ideas that you can filter for your interests." color="green">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto pb-12">
        <ActivitiesFeed activities={activities} />
      </div>
    </Layout>
  )
}


