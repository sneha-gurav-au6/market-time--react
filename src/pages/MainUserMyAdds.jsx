import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import "./MainUserMyAdds.css"
import { connect } from "react-redux";
import axios from "axios";


// import PropTypes from "prop-types";
// import classnames from "classnames";

class MainUserMyAdds extends Component {
    editProduct = (e) => {
        e.preventDefault();
        const id = e.target.id;
        console.log(id);
        // this.props.particularProductEdit(id)
        this.props.history.push({ pathname: "/edit-product", state: id });
    };
    deletProduct = async (e) => {
        const id = e.target.id;

        const fetch = await axios.post(
            `https://market-time-be.herokuapp.com/deleteProduct/${id}`
        );
        console.log(fetch.data);
        alert("Product Deleted ,Refresh page");
        this.props.history.push('/user-dashboard')
    };
    render() {
        console.log(this.props.product);
        return (
            <div className="col-md-3 cotm">
                <div className="card cotm1">
                    <img
                        src={this.props.product.photos[0]}
                        class="card-img-top"
                        alt="..."
                    />
                    <div class="card-body">
                        <h5 class="card-title">{this.props.product.title}</h5>
                        <p class="card-text">
                            Add is From {this.props.product.city}
                        </p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">
                            Last updated {this.props.product.date}
                        </small>
                    </div>
                    <button
                        id={this.props.product._id}
                        onClick={this.editProduct}
                        className="btn btn-primary"
                    >
                        Edit
                    </button>
                    <button
                        id={this.props.product._id}
                        onClick={this.deletProduct}
                        className="btn btn-primary"
                    >
                        Delet Product
                    </button>
                </div>
            </div>
        );
    }
}

export default withRouter(MainUserMyAdds);
