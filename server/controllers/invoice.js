import {db} from "../db.js";

export const getInvoices = (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const offset = (page - 1) * limit;

    const countQuery = req.query.status
        ? `SELECT COUNT(*) as count FROM invoices WHERE status=?`
        : `SELECT COUNT(*) as count FROM invoices`;

    db.query(countQuery, [req.query.status], (err, countData) => {
        if (err) return res.status(500).send(err);
        const totalPages = Math.ceil(countData[0].count / limit);

        const q = req.query.status
            ? `SELECT * FROM invoices WHERE status=? LIMIT ${limit} OFFSET ${offset}`
            : `SELECT * FROM invoices LIMIT ${limit} OFFSET ${offset}`;

        db.query(q, [req.query.status], (err, data) => {
            if (err) return res.status(500).send(err);
            return res.status(200).set({'x-total-pages': totalPages}).json(data);
        })
    });
};


export const getInvoice = (req, res) => {
    const q =
        "SELECT i.id, `username`, `description`, `company`, `date`, `amount`, `requester`, `status`, `file` FROM users u JOIN invoices i ON u.id = i.user_id WHERE i.id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

export const addInvoice = (req, res) => {
    const userInfo = req.userId;

    const q =
        "INSERT INTO invoices(`company`, `amount`, `description`, `requester`, `date`,`user_id`, `status`, `file`) VALUES (?)";

    const values = [
        req.body.company,
        req.body.amount,
        req.body.description,
        req.body.requester,
        req.body.date,
        userInfo,
        req.body.status,
        req.body.file,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been created");
    });
};

export const deleteInvoice = (req, res) => {
    const userInfo = req.userId;

    const invoiceId = req.params.id;
    const q = "DELETE FROM invoices WHERE `id` = ? AND `user_id` = ?";

    db.query(q, [invoiceId, userInfo], (err, data) => {
        if (err) return res.status(403).json("You can delete only your invoices");
        return res.json("Post has been deleted");
    });
};

export const updateInvoice = (req, res) => {
    const userInfo = req.userId;

    const invoiceId = req.params.id;

    const q =
        "UPDATE invoices SET `company`=?, `amount`=?, `description`=?, `requester`=?, `status`=?, `file`=? WHERE `id`=? AND `user_id`=?";

    const values = [
        req.body.company,
        req.body.amount,
        req.body.description,
        req.body.requester,
        req.body.status,
        req.body.file,
    ];

    db.query(q, [...values, invoiceId, userInfo], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json("Post has been updated");
    });
};
