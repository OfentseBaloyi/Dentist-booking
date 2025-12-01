import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let bookings = [];

app.get('/api/bookings', (req, res) => {
  res.json(bookings);
});

app.post('/api/bookings', (req, res) => {
  const { name, date, time } = req.body;
  const id = bookings.length + 1;
  const newBooking = { id, name, date, time };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
