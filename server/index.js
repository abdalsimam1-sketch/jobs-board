require("dotenv/config");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const app = express();
const pool = require("./config/connectDB");

const errorHandler = require("./middleware/errorHandler");
const routeNotFound = require("./middleware/notFound");

const authRouter = require("./routes/authRoutes");
const jobsRouter = require("./routes/jobsRoutes");

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());

//security
app.use(cors());
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

//errors
app.use(routeNotFound);
app.use(errorHandler);

//start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}....`);
});
