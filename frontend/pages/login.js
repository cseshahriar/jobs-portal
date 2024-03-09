import axios from 'axios'
import Layout from '../components/layout/Layout'
import Login from '../components/auth/Login'

export default function LoginPage() {
  return (
    <Layout title='Login Page'>
      <Login />
    </Layout>
  )
}