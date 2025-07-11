import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middleware/error.middleware";
import inboundRoutes from "./routes/inbound";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://inbox-hire.vercel.app"
      : "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("InboxHire API is running!");
});

// Routes
app.use("/api/inbound", inboundRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
