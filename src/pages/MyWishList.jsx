import React, { Component, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MainMyWishList from "./MainMyWishList";
import axios from "axios";
import Spinner from "../components/Spinner";
import isEmpty from "../utils/is-empty";
class MyWishList extends Component {
    state = {
        data: null,
    };

    async componentDidMount() {
        const fetch = await axios.get(
            "https://market-time-be.herokuapp.com/userWishList"
        );
        // this.setState(fetch.data)

        const arr2 = fetch.data.flat();
        this.setState({ data: arr2 });

        console.log(this.state.data);
    }

    render() {
        if (this.state.data !== null) {
            console.log(isEmpty(this.state.data));
            if (isEmpty(this.state.data)) {
                return (<div className="container-fluid">
                    <h1>NO Product Added to Favourite List</h1>
                </div>)
            } else {
                return this.state.data.map((d, index) => (
                    <div>
                        <MainMyWishList product={d} key={d._id} />
                    </div>
                ));
            }
        } else {
            return <Spinner />;
        }
    }
}

const mapStateToProps = (state) => {
    return { user: state.user };
};

export default connect(mapStateToProps)(withRouter(MyWishList));
