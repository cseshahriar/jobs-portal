import Layout from '../../components/layout/Layout'
import axios from 'axios'
import JobDetails from '../../components/job/JobDetails'
import NotFound from '../../components/layout/NotFound'

export default function JobDetailsPage({ job, candidates, error }) {
  if (error && error.includes("Not found")) {
    return <NotFound />;
  }  else {
    return (
      <Layout>
        <JobDetails job={job} candidates={candidates} />
      </Layout>
    )
  }
}

export async function getServerSideProps({ params }) {
  try {
    console.log('not error ------------')
    const response = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/detail`)
    const job = response.data.job
    const candidates = response.data.candidates
    return {
        props: {job, candidates}
    }
  } catch (error) {
    return {
      props: { error: error.response.data.detail }
    }
  }
}