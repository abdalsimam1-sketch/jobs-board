import { Navbar } from "../components/Navbar";
import { useFilters } from "../hooks/useFilters";
import { JobCard } from "../components/JobCard";
import { useEffect, useState } from "react";
import { getAllJobs } from "../services/jobServices";
import { ApplyModal } from "../components/ApplyModal";

export const Home = () => {
  const { searchForm, setSearchForm, SEARCH, FILTERS, filter, setFilter } =
    useFilters();
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs(
        filter,
        searchForm.location,
        searchForm.searchTerm,
      );
      setJobs(response.jobs);
    } catch (error) {
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  return (
    <div className="container mt-5 d-flex flex-column gap-4 pb-5">
      <section className="header">
        <Navbar role="seeker"></Navbar>
      </section>
      <section className="heading">
        <div className="text-center">
          <h2>Find your next role</h2>
          <span>Browse hundreds of jobs from top companies</span>
        </div>
      </section>
      <section className="search">
        <form
          className="d-flex flex-column gap-3 flex-md-row"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Job title,keyword..."
            value={searchForm.searchTerm}
            onChange={(e) =>
              setSearchForm((current) => ({
                ...current,
                searchTerm: e.target.value,
              }))
            }
          />
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            value={searchForm.location}
            onChange={(e) =>
              setSearchForm((current) => ({
                ...current,
                location: e.target.value,
              }))
            }
          />
          <button className="btn btn-secondary">Submit</button>
        </form>
      </section>
      <section className="filters"></section>
      <section className="d-flex gap-3">
        {FILTERS.map((item) => (
          <button
            key={item.name}
            className={`btn text-capitalize btn-secondary ${filter === item.value ? "active-filter" : ""}`}
            onClick={() => setFilter(item.value)}
          >
            {item.name}
          </button>
        ))}
      </section>

      <section className="jobs">
        <div className="row g-4">
          {jobs.map((item) => (
            <div className="col-12 col-md-6 col-lg-4 " key={item.id}>
              <JobCard
                job={item}
                onClick={() => {
                  setApplyModalOpen(true);
                  setSelectedJob(item);
                }}
              ></JobCard>
            </div>
          ))}

          {jobs.length < 1 && (
            <h1 className="text-center my-5">No jobs found in this category</h1>
          )}
        </div>
      </section>
      {applyModalOpen && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setApplyModalOpen(false)}
        ></ApplyModal>
      )}
    </div>
  );
};
