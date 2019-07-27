import React from 'react';
import './App.css';
import SignIn from "./auth/SignIn";
import SignOut from "./auth/SignOut";
import {User} from "firebase";
import firebase from 'firebase';

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
            <div>
                <header className="App-header">
                    <text className="title">AG Annotate</text>

                    {!this.state.currentUser ?
                        <div className="Sign-in-container"><SignIn/></div> :
                        <div className="Sign-out-container"><SignOut/></div>}
                </header>
                <div className="App">
                </div>
            </div>
        );
    }
}


export default App;
