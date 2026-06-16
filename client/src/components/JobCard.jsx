export const JobCard = ({ job }) => {
  return (
    <div className="card p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h6>{job.company_name}</h6>
        <span className="rounded-pill border p-2">{job.type}</span>
      </div>
      <div>
        <h5>{job.title}</h5>
      </div>
      <div className="d-flex gap-3">
        <span>
          <i className="bi bi-geo-alt"></i>
          <span>{job.location}</span>
        </span>
        <span>
          $<>{job.min_salary}</>-<>{job.max_salary}</>
        </span>
      </div>
      <hr />

      <button className="btn btn-secondary w-100">Apply now</button>
    </div>
  );
};
