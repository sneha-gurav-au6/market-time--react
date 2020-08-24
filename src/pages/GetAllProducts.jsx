import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { particularProductDetail } from "../Redux/actions/productAction";
import axios from "axios";
import "./GetAllProduct.css";
class GetAllProducts extends Component {
    state = {
        popup: false,
    };
    getParticularProduct = async (e) => {
        e.preventDefault();
        const id = e.target.id;
        this.props.particularProductDetail(id);
        this.props.history.push(`/singleProduct/?id=${id}`);
    };
    AddToFavo = async (e) => {
        e.preventDefault();
        const productId = e.target.id;
        
        

        if (localStorage.getItem("jwtToken")) {
            const res = await axios.post(
                `https://market-time-be.herokuapp.com/user/addTowishlist/${productId}`
            );
            console.log(res.data.data);
            alert("added to favourite list");
        } else {
            alert("login first");
        }
    };

    render() {
        const {
            category,
            city,
            date,
          
            photos,
            price,
            title,
    
            _id,
        } = this.props.data;
        if (this.props.loading) {
            return <h2>Loading...</h2>;
        }
        return (
            <div>
                <div class="product-card ">
                    <div class="badge">{category}</div>
                    <div class="product-tumb">
                        <img src={photos[0]} alt="" />
                    </div>
                    <div class="product-details">
                        <span class="product-catagory">
                            <i class="fas fa-map-marker-alt fas-3x fa-fw"></i>
                            {city}
                        </span>
                        <span class="time">
                            <i class="far fa-calendar-alt"></i>
                            {new Date(date).toUTCString().slice(4, 16)}
                        </span>
                        <h4>
                            <a href="#/">{title}</a>
                        </h4>
                        <p>
                            <button
                                id={_id}
                                onClick={this.getParticularProduct}
                                className="btn btn-warning"
                                style={{ width: "100%" }}
                            >
                                More Detail
                            </button>
                        </p>
                        <div class="product-bottom-details">
                            <div class="product-price">
                                <i class="fas fa-rupee-sign fa-2x"></i>
                                {price}
                            </div>
                            <div class="product-links">
                                <a onClick={this.AddToFavo} href="#/">
                                    <i id={_id} class="fa fa-heart fa-2x"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        particularPro: state.product.particularProductDetail,
        user: state,
    };
};
export default connect(mapStateToProps, { particularProductDetail })(
    withRouter(GetAllProducts)
);
