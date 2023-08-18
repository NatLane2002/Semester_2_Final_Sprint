import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Header = () => {
  const { loggedIn } = useAuth();
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <div>
        <header>
          <nav>
            <div className="headingTitle">Nocturnal Narratives</div>
            <Link
              className={isActiveLink("/") ? "selected link" : "link"}
              to="/"
            >
              Home
            </Link>
            <Link
              className={
                isActiveLink("/login") || isActiveLink("/register")
                  ? "selected link"
                  : "link"
              }
              to="/login"
            >
              Login/
              <br />
              Register
            </Link>
            <Link
              className={isActiveLink("/dreamlist") ? "selected link" : "link"}
              to="/dreamlist"
            >
              Dream
              <br />
              Hub
            </Link>
            {loggedIn && (
              <>
                <Link
                  className={
                    isActiveLink("/adddream") ? "selected link" : "link"
                  }
                  to="/adddream"
                >
                  Add
                  <br />
                  Dream
                </Link>
                <Link
                  className={
                    isActiveLink("/profile") ? "selected link" : "link"
                  }
                  to="/profile"
                >
                  Profile
                </Link>
              </>
            )}
          </nav>
        </header>
      </div>
    </>
  );
};

export default Header;
