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
    <Layout title="All activity ideas" color="yellow">
      <div className="container sm:max-w-screen-md md:max-w-screen-lg mx-auto py-10">
        <ActivitiesFeed activities={activities} />
      </div>
    </Layout>
  )
}


