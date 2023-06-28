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
    <Layout>
      <div className="container sm:py-8 lg:p-8 max-w-xs sm:max-w-screen-lg mx-auto">
        <ActivitiesFeed activities={activities} />
      </div>
    </Layout>
  )
}


