const pool = require("../config/connectDB");
const { BadRequest, Forbidden, NotFound } = require("../errors");

//create job
const createJob = async (req, res) => {
  const {
    title,
    description,
    location,
    type,
    min_salary,
    max_salary,
    company_name,
  } = req.body;
  const poster_id = req.user.id;

  if (!title) {
    throw new BadRequest("Title is a required field");
  }

  const job = await pool.query(
    "insert into jobs(title,description,location,type,min_salary,max_salary,poster_id,company_name) values($1,$2,$3,$4,$5,$6,$7,$8) returning * ",
    [
      title,
      description,
      location,
      type,
      min_salary,
      max_salary,
      poster_id,
      company_name,
    ],
  );

  res.status(200).json({ msg: "Job created sucessfully", job: job.rows[0] });
};

//get all jobs
const getAllJobs = async (req, res) => {
  const { type, location, search, min_salary, max_salary } = req.query;

  const conditions = [];
  const values = [];
  let count = 1;

  if (type) {
    conditions.push(`type=$${count}`);
    values.push(type);
    count++;
  }
  if (location) {
    conditions.push(`location ILIKE $${count}`);
    values.push(`%${location}%`);
    count++;
  }
  if (search) {
    conditions.push(`(title ILIKE $${count} OR description ILIKE $${count})`);
    values.push(`%${search}%`);
    count++;
  }
  if (min_salary) {
    conditions.push(`min_salary>=$${count}`);
    values.push(min_salary);
    count++;
  }
  if (max_salary) {
    conditions.push(`max_salary<=$${count}`);
    values.push(max_salary);
    count++;
  }

  const query =
    conditions.length > 0 ? ` where ${conditions.join(" and ")}` : "";

  const jobs = await pool.query(`select * from jobs  ${query}`, values);
  res.status(200).json({ jobs: jobs.rows });
};

const getPosterJobs = async (req, res) => {
  const poster_id = req.user.id;
  const jobs = await pool.query(" select * from jobs where poster_id=$1", [
    poster_id,
  ]);
  res.status(200).json({ jobs: jobs.rows });
};

//update job
const updateJob = async (req, res) => {
  const {
    company_name,
    title,
    description,
    location,
    type,
    min_salary,
    max_salary,
  } = req.body;
  const id = req.params.id;
  const exsitingJob = await pool.query("select * from jobs where id=$1", [id]);
  if (exsitingJob.rows.length < 1) {
    throw new NotFound("Job not found");
  }
  const job = exsitingJob.rows[0];
  if (job.poster_id !== req.user.id) {
    throw new Forbidden("You can only update your own jobs");
  }

  const updatedJob = await pool.query(
    "update jobs set title=$1 ,description=$2,location=$3,type=$4 ,min_salary=$5,max_salary=$6 ,company_name=$7 where id=$8 returning *",
    [
      title || job.title,
      description || job.description,
      location || job.location,
      type || job.type,
      min_salary || job.min_salary,
      max_salary || job.max_salary,
      company_name || job.company_name,
      id,
    ],
  );
  res.status(200).json({ updatedJob: updatedJob.rows[0] });
};

//get job applicants
const getJobApplicants = async (req, res) => {
  const { id } = req.params;
  const poster_id = req.user.id;
  const applicants = await pool.query(
    "select * from applications inner join users on applications.seeker_id = users.id inner join jobs on applications.job_id= jobs.id where applications.job_id = $1 and jobs.poster_id=$2",
    [id, poster_id],
  );

  res.status(200).json({ applicants: applicants.rows });
};

//delete job
const deleteJob = async (req, res) => {
  const id = req.params.id;
  const job = await pool.query("select * from jobs where id=$1", [id]);

  if (job.rows.length < 1) {
    throw new NotFound("Job does not exist");
  }
  if (job.rows[0].poster_id !== req.user.id) {
    throw new Forbidden("You can only delete your own jobs");
  }
  await pool.query("delete  from jobs where id=$1 ", [id]);
  res.status(200).json({ msg: "Job deleted successfully" });
};

module.exports = {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getJobApplicants,
  getPosterJobs,
};
