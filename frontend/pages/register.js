import axios from 'axios'
import Layout from '../components/layout/Layout'
import Register from '../components/auth/Register'

export default function LoginPage() {
  return (
    <Layout title='Register Page'>
      <Register />
    </Layout>
  )
}