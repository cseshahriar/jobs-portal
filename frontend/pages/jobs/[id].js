import Layout from '../../components/layout/Layout'
import axios from 'axios'
import JobDetails from '../../components/job/JobDetails'
import NotFound from '../../components/layout/NotFound'

export default function JobDetailsPage({ job, candidates, access_token, error }) {
  if ( error?.includes("Not found")) return <NotFound />;

  return (
    <Layout>
      <JobDetails job={job} candidates={candidates} access_token={access_token} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  try {
    const response = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/detail`);
    const job = response.data.job;
    const candidates = response.data.candidates;
    const access_token = req.cookies.access || '';
    return {
      props: {
        job,
        candidates,
        access_token
      }
    }
  } catch (error) {
    return {
      props: { error: error.response.data.detail }
    }
  }
}