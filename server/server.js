import express from "express";
import cors from "cors";

const app = express();

// ✅ ENABLE CORS FIRST (very important)
app.use(
  cors({
    origin: [
      "https://dentisttbo.netlify.app",  // your frontend
      "https://dentist-booking-api.onrender.com"  // render backend (health checks)
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Handles preflight requests (Fixes POST blocked by CORS)
app.options("*", cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

// In-memory storage
let bookings = [];

// GET bookings
app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// POST bookings
app.post("/api/bookings", (req, res) => {
  const { name, date, time } = req.body;

  if (!name || !date || !time) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const id = bookings.length + 1;
  const newBooking = { id, name, date, time };
  bookings.push(newBooking);

  return res.status(201).json(newBooking);
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
