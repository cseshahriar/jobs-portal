import axios from 'axios'
import Layout from '../../components/layout/Layout'
import JobsApplied from '../../components/job/JobsApplied'

import { isAuthenticatedUser } from '../../utils/isAuthenticated'
import { redirect } from 'next/dist/server/api-utils'

export default function JobAppliedPage({jobs}) {
  return (
    <Layout title='Job Applied'>
        <JobsApplied jobs={jobs} />
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const access_token = req.cookies.access
  const user = await isAuthenticatedUser(access_token);
  if(!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  } 

  const response = await axios.get(
    `${process.env.API_URL}/api/jobs/me/applied/`, 
    {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    }
  )
  const jobs = response.data;

  return {
    props: { jobs }
  }
}