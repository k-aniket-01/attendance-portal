import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get("/api/leaves/")
      .then((res) => setLeaves(res.data))
      .catch(() => console.log("Error fetching leaves"));
  }, []);

  const checkIn = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await API.post("/api/checkin/");
      alert(res.data.message);   // ✅ success only
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error";
      alert(errorMsg);           // ✅ backend error shown
    } finally {
      setLoading(false);
    }
  };

  const checkOut = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await API.post("/api/checkout/");
      alert(res.data.message);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Error";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">

        <h2>Dashboard</h2>

        <div className="btn-group">
          <button onClick={checkIn} disabled={loading}>
            {loading ? "Processing..." : "Check In"}
          </button>

          <button onClick={checkOut} disabled={loading}>
            {loading ? "Processing..." : "Check Out"}
          </button>
        </div>

        <h3>Leave Requests</h3>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Start</th>
                <th>End</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {leaves.map((l, i) => (
                <tr key={i}>
                  <td>{l.start_date}</td>
                  <td>{l.end_date}</td>
                  <td>{l.leave_type}</td>
                  <td>{l.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}

export default Dashboard;