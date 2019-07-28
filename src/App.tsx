import React from 'react';
import './App.css';
import SignIn from "./auth/SignIn";
import SignOut from "./auth/SignOut";
import {User} from "firebase";
import firebase from 'firebase';
import AnnotationCard from "./annotation/AnnotationCard";
// @ts-ignore
import { Responsive, WidthProvider} from 'react-grid-layout';
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
        const ResponsiveGridLayout = WidthProvider(Responsive);

        return (
            <React.Fragment>
                <header className="App-header">
                    <text className="title">AG Annotate</text>

                    {!this.state.currentUser ?
                        <div className="Sign-in-container"><SignIn/></div> :
                        <div className="Sign-out-container"><SignOut/></div>}
                </header>

                <Directions/>

                <ResponsiveGridLayout
                    className="Annotation-grid-container"
                    breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                    cols={{lg: 3, md: 3, sm: 2, xs: 1, xxs: 1}}
                    margin={[8, 80]}
                    autoSize={true}>

                    <div key="0" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="1" data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="2" data-grid={{x: 2, y: 0, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="3" data-grid={{x: 3, y: 0, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="4" data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="5" data-grid={{x: 5, y: 0, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="6" data-grid={{x: 0, y: 1, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="7" data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="8" data-grid={{x: 2, y: 1, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="9" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="10" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="11" data-grid={{x: 5, y: 1, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                    <div key="12" data-grid={{x: 6, y: 1, w: 1, h: 1, static: true}}><AnnotationCard/></div>
                </ResponsiveGridLayout>
            </React.Fragment>
        );
    }
}


export default App;
