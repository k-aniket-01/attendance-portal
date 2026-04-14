import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="nav-left">Attendance Portal</div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/timesheet">Timesheet</Link>
        <Link to="/leave">Leave</Link>
      </div>

      <button onClick={logout} className="logout-btn">Logout</button>
    </div>
  );
}

export default Navbar;