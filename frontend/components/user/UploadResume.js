import React, {useState, useContext, useEffect} from "react";
import { useRouter } from "next/router";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

const UploadResume = ({access_token}) => {
    const [resume, setResumeFile] = useState(null);
    const router = useRouter();
  
    const { 
        user,
        loading, 
        error, 
        uploaded,
        setUploaded, 
        uploadResume,  
        clearErrors,
    } = useContext(AuthContext);
  
    useEffect(() => {
      if (error) {
        toast.error(error);
        clearErrors();
      }
  
      if(uploaded) {
        setUploaded(false);
        toast.success("Your resume is uploaded successfully.")
      }
    }, [error, uploaded]);
  
    const onChange = (e) => {
        const resumeFile = e.target.files[0];
        setResumeFile(resumeFile);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (resume) {
          const formData = new FormData(); // form data for file
          formData.append("resume", resume); // append file
          console.log('Submitting formData:', formData.get('resume')); // Debugging statement
          uploadResume(formData, access_token);
        } else {
          toast.error("Please select a resume file to upload.");
        }
    };


    return (
        <div className="modalMask">
        <div className="modalWrapper">
            <div className="left">
            <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <img src="/images/resume-upload.svg" alt="resume" layout="fill" />
            </div>
            </div>
            <div className="right">
            <div className="rightContentWrapper">
                <div className="headerWrapper">
                <h3> UPLOAD RESUME </h3>
                </div>
                <form className="form" onSubmit={submitHandler}>
                <div className="inputWrapper">
                    <div className="inputBox">
                    <i aria-hidden className="fas fa-upload"></i>
                    <input
                        type="file"
                        name="resume"
                        id="customFile"
                        accept="application/pdf"
                        required
                        onChange={onChange}
                    />
                    </div>
                </div>
                { user && user.resume && (
                    <>
                        <h4 className="text-center my-3">OR</h4>
                        <Link
                            href={`http://localhost:8000/${user.resume}`}
                            className="text-success text-center ml-4"
                            rel="noreferrer"
                            target="_blank"
                        >
                            <b>
                            <i aria-hidden className="fas fa-download"></i> Download
                            Your Resume
                            </b>
                        </Link>
                    </>
                )}

                <div className="uploadButtonWrapper">
                    <button type="submit" className="uploadButton">
                    { loading ? "Uploading" : "Upload"}
                    </button>
                </div>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};

export default UploadResume;