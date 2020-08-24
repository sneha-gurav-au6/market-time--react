import React, { Component } from "react";
import axios from "axios";
import {withRouter} from "react-router-dom"
class MainMyWishList extends Component {
    deleteProduct = async (e) => {
        const id = e.target.id;
        await axios.post(
            `https://market-time-be.herokuapp.com/user/deleteFromWishList/${id}`
        );
        alert("Deleted product from Wishlist ");
        this.props.history.push("/user-dashboard");
    };

    render() {
        if (this.props.product.length!==0) {
            return (
                <div>
                    <div className="col-md-3">
                        <div class="card">
                            <img
                                src={this.props.product.photos[0]}
                                class="card-img-top"
                                alt="..."
                            />
                            <div class="card-body">
                                <h5 class="card-title">
                                    {this.props.product.title}
                                </h5>
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
                                onClick={this.deleteProduct}
                                className="btn btn-primary"
                            >
                                Delet From Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            
          return (
              <div>
                  <h1>No Product Added to WishList</h1>
              </div>
          );
        }
    }
}

export default withRouter(MainMyWishList);
