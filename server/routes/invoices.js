import express from "express";
import {addInvoice, deleteInvoice, getInvoice, getInvoices, updateInvoice} from "../controllers/invoice.js";

const router = express.Router();

router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.post("/", addInvoice);
router.delete("/:id", deleteInvoice);
router.put("/:id", updateInvoice);

export default router;