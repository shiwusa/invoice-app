import mysql from "mysql";
import config from "./config.js";

export const db = mysql.createPool({
  connectionLimit: 10,
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

const createDatabase = () => {
  return new Promise((resolve, reject) => {
    db.query(`CREATE DATABASE IF NOT EXISTS ${config.db.database}`, (err) => {
      if (err) reject(err);
      else {
        console.log(`Database ${config.db.database} created or already exists`);
        resolve();
      }
    });
  });
};

const changeDatabase = () => {
  return new Promise((resolve, reject) => {
    db.changeUser({ database: config.db.database }, (err) => {
      if (err) reject(err);
      else {
        console.log(`Using database ${config.db.database}`);
        resolve();
      }
    });
  });
};

const createUsersTable = () => {
  const createUsersQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  return new Promise((resolve, reject) => {
    db.query(createUsersQuery, (err) => {
      if (err) reject(err);
      else {
        console.log('Table "users" created or already exists');
        resolve();
      }
    });
  });
};

const createInvoicesTable = () => {
  const createInvoicesQuery = `
    CREATE TABLE IF NOT EXISTS invoices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company TEXT,
      amount FLOAT,
      description TEXT,
      requester TEXT,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id INT,
      status TEXT,
      file VARCHAR(255),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `;

  return new Promise((resolve, reject) => {
    db.query(createInvoicesQuery, (err) => {
      if (err) reject(err);
      else {
        console.log('Table "invoices" created or already exists');
        resolve();
      }
    });
  });
};

export const initializeDatabase = async () => {
  try {
    const connection = await new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) reject(err);
        else resolve(connection);
      });
    });

    await createDatabase();
    await changeDatabase();
    await createUsersTable();
    await createInvoicesTable();

    connection.release();
    console.log("Database initialization completed.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};
