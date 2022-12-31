import React, {useContext} from "react";
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/authContext";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="container">
                <div className="home-link">
                    <Link className="link" to="/">
                        <h6>HOME</h6>
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?status=appr">
                        <h6>Approved</h6>
                    </Link>
                    <Link className="link" to="/?status=cancel">
                        <h6>Cancel</h6>
                    </Link>
                    <Link className="link" to="/?status=hold">
                        <h6>Hold</h6>
                    </Link>
                    <Link className="link" to="/?status=paid">
                        <h6>Paid</h6>
                    </Link>
                    <Link className="link" to="/?status=sched">
                        <h6>Scheduled</h6>
                    </Link>
                    <Link className="link" to="/?status=ent">
                        <h6>Entered</h6>
                    </Link>
                    <Link className="link" to="/?status=pend">
                        <h6>Pending</h6>
                    </Link>
                    <span className="write">
                        <Link className="link" to="/write">Create invoice</Link>
                    </span>
                </div>
                <div className="footer-menu">

                    <span>{currentUser?.username}</span>
                    {currentUser ? (
                        <span className="link" onClick={logout}>Logout</span>
                    ) : (
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Navbar;