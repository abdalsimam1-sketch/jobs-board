import { useEffect, useMemo, useState } from "react";
import { getApps } from "../services/appServices";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { Navbar } from "../components/Navbar";

export const SeekerDashboard = () => {
  const [apps, setApps] = useState([]);
  const fetchMyApps = async () => {
    const response = await getApps();
    console.log(response.applications);
    setApps(response.applications);
  };
  useEffect(() => {
    fetchMyApps();
  }, []);

  let totalApplied = useMemo(() => {
    return apps.length;
  }, [apps]);
  let pending = useMemo(() => {
    return apps.filter((item) => item.status === "pending").length;
  }, [apps]);
  let interview = useMemo(() => {
    return apps.filter((item) => item.status === "interview").length;
  }, [apps]);
  let rejected = useMemo(() => {
    return apps.filter((item) => item.status === "rejected").length;
  }, [apps]);

  const metrics = [
    { name: "Total Applied", value: totalApplied },
    { name: "Pending", value: pending },
    { name: "Interview", value: interview },
    { name: "Rejected", value: rejected },
  ];

  return (
    <div className="container py-5 d-flex flex-column gap-3">
      <section>
        <Navbar role="seeker"></Navbar>
      </section>
      <h1>Seeker Dashboard</h1>
      <section className="metrics-section row g-3">
        {metrics.map((item) => (
          <div key={item.name} className="col-6 col-md-3">
            <div className="card p-3">
              <h1>{item.value}</h1>
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </section>
      <section className="apps-section">
        <h5>Your Applications</h5>
        <table className="table table-striped rounded">
          <thead className="table-secondary ">
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th className="d-none d-md-table-cell">Type</th>
              <th className="d-none d-md-table-cell">Applied</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.company_name}</td>
                <td className="text-capitalize d-none d-md-table-cell">
                  {item.type}
                </td>
                <td className=" d-none d-md-table-cell">
                  {dayjs(item.created_at).fromNow()}
                </td>
                <td className="text-capitalize">
                  <span
                    className={`rounded-pill px-3 py-1 border ${item.status === "pending" && "bg-warning-subtle"} ${item.status === "interview" && "bg-success-subtle"} ${item.status === "rejected" && "bg-danger-subtle"}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
