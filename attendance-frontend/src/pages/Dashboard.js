import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Loading...");

  // Fetch Leaves
  const fetchLeaves = () => {
    API.get("/api/leaves/")
      .then((res) => setLeaves(res.data))
      .catch(() => console.log("Error fetching leaves"));
  };

  // Fetch Status
  const fetchStatus = () => {
    API.get("/api/today-status/")
      .then((res) => setStatus(res.data.status))
      .catch(() => setStatus("Not Checked In"));
  };

  useEffect(() => {
    fetchLeaves();
    fetchStatus();
  }, []);

  // Check In
  const checkIn = async () => {
    setLoading(true);
    try {
      const res = await API.post("/api/check-in/");
      alert(res.data.message);
      fetchStatus();
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    } finally {
      setLoading(false);
    }
  };

  // Check Out
  const checkOut = async () => {
    setLoading(true);
    try {
      const res = await API.post("/api/check-out/");
      alert(res.data.message);
      fetchStatus();
    } catch (err) {
      alert(err.response?.data?.error || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Dashboard</h2>

        {/* STATUS */}
        <div className="status-card">
          <h3>Today's Status</h3>
          <p className="status-text">{status}</p>
        </div>

        {/* BUTTONS (NO DISABLE) */}
        <div className="btn-group">
          <button className="btn checkin" onClick={checkIn}>
            {loading ? "Processing..." : "Check In"}
          </button>

          <button className="btn checkout" onClick={checkOut}>
            {loading ? "Processing..." : "Check Out"}
          </button>
        </div>

        {/* LEAVE REQUESTS */}
        <div className="table-card">
          <div className="table-header">
            <h3>Leave Requests</h3>
          </div>

          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Type</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="4">No leave records</td>
                  </tr>
                ) : (
                  leaves.map((l, i) => (
                    <tr key={i}>
                      <td>{l.start_date}</td>
                      <td>{l.end_date}</td>
                      <td>{l.leave_type}</td>
                      <td className={`status ${l.status.toLowerCase()}`}>
                        {l.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;