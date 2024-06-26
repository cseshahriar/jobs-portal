import { useState, createContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const JobContext = createContext()

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [JobError, setJobError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [applied, setApplied] = useState(false);
    
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
            if (res.data.applied === true) {
                setLoading(false);
                setApplied(true);
            }
        } catch (error) {
            console.log(error);
            setLoading(false)
            setApplied(false);
            setJobError(
                error.response && error.response.data.message
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
            }}
        >
            {children}
        </JobContext.Provider>
    )
}

export default JobContext