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
  const page = query.page || 1

  const job_type = query.job_type || ""
  const education = query.education || ""
  const experience = query.experience || ""

  let min_salary = ""
  let max_salary = ""
  if(query.salary) {
    const [min, max] = query.salary.split("-")
    min_salary = min
    max_salary = max
  }

  const queryString = `keyword=${keyword}&location=${location}&page=${page}&job_type=${job_type}&education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`
  const response = await axios.get(`${process.env.API_URL}/api/jobs?${queryString}`)
  const data = response.data
  return {
    props: { data, }
  }
}