import React from 'react';
import './App.css';
import SignIn from "./auth/SignIn";
import SignOut from "./auth/SignOut";
import {User} from "firebase";
import firebase from 'firebase';
import Annotation from "./annotation/Annotation";
import Directions from "./directions/Directions";

interface Props {
}

interface State {
    currentUser: User | null;
    unsubscribe: () => void;
}

class App extends React.Component<Props, State> {
    state = {
        currentUser: null,
        unsubscribe: () => {
        },
    };

    componentDidMount(): void {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            this.setState({currentUser: user});
        });

        this.setState({unsubscribe: unsubscribe});
    }

    componentWillUnmount(): void {
        if (this.state.unsubscribe) {
            this.state.unsubscribe();
        }
    }

    render(): React.ReactElement {

        return (
            <React.Fragment>
                <header className="App-header">
                    <p className="title">AG Annotate</p>

                    {!this.state.currentUser ?
                        <div className="Sign-in-container"><SignIn/></div> :
                        <div className="Sign-out-container"><SignOut/></div>}
                </header>

                <Directions/>
                <Annotation/>
            </React.Fragment>
        );
    }
}


export default App;
