const pool = require("../config/connectDB");
const { BadRequest, NotFound, Forbidden } = require("../errors");

//apply to jobs
const apply = async (req, res) => {
  const { job_id, cover_letter } = req.body;
  const seeker_id = req.user.id;
  const existing = await pool.query(
    "select * from applications where job_id=$1 and seeker_id = $2",
    [job_id, seeker_id],
  );
  if (existing.rows.length > 0) {
    throw new BadRequest(
      "You have already applied for this role please wait until a verdist is reached ",
    );
  }
  await pool.query(
    "insert into applications(job_id,seeker_id,cover_letter) values($1,$2,$3)",
    [job_id, seeker_id, cover_letter],
  );
  res.status(200).json({ msg: "Application Successful" });
};

//get all my application
const getApps = async (req, res) => {
  const seeker_id = req.user.id;
  const apps = await pool.query(
    "select * from applications where seeker_id=$1",
    [seeker_id],
  );
  res.status(200).json({ applications: apps.rows });
};

//get all poster's applications
const reviewApps = async (req, res) => {
  const poster_id = req.user.id;
  const join = await pool.query(
    "select * from applications inner join jobs on applications.job_id=jobs.id where poster_id =$1",
    [poster_id],
  );
  const apps = join.rows;
  res.status(200).json({ apps });
};

//update an application
const updateApp = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const app = await pool.query("select * from applications where id=$1", [id]);
  if (app.rows.length < 1) {
    throw new NotFound("Application not found");
  }
  const job = await pool.query("select * from jobs where id=$1", [
    app.rows[0].job_id,
  ]);
  if (job.rows[0].poster_id !== req.user.id) {
    throw new Forbidden("You are only allowed to update your applications");
  }
  await pool.query("update  applications set status=$1 where id =$2", [
    status || app.rows[0].status,
    id,
  ]);
  res.status(200).json({ msg: "Application status updated" });
};

//delete an application
const deleteApp = async (req, res) => {
  const { id } = req.params;
  const existingApp = await pool.query(
    "select * from applications where id= $1",
    [id],
  );
  if (existingApp.rows.length < 1) {
    throw new NotFound("Application not found");
  }
  const app = existingApp.rows[0];
  if (app.seeker_id !== req.user.id) {
    throw new Forbidden("You can only delete your applications");
  }
  await pool.query("delete from applications where id=$1", [id]);
  res.status(200).json({ msg: "Application deleted" });
};

module.exports = { apply, getApps, reviewApps, updateApp, deleteApp };
