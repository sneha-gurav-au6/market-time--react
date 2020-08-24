import React, { Component } from "react";
import { RegisterUsers, GoogleLoginAuth } from "../Redux/actions/userAction";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import fire from "../components/firebase/firebase";
import "./register.css";
class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        city: "",
        contactNo: "",
        facebook: "",
    };
    responseGoogle = (response) => {
        const { name, googleId, email, imageUrl } = response.profileObj;

        const data = {
            name: name,
            image: imageUrl,
            id: googleId,
            email: email,
        };
        this.props.GoogleLoginAuth(data);
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            city: this.state.city,
            contactNo: this.state.contactNo,
        };
        const data = {
            newUser: newUser,
        };
        await fire.auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then((u) => {
                console.log(u);
            })
            .catch((err) => {
                console.log(err.message);
            });
        const rgs = this.props.RegisterUsers(data);
        console.log(rgs);
    };
    render() {
        return (
            <div className="container-fluid register">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label for="exampleInputPassword1">User Name</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <div class="form-group">
                            <label for="exampleFormControlSelect1">
                                Choose Your City
                            </label>
                            <select
                                class="form-control"
                                id="exampleFormControlSelect1"
                                onChange={this.handleChange}
                                name="city"
                            >
                                <option>Mumbai</option>
                                <option>Pune</option>
                                <option>Banglore</option>
                                <option>Delhi</option>
                                <option>Hydrabad</option>
                                <option>Chennai</option>
                            </select>
                        </div>
                    </div>
                    <label for="exampleInputPassword1">Contact Number</label>
                    <div class="input-group mb-2">
                        <br />
                        <div class="input-group-prepend">
                            <div class="input-group-text">+91</div>
                        </div>

                        <input
                            type="text"
                            class="form-control"
                            id="inlineFormInputGroup"
                            onChange={this.handleChange}
                            name="contactNo"
                        />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            onChange={this.handleChange}
                            name="email"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={this.handleChange}
                            name="password"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
                <div>
                    <h1>Or</h1>
                    <GoogleLogin
                        clientId="1072465421731-uvep08evonm2cc003a31g791m73tonhi.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={"single_host_origin"}
                    />
                </div>
            </div>
        );
    }
}

export default connect(null, { RegisterUsers, GoogleLoginAuth })(Register);
