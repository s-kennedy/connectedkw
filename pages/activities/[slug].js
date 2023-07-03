import Layout from 'components/Layout'
import ActivityDisplay from "components/ActivityDisplay"
import { getActivity } from 'integrations/airtable'

export async function getServerSideProps({ params }) {
	const id = params.slug.split('__')[1]
  const activity = await getActivity(id)

  return {
    props: { activity: activity },
  }
}

export default function ActivityPage ({ activity }) {
  return (
    <Layout title={activity.fields?.Title} description={activity.fields?.Description} color="white">
    	<ActivityDisplay activity={activity} />
    </Layout>
  )
}


