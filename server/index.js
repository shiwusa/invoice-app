import express from "express";
import invoiceRoutes from "./routes/invoices.js";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import config from "./config.js";
import "./db.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: "../client/public/upload",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${fileExtension}`);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/invoices", invoiceRoutes);
app.use("/api/auth", authRoutes);

app.listen(config.port, config.hostname, () => {
  console.log(`Connected on ${config.hostname}:${config.port}`);
});
