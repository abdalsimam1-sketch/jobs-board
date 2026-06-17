export const JobCard = ({ job, onClick }) => {
  return (
    <div className="card p-3 h-100 cursor-pointer" onClick={onClick}>
      <div className="d-flex justify-content-between align-items-center">
        <h6>{job.company_name}</h6>
        <span className="rounded-pill border py-1 px-3 text-capitalize bg-secondary-subtle">
          {job.type}
        </span>
      </div>
      <div>
        <h5>{job.title}</h5>
      </div>
      <div className="d-flex gap-3">
        <span>
          <i className="bi bi-geo-alt"></i>
          <span className="text-nowrap">{job.location}</span>
        </span>
        <span>
          $<>{job.min_salary}</> - <>{job.max_salary} / mo</>
        </span>
      </div>
      <hr />

      <button className="btn btn-secondary w-100" onClick={onClick}>
        Apply now
      </button>
    </div>
  );
};
