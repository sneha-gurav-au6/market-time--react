import React, { Component } from "react";
import "./navbar.css";
import { connect } from "react-redux";
import { logoutUser } from "../Redux/actions/userAction";
import {withRouter} from "react-router-dom"
import img from "../images/Market Time.gif"
class Navbar extends Component {
    handleLogout = (e) => {
        e.preventDefault();
        this.props.logoutUser();
    };
    userDashboard = () => {
        this.props.history.push({
            pathname: "/user-dashboard",
            state: this.props.user.user.user,
        });
    };
    render() {

        const { isAuthenticated, user } = this.props.user.user;
        const registerLogin = (
            <>
                <li className="nav-item">
                    <a className="nav-link" href="/register">
                        <i class="fas fa-user-plus fa-3x fa-fw"></i>
                        Register
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/login">
                        <i class="fas fa-sign-in-alt fa-3x fa-fw"></i>
                        Login
                    </a>
                </li>
            </>
        );
        const Logout = (
            <>
                <li className="nav-item">
                    <a className="nav-link" onClick={this.userDashboard}>
                        <i class="far fa-user-circle fa-3x fa-fw"> </i>
                        Profile
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/addPost">
                        <i class="fas fa-plus-circle fa-3x fa-fw"></i>
                        Add New Post
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        onClick={this.handleLogout.bind(this)}
                        href="/login"
                    >
                        <i class="fas fa-sign-out-alt fa-3x fa-fw"></i>
                        Logout
                    </a>
                </li>
            </>
        );
        return (
            <div>
                <div className=" container-fluid ">
                    <nav className="navbar navbar-expand-lg navbar-dark back">
                        <img
                            style={{ width: "150px", height: "100px" }}
                            src={img}
                        />
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#/navbarColor01"
                            aria-controls="navbarColor01"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className="collapse navbar-collapse"
                            id="navbarColor01"
                        >
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">
                                        <i class="fas fa-home fa-3x fa-fw"></i>
                                        Home{" "}
                                        <span className="sr-only">
                                            (current)
                                        </span>
                                    </a>
                                </li>

                                
                            </ul>

                            <ul className="navbar-nav mr-0 my-2 my-lg-0">
                                {" "}
                                {isAuthenticated === false
                                    ? registerLogin
                                    : Logout}
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state,
    };
};

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar));
