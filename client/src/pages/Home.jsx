import { Navbar } from "../components/Navbar";
import { useFilters } from "../hooks/useFilters";
import { JobCard } from "../components/JobCard";

export const Home = () => {
  const { searchForm, setSearchForm, SEARCH, FILTERS, jobs } = useFilters();
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
        <form className="d-flex flex-column gap-3 flex-md-row">
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
          <button key={item.name} className="btn text-capitalize btn-secondary">
            {item.name}
          </button>
        ))}
      </section>

      <section className="jobs">
        <div className="row g-4">
          {jobs.map((item) => (
            <div className="col-12 col-md-6 col-lg-4">
              <JobCard job={item}></JobCard>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
