import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const allowedOrigins = [process.env.CORS_ORIGIN || "http://localhost:5173", "https://your-production-domain.com"];

export const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`); 
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default cors(corsOptions);
