import { useEffect, useMemo, useState } from "react";
import { Navbar } from "../components/Navbar";
import { getPosterJobs, deleteJob } from "../services/jobServices";
import { getPosterApps } from "../services/appServices";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { AddEditJobModal } from "../components/AddEditJobModal";
import { useNavigate } from "react-router-dom";

export const PosterDashboard = () => {
  const [posterJobs, setPosterJobs] = useState([]);
  const [error, setError] = useState("");
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [posterApps, setPosterApps] = useState([]);
  const [deletingID, setDeletingID] = useState(null);
  const navigate = useNavigate();

  let jobsPosted = useMemo(() => {
    return posterJobs.length;
  }, [posterJobs]);

  let totalApplications = useMemo(() => {
    return posterApps.length;
  }, [posterApps]);

  const posterMetrics = [
    { name: "Total Applications", value: totalApplications },
    { name: "Jobs Posted", value: jobsPosted },
  ];
  const reviewApps = async () => {
    try {
      const response = await getPosterJobs();
      setPosterJobs(response.jobs);
    } catch (error) {
      setError(error.response?.data.msg);
    }
  };
  const viewApplications = async () => {
    const response = await getPosterApps();
    setPosterApps(response.apps);
  };
  const handleDelete = async (id) => {
    try {
      setDeletingID(id);
      const response = await deleteJob(id);
      reviewApps();
      viewApplications();
    } catch (error) {
      setError(error.response?.data.msg);
    } finally {
      setDeletingID(null);
    }
  };

  useEffect(() => {
    reviewApps();
    viewApplications();
  }, []);

  return (
    <div className="container py-5 d-flex flex-column gap-4">
      <section>
        <Navbar role="poster"></Navbar>
      </section>
      <h1>Poster Dashboard</h1>
      <section className="row g-3 poster-metrics">
        {posterMetrics.map((item, index) => (
          <div className="col-12 col-md-4" key={index}>
            <div className="card p-3">
              <h1>{item.value}</h1>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </section>
      <section className="apps-sections">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5>Recent Activity</h5>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedJob(null);
              setPostModalOpen(true);
            }}
          >
            Post new job
          </button>
        </div>
        <table className="table table-striped text-capitalize job-table">
          <thead className="table-secondary">
            <tr>
              <th className="">Job Title</th>
              <th className="d-none d-md-table-cell">Job Type</th>
              <th className="text-capitalize  d-none d-md-table-cell">
                Posted
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {posterJobs.map((item) => (
              <tr key={item.id} className="">
                <td>{item.title}</td>
                <td className="d-none d-md-table-cell">{item.type}</td>
                <td className="text-capitalize  d-none d-md-table-cell">
                  {dayjs(item.created_at).fromNow()}
                </td>
                <td>
                  <span className="d-flex text-nowrap gap-3">
                    <button
                      className="bi bi-pencil-square btn btn-outline-dark"
                      onClick={() => {
                        setSelectedJob(item);
                        setPostModalOpen(true);
                      }}
                    ></button>
                    {deletingID !== item.id && (
                      <button
                        className="bi bi-trash btn btn-outline-danger"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      ></button>
                    )}
                    {deletingID === item.id && (
                      <span className="btn btn-danger spinner-border"></span>
                    )}
                    <button
                      className="btn btn-outline-secondary bi bi-person"
                      onClick={() => {
                        navigate(`/${item.id}/applicants`);
                      }}
                    ></button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {postModalOpen && (
        <div>
          {" "}
          <AddEditJobModal
            job={selectedJob}
            onClose={() => {
              setPostModalOpen(false);
              setSelectedJob(null);
            }}
            mode={selectedJob ? "edit" : "post"}
            refetch={() => {
              reviewApps();
              viewApplications();
            }}
          ></AddEditJobModal>
        </div>
      )}
    </div>
  );
};
