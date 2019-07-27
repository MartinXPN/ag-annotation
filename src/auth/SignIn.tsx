// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import 'firebaseui';

// Configure Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyAx-fyzlGmKnAkfFQzS8jbab97b6nIdCH8",
    authDomain: "ag-annotate.firebaseapp.com",
    databaseURL: "https://ag-annotate.firebaseio.com",
    projectId: "ag-annotate",
    storageBucket: "",
    messagingSenderId: "402839714124",
    appId: "1:402839714124:web:4487a53e308a25db"
};
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
const uiConfig: firebaseui.auth.Config = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
};

class SignIn extends React.Component {
    render() {
        return (
            <div>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                <text fontSize={0.1}>Please Sign in to start annotating</text>
            </div>
        );
    }
}

export default SignIn;
