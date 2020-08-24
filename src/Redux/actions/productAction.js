import { GetAllProduct, particularProduct,particularProductOwner } from "./productType";
import axios from "axios";
export const getProducts = () => async (dispatch) => {
    const res = await axios("https://market-time.herokuapp.com/allProduct/1");
   
    dispatch({ type: GetAllProduct, payload: res.data });
};
export const particularProductDetail = (id) => async (dispatch) => {
    const res = await axios.get(
        `https://market-time.herokuapp.com/singleProduct/${id}`
    );
   
    const userId= res.data.data.user
    const particularProductOwners = await axios.get(
        `https://market-time-be.herokuapp.com/userProfile/${userId}`
    );
    
    dispatch({ type: particularProduct, payload: res.data.data });
    dispatch({
        type: particularProductOwner,
        payload: particularProductOwners.data,
    });

};
export const addPro = (token,data)=> async (dispatch)=>{
    console.log(data)
    console.log(token)
}