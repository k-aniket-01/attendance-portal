import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Timesheet() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/api/timesheet/")
      .then((res) => setData(res.data))
      .catch(() => alert("Error fetching data"));
  }, []);

  // ✅ Format full datetime (Check-in / Check-out)
  const formatDateTime = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Format only date
  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Timesheet</h2>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{formatDate(item.date)}</td>
                  <td>{formatDateTime(item.check_in)}</td>
                  <td>{formatDateTime(item.check_out)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Timesheet;