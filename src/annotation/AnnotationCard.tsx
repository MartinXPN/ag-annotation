import React from 'react';
import DragAndDropList from "./DragAndDropList";
import AnnotationItem from "../entities/AnnotationItem";
import Card from 'react-bootstrap/Card'
import './Annotation.css';

interface Props {
    // annotationItem: AnnotationItem;
}
interface State {

}

class AnnotationCard extends React.Component<Props, State> {

    render(): React.ReactElement {
        return (
            <div className="Card-container">
                <Card className="Card">
                    <text>Target word</text>
                    <DragAndDropList/>
                </Card>
            </div>
        );
    }
}

export default AnnotationCard;
