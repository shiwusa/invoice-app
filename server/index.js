import express from "express";
import invoiceRoutes from "./routes/invoices.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use("/api/invoices", invoiceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(8800, () => {
    console.log("Connected");
});