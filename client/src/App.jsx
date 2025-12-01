import { useEffect, useState } from "react";

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", time: "" });

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: "", date: "", time: "" });
        fetchBookings();
      }
    } catch (err) {
      console.error("Failed to create booking:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-50 p-8">
      <h1 className="text-5xl font-extrabold text-center text-purple-700 mb-10">
        🦷 BOOK YOUR NEXT APPOINTMENT
      </h1>

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      {/* Booking Form */}
        <form className="mb-8 space-y-4" onSubmit={handleSubmit}>
          <input
            className="border-2 border-purple-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 rounded-lg p-3 w-full transition"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="date"
            className="border-2 border-purple-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 rounded-lg p-3 w-full transition"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <input
            type="time"
            className="border-2 border-purple-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-300 rounded-lg p-3 w-full transition"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg w-full transition duration-300"
          >
            Book Appointment
          </button>
        </form>

        
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Upcoming Bookings</h2>
        <ul className="space-y-3">
          {bookings.length === 0 && (
            <li className="text-gray-500 italic">No bookings yet</li>
          )}
          {bookings.map((b) => (
            <li
              key={b.id}
              className="flex justify-between items-center p-4 border rounded-lg shadow-sm bg-purple-50 hover:bg-purple-100 transition"
            >
              <span className="font-medium text-purple-700">{b.name}</span>
              <span className="text-gray-600">{b.date} at {b.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
