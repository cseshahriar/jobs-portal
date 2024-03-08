import React from "react";
import { useRouter } from "next/router"

const Filters = () => {
  const router = useRouter()

  let queryParams;
  if(typeof window !== 'undefined') {
    queryParams = new URLSearchParams(window.location.search)
  }

  function handleClick(checkbox) {
    if(typeof window !== 'undefined') {
      const checkboxes = document.getElementsByName(checkbox.name)
      checkboxes.forEach(item => {
        if(item !== checkbox) item.checked = false
      })
    }

    if(checkbox.checked === false) {
      // delete the filter from query
      if(queryParams.has(checkbox.name)) {
        queryParams.delete(checkbox.name)
        router.replace({
          search: queryParams.toString()
        })
      }
    } else {
      // set new filter value if it already there
      if(queryParams.has(checkbox.name)) {
        queryParams.set(checkbox.name, checkbox.value)
      } else {
        queryParams.append(checkbox.name, checkbox.value)
      }
      router.replace({
        search: queryParams.toString()
      })
    }
  }

  function checkHandle(checkBoxType, checkBoxValue) {
    if(typeof window !== 'undefined') {
      const value = queryParams.get(checkBoxType)
      if(value === checkBoxValue) return true
      return false
    }
  }

  return (
    <div className="sidebar mt-5">
      <h3>Filters</h3>

      <hr />
      <h5 className="filter-heading mb-3">Job Type</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="job_type"
          id="check1"
          value="Permanent"
          defaultChecked={checkHandle("job_type", "Permanent")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check1">
          Permanent
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="job_type"
          id="check2"
          value="Temporary"
          defaultChecked={checkHandle("job_type", "Temporary")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check2">
          Temporary
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="job_type"
          id="check3"
          value="Internship"
          defaultChecked={checkHandle("job_type", "Internship")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check3">
          Internship
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Education</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check4"
          value="Bachelors"
          defaultChecked={checkHandle("education", "Bachelors")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check4">
          Bachelors
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check5"
          value="Masters"
          defaultChecked={checkHandle("education", "Masters")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check5">
          Masters
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="education"
          id="check6"
          value="Phd"
          defaultChecked={checkHandle("education", "Phd")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check6">
          Phd
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Experience</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check7"
          value="No Experience"
          defaultChecked={checkHandle("experience", "No Experience")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check7">
          No Experience
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check8"
          value="1 Years"
          defaultChecked={checkHandle("experience", "1 Years")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check8">
          1 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check9"
          value="2 Years"
          defaultChecked={checkHandle("experience", "2 Years")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check9">
          2 Years
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="experience"
          id="check10"
          value="3 Years above"
          defaultChecked={checkHandle("experience", "3 Years above")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check10">
          3 Year+
        </label>
      </div>

      <hr />
      <h5 className="mb-3">Salary Range</h5>
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check11"
          value="1-50000"
          defaultChecked={checkHandle("salary", "1-50000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check11">
          $1 - $50000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check12"
          value="50000-100000"
          defaultChecked={checkHandle("salary", "50000-100000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check12">
          $50000 - $100,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check13"
          value="100000-200000"
          defaultChecked={checkHandle("salary", "100000-200000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check13">
          $100,000 - $200,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="defaultCheck2"
          value="300000-500000"
          defaultChecked={checkHandle("salary", "300000-500000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="defaultCheck2">
          $300,000 - $500,000
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name="salary"
          id="check14"
          value="500000-1000000"
          defaultChecked={checkHandle("salary", "500000-1000000")}
          onClick={(e) => handleClick(e.target)}
        />
        <label className="form-check-label" htmlFor="check14">
          $500,000 - $1,000,000
        </label>
      </div>

      <hr />
    </div>
  );
};

export default Filters;