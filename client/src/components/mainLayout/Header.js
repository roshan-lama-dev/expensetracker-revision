import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
export const Header = () => {
  // we use state to get the user id and name,
  // This is done so that the we can find whether the use is loggged in or not and accordingly we will display the appropriate tabs i the header field
  const [user, setUser] = useState({});
  useEffect(() => {
    const str = sessionStorage.getItem("user");
    if (str) {
      setUser(JSON.parse(str));
      console.log(user);
    }
  }, []);
  const handelLogOut = () => {
    sessionStorage.removeItem("user");
  };

  return (
    <Navbar bg="success" expand="md" color="white">
      <Container>
        <Navbar.Brand href="#">Expense Tracker </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?._id ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
                <Link to="/" className="nav-link" onClick={handelLogOut}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
