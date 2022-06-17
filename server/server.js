import express from "express";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import foundItemRoutes from "./routes/foundItem.routes.js";
import userRoutes from "./routes/user.routes.js";

import cors from "cors";

const app = express();
const port = process.env.PORT || process.env.DEV_PORT;

import "./db/conn.js";

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/foundItem", foundItemRoutes);
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`);
});
