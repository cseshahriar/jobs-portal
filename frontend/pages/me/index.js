import axios from 'axios'
import Layout from '../../components/layout/Layout'
import UpdateProfile from '../../components/user/UpdateProfile'

export default function LoginPage() {
  return (
    <Layout title='Update user profile'>
      <UpdateProfile />
    </Layout>
  )
}