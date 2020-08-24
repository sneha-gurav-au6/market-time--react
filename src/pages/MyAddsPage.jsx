import React, { useEffect, useState, Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import MainUserMyAdds from "./MainUserMyAdds";
import Spinner from "../components/Spinner";
import { GetAllProduct } from "../Redux/actions/productType";
import isEmpty from "../utils/is-empty";
import axios from "axios"

class MyAddsPage extends Component {
  state = {
    data: null,
  };

  async componentDidMount() {
    const fetch = await axios.get(
      "https://market-time-be.herokuapp.com/userMyPro"
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
          <h1>No Product Found</h1>
        </div>)
      } else {
        return this.state.data.map((d, index) => (
          (<div className="container-fluid">
          
              {this.state.data.map((d, index) => (
                    <MainUserMyAdds product={d} key={d._id} />
                ))}
            
        </div>)
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

export default connect(mapStateToProps)(withRouter(MyAddsPage));
