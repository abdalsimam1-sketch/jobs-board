const Router = require("express");
const jobsRouter = Router();
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  getPosterJobs,
} = require("../controllers/jobsControllers");

//create job
jobsRouter.post("/", auth, requireRole("poster"), createJob);

//get all jobs
jobsRouter.get("/", getAllJobs);

//get poster's jobs
jobsRouter.get("/poster-jobs", auth, requireRole("poster"), getPosterJobs);

//update job
jobsRouter.patch("/:id", auth, requireRole("poster"), updateJob);

//delete job
jobsRouter.delete("/:id", auth, requireRole("poster"), deleteJob);

module.exports = jobsRouter;
