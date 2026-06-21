import { useState } from "react";
import { updateApplication } from "../services/appServices";

export const ApplicantModal = ({ applicant, onClose }) => {
  const [status, setStatus] = useState(applicant.status);
  const [showAlert, setShowAlert] = useState(false);
  return (
    <div className="modal-page d-flex justify-content-center align-items-center position-fixed ">
      <div
        className="card p-4 applicant-modal"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <i className="bi bi-x-circle ms-auto btn" onClick={onClose}></i>
        <section className="d-flex flex-column gap-3">
          <div>
            <h5> {applicant.title}</h5>
            <h4>{applicant.username}</h4>
          </div>
          <div>
            <h5>Email</h5>
            <span>{applicant.email}</span>
          </div>

          <div>
            {" "}
            <h5>Applied On</h5>
            <span>{applicant.created_at}</span>
          </div>
          <div>
            <h5>Current Status</h5>
            <span>{applicant.status}</span>
          </div>
          <div>
            <h5> Cover Letter</h5>
            <span>{applicant.cover_letter}</span>
          </div>
          {showAlert && (
            <div className="alert alert-success">Status Updated</div>
          )}
          <div>
            <h5>Review Application</h5>

            <div className="d-flex gap-3">
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  setStatus("interview");
                  updateApplication(applicant.application_id, {
                    status: "interview",
                  });
                  setShowAlert(true);
                  setTimeout(() => {
                    onClose();
                  }, 1000);
                }}
              >
                Accept
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => {
                  setStatus("rejected");
                  updateApplication(applicant.application_id, {
                    status: "rejected",
                  });
                  setShowAlert(true);
                  setTimeout(() => {
                    onClose();
                  }, 1000);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
