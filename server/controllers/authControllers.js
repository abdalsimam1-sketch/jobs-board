const { BadRequest, Unauthorized } = require("../errors");
const pool = require("../config/connectDB");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  // fields validation
  if (!username || !email || !password || !role) {
    throw new BadRequest("Invalid credentials");
  }
  // check if user exists
  const user = await pool.query(
    "select * from users where email=$1 or username=$2",
    [email, username],
  );
  if (user.rows.length > 0) {
    throw new BadRequest("User already exists ");
  }

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const createUser = await pool.query(
    "insert into users(username,email,password,role) values($1,$2,$3,$4) returning id,role",
    [username, email, hashedPassword, role],
  );
  const { id } = createUser.rows[0];
  const payload = { id, role };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(201).json({
    msg: "User created successfully",
    token,
    user: { id, role },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //validate fields
  if (!email || !password) {
    throw new BadRequest("All fields are required");
  }

  //check if user exists
  const user = await pool.query("select * from users where email=$1  ", [
    email,
  ]);
  if (user.rows.length < 1) {
    throw new BadRequest("User does not exist");
  }

  //compare password
  const savedPassword = user.rows[0].password;
  const comparePassword = await bcrypt.compare(password, savedPassword);
  if (!comparePassword) {
    throw new Unauthorized("Wrong password");
  }
  // generate jwt
  const { id, role } = user.rows[0];
  const payload = { id, role };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  res.status(200).json({
    msg: "Login Successful",
    token,
    user: { id, role },
  });
};

module.exports = { register, login };
