import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { userProfile } from ".././Redux/actions/userAction";
import "./UserDashboard.css";
import axios from "axios";
const UserDashboard = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(props.users);
       
        console.log();
        // console.log(props.history.location.state)
    }, [props.users]);

    const handleEdit = async () => {
        // const a = await props.userProfile();

        props.history.push({ pathname: "/editProfile", state: user });
    };
    const handleMyAdds = async (e) => {
        e.preventDefault()
        //  const fetch = await axios.get(
        //      "https://market-time-be.herokuapp.com/userMyPro"
        //  );
        //  console.log(fetch.data);
        props.history.push({
            pathname: "/my-Ads",
            // state: { detail: fetch.data },
        });
        // props.history.push({
        //     pathname: "/my-Ads",
        // });
    };
    const handleMyFavo = async (e) => {
        e.preventDefault();
        
        console.log(fetch.data);
        props.history.push({
            pathname: "/my-wishlist"
            
        });

        
    };
    // handleProduct = async (e) => {
    //     const fetch = await axios.get(
    //         "https://market-time-be.herokuapp.com/userMyPro"
    //     );
    //     console.log(fetch.data);
    //     this.props.history.push({
    //         pathname: "/my-adds",
    //         state: { detail: fetch.data },
    //     });
    // };
    console.log(user);
    return (
        <div>
            {user !== null ? (
                <div className="container-fluid cost">
                    {/* <h1>user dashboard</h1>
                    <h2>Hello,{user.name}</h2>
                    <div>
                        <img src={user.image} alt={user.image} />
                    </div>
                    <button onClick={handleEdit} className="btn btn-primary">
                        Edit Profile
                    </button>
                    <button onClick={handleMyAdds} className="btn btn-primary">
                        My Ads
                    </button>
                    <button className="btn btn-primary">Favorite</button> */}

                    <div class="row">
                        <div class="col-md-1"></div>
                        <div class="col-md-3 main">
                            <ul style={{ "list-style-type": "none" }}>
                                <div class="li2">
                                    <li>
                                        <h4>
                                            <b>Menu</b>
                                        </h4>
                                    </li>
                                </div>
                                <div class="li3">
                                    <li>Dashboard</li>
                                </div>
                                <hr class="hr" />
                                <div onClick={handleMyFavo} class="li1">
                                    <li>My WishList</li>
                                </div>
                                <hr class="hr" />
                                <div onClick={handleMyAdds} class="li1">
                                    <li>My Listing</li>
                                </div>
                                <hr class="hr" />
                                <div onClick={handleEdit} class="li1">
                                    <li>Edit Profile</li>
                                </div>
                                <hr class="hr" />
                                <div class="li1">
                                    <li>Logout</li>
                                </div>
                            </ul>
                        </div>

                        <div class="col-md-6 mid">
                            <img class="image" src={user.image} />
                            <div class="name">
                                <h2 style={{ color: "yellow" }}>
                                    Hello, {user.name}
                                </h2>
                                <h4>{user.email}</h4>
                            </div>
                            <div class="details">
                                <h3 style={{ color: "yellow" }}>
                                    <b>Your Profile Details</b>{" "}
                                </h3>
                                <h4>City: {user.city}</h4>
                                <h4>Contact Details: {user.contactNo}</h4>
                                <h4>Facebook Profile: {user.facebook}</h4>

                                <h4>Instagram Profile: {user.instagram}</h4>
                            </div>
                        </div>
                        <div class="col-md-2 "></div>
                    </div>
                </div>
            ) : (
                <h2>Loading</h2>
            )}
        </div>
    );
};
const mapStatetoprops = (state) => {
    return {
        users: state.user.user,
        pro:state
    };
};
export default connect(mapStatetoprops, { userProfile })(UserDashboard);
