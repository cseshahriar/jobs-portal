import Layout from '../../components/layout/Layout'
import axios from 'axios'
import JobDetails from '../../components/job/JobDetails'

export default function JobDetailsPage({ job, candidates }) {
  return (
    <Layout>
      <JobDetails job={job} candidates={candidates} />
    </Layout>
  )
}

export async function getServerSideProps({ params }) {
    const response = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/detail`)
    const job = response.data.job
    const candidates = response.data.candidates
    return {
        props: {job, candidates}
    }
}