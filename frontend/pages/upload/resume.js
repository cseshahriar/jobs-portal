import axios from 'axios'
import Layout from '../../components/layout/Layout'
import { isAuthenticatedUser } from '../../utils/isAuthenticated'
import { redirect } from 'next/dist/server/api-utils'

import UploadResume from '../../components/user/UploadResume'
export default function UpdateResumePage({access_token}) {
  return (
    <Layout title='Upload Your Resume'>
      <UploadResume access_token={access_token} />
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
  return {
    props: { access_token}
  }
}