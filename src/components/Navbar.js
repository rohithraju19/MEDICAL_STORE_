import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../store/authSlice";

function Navbar() {
    const user = useSelector(store => store.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logout() {
        if (user) {
            axios.post('https://medicalstore.mashupstack.com/api/logout', {}, {
                headers: { 'Authorization': "Bearer " + user.token }
            })
            .then(() => {
                dispatch(removeUser());
                navigate('/login');
            })
            .catch(error => {
                console.error("Logout failed:", error);
                // Handle logout failure, if necessary
            });
        }
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <div className="navbar-brand">
                <h4>MEDICAL STORE</h4>
            </div>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse mr-auto" id="navbarNav" style={{ float: "left" }}>
                <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                    <li className="nav-item">
                        <NavLink exact to={"/"} className="nav-link" activeClassName="active">
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/aboutus"} className="nav-link" activeClassName="active">
                            About us
                        </NavLink>
                    </li>
                
                    <li className="nav-item">
                        <NavLink to={"/blog/posts"} className="nav-link" activeClassName="active">
                            Medicine
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/register"} className="nav-link" activeClassName="active">
                            Register
                        </NavLink>
                    </li>
                    {user ?
                        <li className="nav-item">
                            <span className="nav-link" onClick={logout}>Logout</span>
                        </li> :
                        <li className="nav-item">
                            <NavLink to={"/login"} className="nav-link" activeClassName="active">
                                Login
                            </NavLink>
                        </li>
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;