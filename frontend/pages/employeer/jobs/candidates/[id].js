import axios from 'axios'
import Layout from '../../../../components/layout/Layout'
import NotFound from '../../../../components/layout/NotFound'
import JobCandidates from '../../../../components/job/JobCandidates'
import { isAuthenticatedUser } from '../../../../utils/isAuthenticated'
import { redirect } from 'next/dist/server/api-utils'

export default function JobCandidatesPage({ candidates, error }) {
  if ( error?.includes("Not found")) return <NotFound />; 

  return (
    <Layout title='Job Candidates'>
      <JobCandidates candidates={candidates} />
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  try {
    const access_token = req.cookies.access || '';
    const user = await isAuthenticatedUser(access_token);
    if(!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        } 
      }
    } 
    const res = await axios.get(
      `${process.env.API_URL}/api/jobs/${params.id}/candidates`, 
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    const candidates = res.data;
    return {
      props: {candidates }
    }
  } catch (error) {
    return {
      props: { error: error.response.data.message || error.response.data.detail}
    }
  }
}