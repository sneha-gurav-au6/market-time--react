import React, { Component } from "react";
import axios from "axios";
import "./addProduct.css";
import { connect } from "react-redux";
import { addPro } from "../Redux/actions/productAction";
class AddNewPost extends Component {
    state = {
        // title: "",
        // category: "",
        // city: "",
        // price: "",
        // description: "",
        // brand: "",
        // year: "",
        image: [],
        errors: {},
        token: null,
    };
    componentDidMount() {
        if (localStorage) {
            const id = localStorage.getItem("jwtToken");
            this.setState({ token: id });
        }
    }
    handleFormData = async (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const category = e.target.category.value;
        const city = e.target.city.value;
        const brand = e.target.brand.value;
        const price = e.target.price.value;
        const year = e.target.year.value;

        const formData = new FormData(e.target);
        console.log(this.state.token);
        // formData.append("image", this.state.image);
        // formData.append("title", title);
        // formData.append("category", category);
        // formData.append("city", city);
        // formData.append("brand", brand);
        // formData.append("year", year);
        // formData.append("price", price);
        // formData.append("description", description);
        // formData.append(
        //     "Authorization",
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMzE3YjMzMDg5YTA5MDAwNDc0NTZlNSIsIm1ldGhvZCI6ImxvY2FsIiwibmFtZSI6ImltcmFuIiwiZW1haWwiOiJpbXJhbndvcmxkQGdtYWlsLmNvbSIsImltYWdlIjoiaHR0cHM6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9hbnl0aGluZz9zPTIwMCZkPW1tIiwiaWF0IjoxNTk3MzA2NDM1LCJleHAiOjE1OTczMTAwMzV9.enK5UMDCYbKVxNUCqYwFLRnfnSrWXdHvmwWpeallfRQ"
        // );
        
        const datas = await axios.post(
            "https://cors-anywhere.herokuapp.com/https://market-time.herokuapp.com/addProducts",

            formData
        );
        console.log(datas.data);
        
    };
    //  Authentication: `Bearer ${data.jwtToken}`,
    handleChange = (event) => {
        //    this.setState({ image: [...event.target.files][0] });
        const { value } = event.target;
        let newState = this.state;
        newState.image.push(value);
        this.setState(newState);
    };
    render() {
        console.log(this.props.auth);
        console.log(this.state.image);
        return (
            <div className="container-fluid w-50">
                <form
                    onSubmit={this.handleFormData}
                    enctype="multipart/form-data"
                >
                    <div class="form-group ">
                        <label for="exampleInputEmail1">Add Title</label>
                        <input
                            type="text"
                            name="title"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Title"
                        />
                    </div>
                    {/* Description */}
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">
                            Post Description
                        </label>
                        <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="description"
                        ></textarea>
                    </div>
                    {/* select category */}
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">
                            Select Category
                        </label>
                        <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                            name="category"
                        >
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
                    {/* Select City */}
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">
                            Select City
                        </label>
                        <select
                            class="form-control"
                            id="exampleFormControlSelect1"
                            name="city"
                        >
                            <option>Mumbai</option>
                            <option>Banglore</option>
                            <option>Chennai</option>
                            <option>Delhi</option>
                            <option>Hydrabaad</option>
                            <option>Pune</option>
                        </select>
                    </div>

                    {/* Enter Brand */}
                    <div class="form-group ">
                        <label for="exampleInputEmail1">Enter Brand</label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Ex.Samsung"
                            name="brand"
                        />
                    </div>
                    {/* Enter Amount */}
                    <div class="form-group">
                        <label class="sr-only" for="inlineFormInputGroup">
                            Enter Selling Price
                        </label>
                        <label for="exampleFormControlSelect1">
                            Enter Amount
                        </label>
                        <div class="input-group mb-2">
                            <div class="input-group-prepend">
                                <div class="input-group-text">₹</div>
                            </div>
                            <input
                                type="text"
                                class="form-control"
                                id="inlineFormInputGroup"
                                placeholder="Enter Amount"
                                name="price"
                            />
                        </div>
                    </div>
                    {/* Year */}
                    <div class="form-group ">
                        <label for="exampleInputEmail1">Enter Year</label>
                        <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Ex.2020"
                            name="year"
                        />
                    </div>
                    {/* Select Images */}
                    <h3>Select Images</h3>

                    <div>
                        <h2>Select Images</h2>
                        <div className="form-group">
                            <br />
                            <div class="input-group">
                                <div class="custom-file">
                                    <input
                                        type="file"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                        name="image"
                                        onChange={this.handleChange}
                                    />
                                    <label
                                        class="custom-file-label"
                                        for="inputGroupFile01"
                                    >
                                        {!this.state.image[0]
                                            ? "Choose Image"
                                            : this.state.image[0]}
                                    </label>
                                </div>
                            </div>

                            <small className="form-text text-muted">
                                Primary Photo
                            </small>
                        </div>
                        {/*  */}
                        <div className="form-group">
                            <br />
                            <div class="input-group">
                                <div class="custom-file">
                                    <input
                                        type="file"
                                        class="custom-file-input"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                        name="image"
                                        onChange={this.handleChange}
                                    />
                                    <label
                                        class="custom-file-label"
                                        for="inputGroupFile01"
                                    >
                                        {!this.state.image[1]
                                            ? "Choose Image"
                                            : this.state.image[1]}
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="form-group">
                            <br />
                            <div class="input-group">
                                <div class="custom-file">
                                    <input
                                        type="file"
                                        class="custom-file-input"
                                        id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01"
                                        name="image"
                                        onChange={this.handleChange}
                                    />
                                    <label
                                        class="custom-file-label"
                                        for="inputGroupFile01"
                                    >
                                        {!this.state.image[2]
                                            ? "Choose Image"
                                            : this.state.image[2]}
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                    </div>

                    <button type="submit" class="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        auth: state,
    };
};

export default connect(mapStateToProps, { addPro })(AddNewPost);
