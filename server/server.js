import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

// CORS SETTINGS (IMPORTANT)
app.use(
  cors({
    origin: "https://dentisttbo.netlify.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);


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
  const id = bookings.length + 1;
  const newBooking = { id, name, date, time };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

// Render 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
