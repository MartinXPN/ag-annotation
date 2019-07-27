import React from "react";
import firebase from 'firebase';
import {Button} from 'react-bootstrap';

class SignOut extends React.Component {

    signOut = async () => {
        await firebase.auth().signOut();
    };

    render() {
        return (
            <Button onClick={this.signOut} variant="outline-primary" size="sm">
                Sign Out
            </Button>
        );
    }
}

export default SignOut;
