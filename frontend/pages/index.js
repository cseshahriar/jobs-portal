import axios from 'axios'
import Layout from '../components/layout/Layout'
import Home from '../components/Home'

export default function Index({ data }) {
  return (
    <Layout>
      <Home data={data} />
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const keyword = query.keyword || ''
  const location = query.location || ''
  const page = query.page || ""

  const queryString = `keyword=${keyword}&location=${location}&page=${page}`
  const response = await axios.get(`${process.env.API_URL}/api/jobs?${queryString}`)
  const data = response.data
  return {
    props: { data, }
  }
}