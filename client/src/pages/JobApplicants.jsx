import { useParams } from "react-router-dom";
import { getJobApplicants } from "../services/jobServices";
import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { ApplicantModal } from "../components/ApplicantModal";

export const JobApplicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [applicantModalOpen, setApplicantsModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  const viewApplicants = async (id) => {
    const response = await getJobApplicants(id);
    console.log(response.applicants);
    setApplicants(response.applicants);
  };

  useEffect(() => {
    try {
      viewApplicants(id);
    } catch (error) {}
  }, []);

  return (
    <>
      <div className="container py-5 d-flex flex-column gap-4">
        <header>
          <Navbar role="poster"></Navbar>
        </header>
        {applicants.length === 0 && (
          <div className="h-100 d-flex align-items-center justify-content-center">
            <h1>No Applicants yet for this job</h1>
          </div>
        )}
        {applicants.length !== 0 && (
          <section className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3">
              <h1>{applicants[0]?.title}</h1>
              <span>@</span> <h1>{applicants[0]?.company_name}</h1>
            </div>
            <section>
              <h3>Applicants</h3>
              <table className="table table-stripped ">
                <thead className="table-secondary">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Date Applied</th>
                    <th>Current Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="align-middle">
                  {applicants.map((item, index) => (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{dayjs(item.created_at).fromNow()}</td>
                      <td>{item.status}</td>
                      <td>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => {
                            setSelectedApplicant(item);
                            setApplicantsModalOpen(true);
                          }}
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </section>
        )}
        {applicantModalOpen && (
          <ApplicantModal
            applicant={selectedApplicant}
            onClose={() => setApplicantsModalOpen(false)}
          ></ApplicantModal>
        )}
      </div>
    </>
  );
};
