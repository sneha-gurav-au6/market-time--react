import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./MainUserMyAdds.css";
import axios from "axios";
class MainUserMyAdds extends Component {
    editProduct = (e) => {
        e.preventDefault();
        const id = e.target.id;

        // this.props.particularProductEdit(id)
        this.props.history.push({ pathname: "/edit-product", state: id });
    };
    deletProduct = async (e) => {
        const id = e.target.id;
        await axios.post(
            `https://market-time-be.herokuapp.com/deleteProduct/${id}`
        );

        alert("Add Deleted Successfully");
        window.location.reload();
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
