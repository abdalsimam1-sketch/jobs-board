const Router = require("express");
const appsRouter = Router();
const {
  apply,
  getApps,
  reviewApps,
  updateApp,
  deleteApp,
} = require("../controllers/appsControllers");
const auth = require("../middleware/auth");
const requireRole = require("../middleware/requireRole");

appsRouter.use(auth);

//apply to jobs
appsRouter.post("/apply", requireRole("seeker"), apply);

//get all my application
appsRouter.get("/", requireRole("seeker"), getApps);

//get all poster's applications
appsRouter.get("/review", requireRole("poster"), reviewApps);

//update an application
appsRouter.patch("/:id", requireRole("poster"), updateApp);

//delete a application
appsRouter.delete("/:id", requireRole("seeker"), deleteApp);

module.exports = appsRouter;
