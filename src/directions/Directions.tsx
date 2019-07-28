import React from 'react';
import './Directions.css';

class Directions extends React.Component {
    render() {
        return (
            <div className="container">
                <text fontSize={0.2}>
                    <b>Directions:</b>
                    In the cards below left word is the target word.
                    In each card order words from most similar to least similar to the target word.
                </text>
            </div>
        );
    }
}

export default Directions;
