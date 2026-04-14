import { useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Leave() {
  const [form, setForm] = useState({
    start_date: "",
    end_date: "",
    leave_type: "",
    reason: "",
  });

  const handleSubmit = async () => {
    try {
      await API.post("/api/leave/", form);
      alert("Leave applied!");
    } catch {
      alert("Error submitting leave");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Apply Leave</h2>

        <input type="date" onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
        <input type="date" onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
        <input placeholder="Leave Type" onChange={(e) => setForm({ ...form, leave_type: e.target.value })} />
        <textarea placeholder="Reason" onChange={(e) => setForm({ ...form, reason: e.target.value })}></textarea>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}

export default Leave;