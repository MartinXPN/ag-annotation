import React from 'react';
import './App.css';
import SignIn from "./auth/SignIn";
import SignOut from "./auth/SignOut";
import {User} from "firebase";
import firebase from 'firebase';
import SortableComponent from "./annotation/List";
// @ts-ignore
import { Responsive, WidthProvider} from 'react-grid-layout';

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
        const ResponsiveGridLayout = WidthProvider(Responsive);

        return (
            <div>
                <header className="App-header">
                    <text className="title">AG Annotate</text>

                    {!this.state.currentUser ?
                        <div className="Sign-in-container"><SignIn/></div> :
                        <div className="Sign-out-container"><SignOut/></div>}
                </header>

                <ResponsiveGridLayout
                    className="Annotation-grid-container"
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>

                    <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}><SortableComponent/></div>
                    <div key="b" data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}><SortableComponent/></div>
                </ResponsiveGridLayout>
            </div>
        );
    }
}


export default App;
