import { useState, createContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [JobError, setJobError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [applied, setApplied] = useState(false);
    const [created, setCreated] = useState(false);
    const [stats, setStats] = useState(false);
    
    const router = useRouter()

    // apply to job
    const applyToJob = async (id, access_token) => {
        try {
            setLoading(true)
            const res = await axios.post(
                `${process.env.API_URL}/api/jobs/${id}/apply/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            )
            if (res.data.applied == true) {
                setLoading(false);
                setApplied(true);
            }
        } catch (error) {
            setLoading(false)
            setApplied(false);
            setJobError(
                error.response && error.response.data.error || error.response.data.message
            )
        }
    }

    // post a new job
    const postNewJob = async (data, access_token) => {
        try {
            setLoading(true)
            const res = await axios.post(
                `${process.env.API_URL}/api/jobs/create/`, data,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            )
            if (res.data) {
                setLoading(false)
                setCreated(true)
            }
        } catch (error) {
            setLoading(false)
            setCreated(false)
            setJobError(
                error.response && error.response.data.error || error.response.data.message
            )
        }
    }

    // check job apply
    const checkJobApply = async (id, access_token) => {
        try {
            setLoading(true)
            const res = await axios.get(
                `${process.env.API_URL}/api/jobs/${id}/check/`,
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }
            )
            setLoading(false);
            setApplied(res.data);
        } catch (error) {
            setLoading(false)
            setApplied(false);
            setJobError(
                error.response && error.response.data.error || error.response.data.message
            )
        }
    }

    // get topic stats
    const getTopicStats = async (topic) => {
        try {
            setLoading(true)
            const res = await axios.get(
                `${process.env.API_URL}/api/jobs/stats/${topic}/`
            )
            setLoading(false);
            setStats(res.data);
        } catch (error) {
            setLoading(false)
            setStats(false);
            setJobError(
                error.response && error.response.data.error || error.response.data.message
            )
        }
    }

    // clear error 
    const clearErrors = () => {
        setJobError(null);
    }

    return (
        <JobContext.Provider 
            value={{ 
                loading,
                JobError,
                updated,
                applied,
                applyToJob,
                setUpdated,
                clearErrors,
                checkJobApply,
                getTopicStats,
                stats,
                postNewJob,
                created,
                setCreated
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext