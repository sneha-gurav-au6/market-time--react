import React, { Component } from "react";
import "./image.css";
import Typical from "react-typical";
import GetAllProducts from "../pages/GetAllProducts";
import { getProducts } from "../Redux/actions/productAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Spinner from "../components/Spinner"
import axios from "axios";
class Image extends Component {
    state = {
        NormalChange: false,
        SearchedProduct: null,
    };
    componentDidMount() {
        this.props.getProducts();
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        e.persist();
        console.log(e.target.title.value);
        if (e.target.title === "") {
            const res = await axios(
                `https://market-time.herokuapp.com/filterProduct/1?city=${e.target.city.value}&category=${e.target.category.value}&title="undefined"`
            );
            this.setState({ NormalChange: true });
            this.setState({ SearchedProduct: res.data.data[0] });
            this.props.history.push({
                pathname: `/filter-product/?category=${e.target.category.value}?city=${e.target.city.value}?title=${e.target.title.value}`,
                state: {
                    data: res.data.data,
                },
            });
        } else {
            const res = await axios(
                `https://market-time.herokuapp.com/filterProduct/1?city=${e.target.city.value}&category=${e.target.category.value}&title=${e.target.title.value}`
            );

            this.setState({ NormalChange: true });
            this.setState({ SearchedProduct: res.data.data[0] });
            this.props.history.push({
                pathname: `/filter-product/?category=${e.target.category.value}?city=${e.target.city.value}?title=${e.target.title.value}`,
                state: {
                    data: res.data.data,
                },
            });
        }
    };
    render() {
        console.log(this.props.pro)
        return (
            <div className="container-fluid ">
                <div className="background">
                    <div className="child-back">
                        <h1>
                            {" "}
                            <Typical
                                loop={Infinity}
                                wrapper="b"
                                steps={[
                                    "Buy Anything You Want !!",
                                    5000,
                                    "Sell Anything You Want !!",
                                    5000,
                                ]}
                            />{" "}
                        </h1>
                        <div className="">
                            <form
                                className="formData child-back2"
                                onSubmit={this.handleSubmit}
                            >
                                <div class="form-group ">
                                    <select
                                        class="form-control wC "
                                        name="category"
                                        onChange={this.handleChange}
                                    >
                                        <option
                                            value="undefined"
                                            selected="selected"
                                        >
                                            Select Category
                                        </option>
                                        <option>Property</option>
                                        <option>Electronics</option>
                                        <option>Educational</option>
                                        <option>Pets</option>
                                        <option>Computer Accesseries</option>
                                        <option>Car and Bike</option>
                                        <option>Fashion</option>
                                        <option>Furniture</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <select
                                        class="form-control wC"
                                        onChange={this.handleChange}
                                        name="city"
                                    >
                                        <option
                                            value="undefined"
                                            selected="selected"
                                        >
                                            Select City
                                        </option>
                                        <option>Mumbai</option>
                                        <option>Banglore</option>
                                        <option>Chennai</option>
                                        <option>Delhi</option>
                                        <option>Hydrabaad</option>
                                        <option>Pune</option>
                                    </select>
                                </div>

                                <div class="input-group mb-3 ">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Search By Title"
                                        aria-label="Example text with button addon"
                                        aria-describedby="button-addon1"
                                        name="title"
                                        onChange={this.handleChange}
                                    />
                                    <div class="input-group-prepend">
                                        <button
                                            class="btn btn-warning"
                                            type="submit"
                                            id="button-addon1"
                                        >
                                            Button
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <br />
                </div>
                
                <div className="container-fluid">
                    <div className="row">
                        {this.props.pro !== undefined
                            ? this.props.pro.map((key, index) => (
                                  <GetAllProducts data={key} index={index} />
                              ))
                            : <Spinner/>}
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        pro: state.product.getAllProducts.allProduct,
    };
};

export default connect(mapStateToProps, { getProducts })(withRouter(Image));
