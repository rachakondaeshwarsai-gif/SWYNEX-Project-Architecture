require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');

const port = Number(process.env.PORT || 3000);

async function start() {
  try {
    const connection = await pool.getConnection();
    connection.release();
    app.listen(port, '0.0.0.0', () => { console.log(`API listening at http://localhost:${port}`); });
  } catch (err) {
    console.error('Could not connect to MySQL. Check your .env settings and database service.', err.message);
    process.exit(1);
  }
}

start();
