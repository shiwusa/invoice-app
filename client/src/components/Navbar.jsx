import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LinkList = ({ links }) => {
  return (
    <>
      {links.map((link, index) => (
        <Link key={index} className="link" to={link.to}>
          <h6>{link.label}</h6>
        </Link>
      ))}
    </>
  );
};

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  const links = [
    { label: "Approved", to: "/?status=appr" },
    { label: "Cancel", to: "/?status=cancel" },
    { label: "Hold", to: "/?status=hold" },
    { label: "Paid", to: "/?status=paid" },
    { label: "Scheduled", to: "/?status=sched" },
    { label: "Entered", to: "/?status=ent" },
    { label: "Pending", to: "/?status=pend" },
  ];

  return (
    <div className="navbar">
      <div className="container">
        <div className="home-link">
          <Link className="link" to="/">
            <h6>HOME</h6>
          </Link>
        </div>
        <div className="links">
          <LinkList links={links} />
          <span className="write">
            <Link className="link" to="/write">
              Create invoice
            </Link>
          </span>
        </div>
        <div className="footer-menu">
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span className="link" onClick={logout}>
              Logout
            </span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
