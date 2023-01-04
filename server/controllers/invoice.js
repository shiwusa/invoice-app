import {db} from "../db.js";
import jwt from "jsonwebtoken";

export const getInvoices = (req, res) => {
    const q = req.query.status
        ? "SELECT * FROM invoices WHERE status=?"
        : "SELECT * FROM invoices";

    db.query(q, [req.query.status], (err, data) => {
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    })
};

export const getInvoice = (req, res) => {
    const q =
        "SELECT i.id, `username`, `desc`, `company`, `date`, `amount`, `requester`, `status`, `file` FROM users u JOIN invoices i ON u.id = i.uid WHERE i.id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

export const addInvoice = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q =
            "INSERT INTO invoices(`company`, `amount`, `desc`, `requester`, `date`,`uid`, `status`, `file`) VALUES (?)";

        const values = [
            req.body.company,
            req.body.amount,
            req.body.desc,
            req.body.requester,
            req.body.date,
            userInfo.id,
            req.body.status,
            req.body.file,
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been created");
        });
    });
};

export const deleteInvoice = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const invoiceId = req.params.id;
        const q = "DELETE FROM invoices WHERE `id` = ? AND `uid` = ?";

        db.query(q, [invoiceId, userInfo.id], (err, data) => {
            if (err) return res.status(403).json("You can delete only your invoices");
            return res.json("Post has been deleted");
        });
    });
};

export const updateInvoice = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const invoiceId = req.params.id;

        const q =
            "INSERT INTO invoices SET `company`=?, `amount`=?, `desc`=?, `requester`=?, `status`=?, `file`=? WHERE `id`=? AND `uid`=?";

        const values = [
            req.body.company,
            req.body.amount,
            req.body.desc,
            req.body.requester,
            req.body.status,
            req.body.file,
        ];

        db.query(q, [...values, invoiceId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been updated");
        });
    });
};