import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { jobTypeOptions, educationOptions, industryOptions, experienceOptions} from './data';
import JobContext from '../../context/JobContext'

import { useRouter } from "next/router";

const UpdateJob = ({ job, access_token }) => {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [job_type, setJobType] = useState('Permanent')
    const [education, setEducation] = useState('Bachelors')
    const [industry, setIndustry] = useState('Business')
    const [experience, setExperience] = useState('No Experience')
    const [salary, setSalary] = useState('')
    const [positions, setPositions] = useState('')
    const [company, setCompany] = useState('') 

    const { loading, JobError, clearErrors, updateJob, updated, setUpdated } = useContext(JobContext);

    useEffect(() => {
        if(JobError) {
            toast.error(JobError);
            clearErrors();
        }

        if(updated) {
            setUpdated(false)
            router.push('/employeer/jobs')
            toast.success('Job Updated Successfully.')
        }

        if(job) {
            setTitle(job.title)
            setDescription(job.description)
            setEmail(job.email)
            setAddress(job.address)
            setJobType(job.job_type)
            setEducation(job.education)
            setIndustry(job.industry)
            setExperience(job.experience)
            setSalary(job.salary)
            setPositions(job.positions)
            setCompany(job.company)
        }
    }, [JobError, updated]);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            title, description, email, address, job_type, education, industry,
            experience, salary, positions, company
        }
        console.log('data ', data)
        updateJob(job.id, data, access_token);
    }

      
    return (
        <div className="newJobcontainer">
            <div className="formWrapper">
                <div className="headerWrapper">
                    <div className="headerLogoWrapper"></div>
                    <h1>
                        <i aria-hidden className="fas fa-copy mr-2"></i> UPDATE JOB
                    </h1>
                </div>
                <form className="form" onSubmit={submitHandler}>
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <div className="inputWrapper">
                                <div className="inputBox">
                                    <i aria-hidden className="fab fa-tumblr"></i>
                                    <input 
                                        type="text" placeholder="Enter Job Title" 
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title} required 
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-file-medical-alt"></i>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="description"
                                        type="text"
                                        placeholder="Enter Job Description"
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-envelope"></i>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        type="email"
                                        placeholder="Enter Your Email"
                                        pattern="\S+@\S+\.\S+"
                                        title="Your email is invalid"
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-map-marker-alt"></i>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Address" 
                                        onChange={(e) => setAddress(e.target.value)}
                                        value={address} required 
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-dollar-sign"></i>
                                    <input
                                        value={salary}
                                        onChange={(e) => setSalary(e.target.value)}
                                        type="number"
                                        placeholder="Enter Salary Range"
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-users"></i>
                                    <input
                                        value={positions}
                                        onChange={(e) => setPositions(e.target.value)}
                                        type="number"
                                        placeholder="Enter No. of Positions"
                                        required
                                    />
                                </div>
                                <div className="inputBox">
                                    <i aria-hidden className="fas fa-building"></i>
                                    <input
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                        type="text"
                                        placeholder="Enter Company Name"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
                            <div className="boxWrapper">
                                <h4>Job Types:</h4>
                                <div className="selectWrapper">
                                    <select 
                                        className="classic" 
                                        value={job_type}
                                        onChange={(e) => setJobType(e.target.value)}
                                    >   
                                        {
                                            jobTypeOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Education:</h4>
                                <div className="selectWrapper">
                                    <select 
                                        className="classic"
                                        value={education}
                                        onChange={(e) => setEducation(e.target.value)}
                                    >
                                        {
                                            educationOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Industry:</h4>
                                <div className="selectWrapper">
                                    <select 
                                        className="classic"
                                        value={industry}
                                        onChange={(e) => setIndustry(e.target.value)}
                                    >
                                        {
                                            industryOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="boxWrapper">
                                <h4>Experience:</h4>
                                <div className="selectWrapper">
                                    <select 
                                        className="classic"
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                    >
                                        {
                                            experienceOptions.map(option => (
                                                <option key={option} value={option}>{option}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col text-center mt-3">
                            <button className="createButton">{ loading ? "Updating..." : "Update Job"}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateJob;