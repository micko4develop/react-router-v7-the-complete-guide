import { Link, useLocation } from "react-router-dom";

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
      >
        Books
      </Link>
      <Link 
        to="/admin" 
        className={`nav-link ${location.pathname.startsWith("/admin") ? "active" : ""}`}
      >
        Admin
      </Link>
    </nav>
  );
}