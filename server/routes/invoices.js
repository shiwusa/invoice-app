import express from "express";
import {
  addInvoice,
  deleteInvoice,
  getInvoice,
  getInvoices,
  updateInvoice,
} from "../controllers/invoice.js";
import { verifyToken } from "../controllers/auth.js";

const router = express.Router();

router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.post("/", verifyToken, addInvoice);
router.delete("/:id", verifyToken, deleteInvoice);
router.put("/:id", verifyToken, updateInvoice);

export default router;
