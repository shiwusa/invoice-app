import { db } from "../db.js";

export const getInvoicesFromDB = (params, callback) => {
  const { status, page = 1, limit = 10 } = params;
  const offset = (page - 1) * limit;

  const countQuery = status
    ? `SELECT COUNT(*) as count FROM invoices WHERE status=?`
    : `SELECT COUNT(*) as count FROM invoices`;

  db.query(countQuery, [status], (err, countData) => {
    if (err) {
      console.log(err);
      return callback({ error: "Internal Server Error" });
    }
    const totalPages = Math.ceil(countData[0].count / limit);

    const q = status
      ? `SELECT * FROM invoices WHERE status=? LIMIT ${limit} OFFSET ${offset}`
      : `SELECT * FROM invoices LIMIT ${limit} OFFSET ${offset}`;

    db.query(q, [status], (err, data) => {
      if (err) {
        console.log(err);
        return callback({ error: "Internal Server Error" });
      }
      callback(null, { totalPages, data });
    });
  });
};

export const getInvoiceFromDB = (id, callback) => {
  const q =
    "SELECT i.id, `username`, `description`, `company`, `date`, `amount`, `requester`, `status`, `file` FROM users u JOIN invoices i ON u.id = i.user_id WHERE i.id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.log(err);
      return callback({ error: "Internal Server Error" });
    }
    callback(null, data[0]);
  });
};

export const addInvoiceToDB = (invoiceData, callback) => {
  const {
    company,
    amount,
    description,
    requester,
    date,
    status,
    file,
    userId,
  } = invoiceData;

  const q =
    "INSERT INTO invoices(`company`, `amount`, `description`, `requester`, `date`,`user_id`, `status`, `file`) VALUES (?)";

  const values = [
    company,
    amount,
    description,
    requester,
    date,
    userId,
    status,
    file,
  ];

  db.query(q, [values], (err) => {
    if (err) {
      console.log(err);
      return callback({ error: "Internal Server Error" });
    }
    callback(null, "Post has been created");
  });
};

export const deleteInvoiceFromDB = (invoiceId, userId, callback) => {
  const q = "DELETE FROM invoices WHERE `id` = ? AND `user_id` = ?";

  db.query(q, [invoiceId, userId], (err, data) => {
    if (err) {
      console.log(err);
      return callback({ error: "Internal Server Error" });
    }
    if (data.affectedRows === 0)
      return callback("You can delete only your invoices");
    callback(null, "Post has been deleted");
  });
};

export const updateInvoiceInDB = (invoiceId, userId, invoiceData, callback) => {
  const { company, amount, description, requester, status, file } = invoiceData;

  const q =
    "UPDATE invoices SET `company`=?, `amount`=?, `description`=?, `requester`=?, `status`=?, `file`=? WHERE `id`=? AND `user_id`=?";

  const values = [company, amount, description, requester, status, file];

  db.query(q, [...values, invoiceId, userId], (err) => {
    if (err) {
      console.log(err);
      return callback({ error: "Internal Server Error" });
    }
    callback(null, "Post has been updated");
  });
};
