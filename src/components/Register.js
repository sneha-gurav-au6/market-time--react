import React, { Component } from "react";
import { RegisterUsers, GoogleLoginAuth } from "../Redux/actions/userAction";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import "./register.css";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    city: "",
    contactNo: "",
    facebook: "",
    error: "",
    success: null,
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
    const rgs = this.props.RegisterUsers(data);
    console.log(rgs);
    this.setState({ error: true });
  };

  componentWillReceiveProps(nextprops) {
    console.log(nextprops);
    if (nextprops.auth.RegisterUser._id) {
      this.props.history.push("/login");
    }

    // if (this.props.auth.errors) {
    //   window.location.reload();
    // }
  }
  render() {
    const { errors } = this.props.auth;
    console.log(errors);
    return (
      <div className="container-fluid register">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label for="exampleInputPassword1">User Name</label>
            <input
              onChange={this.handleChange}
              type="text"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.name,
              })}
              name="name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>
          <div className="form-group">
            <div class="form-group">
              <label for="exampleFormControlSelect1">Choose Your City</label>
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
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.email,
              })}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={this.handleChange}
              name="email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className={classnames("form-control form-control-lg", {
                "is-invalid": errors.password,
              })}
              id="exampleInputPassword1"
              onChange={this.handleChange}
              name="password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
          <div>
            <button
              type="submit"
              className={classnames("btn btn-primary", {
                "is-invalid": errors.message,
              })}
            >
              Submit
            </button>
            {errors.message && (
              <div className="invalid-feedback">{errors.message}</div>
            )}
          </div>
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

const mapstateToProps = (state) => {
  return { auth: state.user };
};

export default connect(mapstateToProps, { RegisterUsers, GoogleLoginAuth })(
  withRouter(Register)
);
