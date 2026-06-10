const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const testConnection = async () => {
  try {
    const res = await pool.query("select now()");
    console.log("Database Connected : ", res.rows[0].now);
  } catch (error) {
    console.error("Database connection error : ", error);
  }
};

testConnection();

module.exports = pool;
