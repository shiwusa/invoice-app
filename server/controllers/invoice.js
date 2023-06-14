import {
  addInvoiceToDB,
  deleteInvoiceFromDB,
  getInvoiceFromDB,
  getInvoicesFromDB,
  getStatisticsFromDB,
  updateInvoiceInDB,
} from "../services/invoiceService.js";

export const getInvoices = (req, res) => {
  const params = {
    status: req.query.status,
    page: req.query.page,
    limit: req.query.limit,
  };

  getInvoicesFromDB(params, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const { totalPages, data } = result;
    return res.status(200).set({ "x-total-pages": totalPages }).json(data);
  });
};

export const getStatistics = (req, res) => {
  const chartId = req.params.id;
  getStatisticsFromDB(chartId, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(data);
  });
};

export const getInvoice = (req, res) => {
  const invoiceId = req.params.id;
  getInvoiceFromDB(invoiceId, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.status(200).json(data);
  });
};

export const addInvoice = (req, res) => {
  const invoiceData = {
    company: req.body.company,
    amount: req.body.amount,
    description: req.body.description,
    requester: req.body.requester,
    date: req.body.date,
    status: req.body.status,
    file: req.body.file,
    userId: req.userId,
  };

  addInvoiceToDB(invoiceData, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(result);
  });
};

export const deleteInvoice = (req, res) => {
  const invoiceId = req.params.id;
  const userId = req.userId;

  deleteInvoiceFromDB(invoiceId, userId, (err, result) => {
    if (err) return res.status(403).json({ error: "Access denied" });
    return res.json(result);
  });
};

export const updateInvoice = (req, res) => {
  const invoiceId = req.params.id;
  const userId = req.userId;

  const invoiceData = {
    company: req.body.company,
    amount: req.body.amount,
    description: req.body.description,
    requester: req.body.requester,
    status: req.body.status,
    file: req.body.file,
  };

  updateInvoiceInDB(invoiceId, userId, invoiceData, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    return res.json(result);
  });
};
