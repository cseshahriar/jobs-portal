import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import DataTable from 'react-data-table-component'
// npm i styled-components --save when net available
import JobContext from '../../context/JobContext'
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const MyJobs = ({jobs, access_token}) => {
    const router = useRouter()
    const { loading, JobError, clearErrors, deleted, setDeleted, deleteJob } = useContext(JobContext);
    
    useEffect(() => {
        if(JobError) {
            toast.error(JobError);
            clearErrors();
        }

        if(deleted) {
            setDeleted(false)
            router.push(router.asPath)
            toast.success('Job Deleted Successfully.')
        }
    }, [JobError, deleted, ])
    
    const deleteHandler = (id) => {
        deleteJob(id, access_token)
    }

    const columns = [
        {
            name: 'Job Name',
            sortable: true,
            selector: (row) => row.title
        },
        {
            name: 'Salary',
            sortable: true,
            selector: (row) => row.salary
        },
        {
            name: 'Education',
            sortable: true,
            selector: (row) => row.education
        },
        {
            name: 'Experience',
            sortable: true,
            selector: (row) => row.experience
        },
        {
            name: 'Applied On',
            sortable: true,
            selector: (row) => row.created_at
        },
        {
            name: 'Action',
            sortable: true,
            selector: (row) => row.action
        },
    ]

    const data = []
    jobs && jobs.forEach((job) => {
        data.push({
            title: job.title,
            salary: job.salary,
            education: job.education,
            experience: job.experience,
            created_at: job.created_at.substring(0, 10),
            action: (
                <>
                    <Link href={`/jobs/${job.id}`} className='btn btn-info'>
                        <i className='fa fa-eye' ></i> Details
                    </Link>
                    <Link href={`/employeer/jobs/candidates/${job.id}`} className='btn btn-primary my-2 mx-1'>
                        <i className='fa fa-users' ></i> Candidates
                    </Link>
                    <Link href={`/employeer/jobs/${job.id}`} className='btn btn-warning my-2 mx-1'>
                        <i className='fa fa-pencil' ></i> Edit
                    </Link>
                    <button className='btn btn-danger mx-1' onClick={() => deleteHandler(job.id) }>
                        <i className='fa fa-trash'></i> Delete
                    </button>
                </>
            )

        })
    })

  return (
    <div className='row'>
        <div className='col-2'></div>
        <div className='col-8 mt-5'>
            <h4 className='my-5'>Job Applied</h4>
            <DataTable columns={columns} data={data} pagination responsive />
        </div>
        <div className='col-2'></div>
    </div>
  )
}

export default MyJobs