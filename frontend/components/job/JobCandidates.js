import React from 'react'
import Link from 'next/link'
import DataTable from 'react-data-table-component'

const JobCandidates = ({candidates}) => {
    console.log('JobCandidates component', candidates)
    const columns = [
        {
            name: 'Job Name',
            sortable: true,
            selector: (row) => row.title
        },
        {
            name: 'User ID',
            sortable: true,
            selector: (row) => row.id
        },
        {
            name: 'Candidate Resume',
            sortable: true,
            selector: (row) => row.resume
        },
        {
            name: 'Applied At',
            sortable: true,
            selector: (row) => row.created_at
        },
    ]
    const data = []
    candidates && candidates.forEach((item) => {
        data.push({
            title: item.job.title,
            id: item.user.email,
            salary: item.job.salary,
            resume: (
              <>
                <Link
                    href={`http://localhost:8000/${item.resume}`}
                    className="text-success text-center ml-4"
                    rel="noreferrer"
                    target="_blank"
                >
                      <b>
                        <i aria-hidden className="fas fa-download"></i> View Resume
                      </b>
                </Link>
              </>
            ),
            created_at: item.created_at.substring(0, 10)
        })
    })

  return (
    <div className='row'>
        <div className='col-2'></div>
        <div className='col-8 mt-5'>
            <h4 className='my-5'>
                {candidates && `${candidates.length} Candidates applied to this job` }
            </h4>
            <DataTable columns={columns} data={data} pagination responsive />
        </div>
        <div className='col-2'></div>
    </div>
  )
}

export default JobCandidates