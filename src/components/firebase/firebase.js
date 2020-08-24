import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBlX_CvhwPXGpCrDfnK92VfwzK1V44-W6s",
    authDomain: "chat-app-42d41.firebaseapp.com",
    databaseURL: "https://chat-app-42d41.firebaseio.com",
    projectId: "chat-app-42d41",
    storageBucket: "chat-app-42d41.appspot.com",
    messagingSenderId: "436920640925",
    appId: "1:436920640925:web:0b60953cf2fddd6655fb74",
};

const fire = firebase.initializeApp(firebaseConfig);

// export const f = firebase;
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
// export const storage = firebase.storage();

export default fire