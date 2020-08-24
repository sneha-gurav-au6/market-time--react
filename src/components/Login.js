import React, { Component } from "react";
import { loginUsers } from "../Redux/actions/userAction";
import { connect } from "react-redux";
import "./register.css";
import classnames from "classnames";

class Login extends Component {
  state = {
    name: "",
    email: "",
    password: "",
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
    };
    const data = {
      newUser: newUser,
    };
    const rgs = this.props.loginUsers(data);

    // this.props.history.push("/")
    console.log(rgs);
  };

  componentWillReceiveProps(nextprops) {
    console.log(nextprops.auth.user.id);
    if (nextprops.auth.user.id) {
        this.props.history.push("/");
    }

    // if (this.props.auth.errors) {
    //     window.location.reload();
    // }
  }
  render() {
    const { errors } = this.props.auth;
    console.log(this.props.auth);
    return (
      <div className="container-fluid register">
        <form onSubmit={this.handleSubmit}>
          {/* <div className="form-group">
                        <label for="exampleInputPassword1">User Name</label>
                        <input
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                            name="name"
                        />
                    </div> */}

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
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
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
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.user };
};

export default connect(mapStateToProps, { loginUsers })(Login);
