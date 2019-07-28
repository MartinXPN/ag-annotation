import React from 'react';
import './Directions.css';

class Directions extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Directions</h3>
                <text fontSize={0.1}>
                    In the cards below left word is the target word.
                    In each card order words from most similar to least similar to the target word.
                </text>
            </div>
        );
    }
}

export default Directions;
