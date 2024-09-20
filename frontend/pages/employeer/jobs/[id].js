import axios from 'axios'
import Layout from '../../../components/layout/Layout'

import NotFound from '../../../components/layout/NotFound'
import UpdateJob from '../../../components/job/UpdateJob'

import { isAuthenticatedUser } from '../../../utils/isAuthenticated'
import { redirect } from 'next/dist/server/api-utils'

export default function UpdateJobPage({ job, access_token, error }) {
  if ( error?.includes("Not found")) return <NotFound />; 

  return (
    <Layout title='Update Job'>
      <UpdateJob job={job} access_token={access_token} />
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
    const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/detail`)
    const job = res.data.job;

    return {
      props: {job, access_token }
    }
  } catch (error) {
    return {
      props: { error: error.response.data.message || error.response.data.error}
    }
  }
}