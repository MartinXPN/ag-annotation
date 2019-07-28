import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import firebase from 'firebase';

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

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
