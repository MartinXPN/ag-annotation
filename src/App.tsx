import React from 'react';
import './App.css';
import SignIn from "./auth/SignIn";
import SignOut from "./auth/SignOut";
import {User} from "firebase";
import firebase from 'firebase';
import SortableComponent from "./annotation/List";
// @ts-ignore
import GridLayout from 'react-grid-layout';

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

                <GridLayout className="Annotation-grid-container" cols={12} rowHeight={30} width={1200}>
                    <SortableComponent key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}/>
                </GridLayout>
            </div>
        );
    }
}


export default App;
