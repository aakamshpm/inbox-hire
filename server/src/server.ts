import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/error.middleware";
import inboundRoutes from "./routes/inbound";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("InboxHire API is running!");
});

// Routes
app.use("/api/inbound", inboundRoutes);
app.use("/api/auth", authRoutes);

// middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
