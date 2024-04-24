import express from "express";
import cors from "cors";

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://picpulse.vercel.app"];
app.use(
  cors({
    origin: function (origin, callback) {
      // Check if the request origin is included in the allowed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.send("Server running")
})

import adminRouetr from "./routes/admin.route.js"
app.use("/api/v1/admin/hospital",adminRouetr)

import authRouter from "./routes/auth.route.js"
app.use("/api/v1/hospital",authRouter)

export {app}
