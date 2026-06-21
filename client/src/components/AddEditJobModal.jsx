import { useEffect, useState } from "react";
import { createJob, updateJob } from "../services/jobServices";

export const AddEditJobModal = ({ onClose, mode, job, refetch }) => {
  const [jobForm, setJobForm] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    min_salary: "",
    max_salary: "",
    company_name: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const selectType = (e) => {
    setJobForm((current) => ({ ...current, type: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      jobForm.company_name.length === 0 ||
      jobForm.title.length === 0 ||
      jobForm.description.length === 0 ||
      jobForm.type.length === 0 ||
      jobForm.location.length === 0 ||
      jobForm.min_salary.length === 0 ||
      jobForm.max_salary.length === 0
    ) {
      setError("All fields are mandatory");
      return;
    }
    try {
      setError("");
      setLoading(true);
      if (mode === "post") {
        await createJob(jobForm);
        refetch();
      } else if (mode === "edit") {
        await updateJob(job.id, jobForm);
        refetch();
      }
      onClose();
    } catch (error) {
      setError(error.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (job) {
      setJobForm(job);
    } else {
      setJobForm({
        title: "",
        description: "",
        type: "",
        location: "",
        min_salary: "",
        max_salary: "",
        company_name: "",
      });
    }
  }, [job]);

  return (
    <main className="modal-page position-fixed d-flex justify-content-center align-items-center ">
      <div className="card p-3 post-modal">
        <div className="d-flex justify-content-between align-itemcenter">
          <h4>{mode === "post" ? <>Post new Job</> : <>Edit Job</>}</h4>
          <i className="bi bi-x-circle ms-auto btn" onClick={onClose}></i>
        </div>
        {error && <span className="alert alert-danger">{error}</span>}
        <form className="d-flex flex-column gap-3 " onSubmit={handleSubmit}>
          <div>
            <label htmlFor="company-name">Company Name</label>
            <input
              type="text"
              id="company-name"
              className={`form-control ${error && " border-danger"}`}
              placeholder="e.g Paystack"
              value={jobForm.company_name}
              onChange={(e) =>
                setJobForm((current) => ({
                  ...current,
                  company_name: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="job-title">Job Title</label>
            <input
              type="text"
              id="job-title"
              className={`form-control ${error && " border-danger"}`}
              placeholder="e.g Senior Frontend Engineer"
              value={jobForm.title}
              onChange={(e) =>
                setJobForm((current) => ({ ...current, title: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="descritption"
              rows="4"
              className={`form-control ${error && " border-danger"}`}
              value={jobForm.description}
              onChange={(e) =>
                setJobForm((current) => ({
                  ...current,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="w-50">
              <label htmlFor="">Type</label>
              <select
                className={`form-select ${error && " border-danger"}`}
                value={jobForm.type}
                onChange={selectType}
              >
                <option value="">Choose Type</option>
                <option value="fulltime">Fulltime</option>
                <option value="part-time">Partime</option>
                <option value="contract">Contract</option>
              </select>
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                className={`form-control ${error && " border-danger"}`}
                placeholder="Lagos/Remote"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm((current) => ({
                    ...current,
                    location: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-between gap-3">
            <div className="w-100">
              <label htmlFor="min">Min Salary</label>
              <input
                type="number"
                id="min"
                className={`form-control ${error && " border-danger"}`}
                placeholder="300,000"
                value={jobForm.min_salary || ""}
                onChange={(e) =>
                  setJobForm((current) => ({
                    ...current,
                    min_salary: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-100">
              <label htmlFor="max">Max Salary</label>{" "}
              <input
                type="number"
                id="max"
                className={`form-control ${error && " border-danger"}`}
                placeholder="500,000"
                value={jobForm.max_salary || ""}
                onChange={(e) =>
                  setJobForm((current) => ({
                    ...current,
                    max_salary: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          {mode === "post" && (
            <button
              className="btn btn-secondary align-self-end"
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border"></span>
              ) : (
                <span>Post Job</span>
              )}
            </button>
          )}
          {mode === "edit" && (
            <div className="ms-auto d-flex gap-3">
              <button
                className="btn btn-outline-danger"
                type="button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button className="btn btn-secondary px-4">
                {loading ? (
                  <span className="spinner-border"></span>
                ) : (
                  <span>Edit Job</span>
                )}
              </button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};
