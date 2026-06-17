import { useState, useEffect } from "react";
import { createApp } from "../services/appServices";

export const ApplyModal = ({ job, onClose }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (coverLetter.length < 20) {
      setError("Cover Letter is too short please add something");
      return;
    }
    try {
      setLoading(true);
      const apply = await createApp({
        job_id: job.id,
        cover_letter: coverLetter,
      });
      onClose();
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setError("");
  }, [coverLetter]);

  return (
    <div className="modal-page d-flex justify-content-center align-items-center position-fixed z-1 ">
      <div className="card p-3 apply-modal">
        <span className="d-flex gap-3 align-items-center">
          <i className="bi bi-arrow-left btn" onClick={onClose}></i>
          <span>Back</span>
        </span>

        <span className="d-flex flex-column">
          <h1>{job.title}</h1>

          <span className="fw-bold">
            <>{job.company_name}</> . <>{job.location}</>
          </span>
          <span className="d-flex gap-2 text-nowrap">
            <span className="text-capitalize rounded-pill border  py-1 px-3 bg-primary-subtle">
              {job.type}
            </span>
            <span className="rounded-pill border py-1 px-3 bg-secondary-subtle">
              <>N{job.min_salary}</> - <>{job.max_salary}</>
            </span>
            <span className="rounded-pill border py-1 px-3 bg-success-subtle">
              {job.created_at}
            </span>
          </span>
        </span>
        <div className="d-flex flex-column mt-3">
          <span className="fw-bold">About the role</span>
          <span>{job.description}</span>
        </div>
        <div className="mt-3">
          <section>
            <label className="form-label fw-bold" htmlFor="cover-letter">
              Cover Letter
            </label>
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <div className="d-flex flex-column ">
                {error && (
                  <span className="text-danger fw-bold align-self-end">
                    {error}
                  </span>
                )}
                <textarea
                  id="cover-letter"
                  className="form-control"
                  rows="5"
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                ></textarea>
              </div>
              <div className="d-flex gap-3 justify-content-end">
                <button
                  className="btn  btn-danger"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button className="btn btn-secondary " disabled={loading}>
                  {!loading && <span>Submit Application</span>}
                  {loading && <span className="spinner-border"></span>}
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
