import React from 'react';
import AnnotationItem from "../entities/AnnotationItem";
import Card from 'react-bootstrap/Card'
import './Annotation.css';
import arrayMove from 'array-move';
import firebase from 'firebase';
import {Button} from "react-bootstrap";
// @ts-ignore
import {SortableContainer, SortableElement} from "react-sortable-hoc";
// @ts-ignore
import _ from 'lodash';


const SortableItem = SortableElement(({value}: {value: string}) => <li className="list-item">{value}</li>);

const SortableList = SortableContainer(({items, disabled}: {items: Array<string>, disabled: boolean}) => {
    return (
        <ul className="list-container">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} disabled={disabled} />
            ))}
        </ul>
    );
});

interface Props {
    isAlreadyAnnotated: boolean;
    annotationItem: AnnotationItem;
}
interface State {
    relatedWords: Array<string>;
}

class AnnotationCard extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {relatedWords: props.annotationItem.relatedWords};
    }

    onSortEnd = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
        this.setState({relatedWords: arrayMove(this.state.relatedWords, oldIndex, newIndex)});
    };

    isDisabled = () => {
        // Disable annotation if there is no currently signed in user
        return !firebase.auth().currentUser;
    };

    isModified = () => {
        return !_.isEqual(this.props.annotationItem.relatedWords, this.state.relatedWords);
    };

    saveChanges = () => {
    };

    render(): React.ReactElement {
        return (
            <Card className="Card">
                <p>{this.props.annotationItem.targetWord}</p>
                <SortableList items={this.state.relatedWords} onSortEnd={this.onSortEnd} disabled={this.isDisabled()} />
                {this.isModified() &&
                    <Button className="save-button" onClick={this.saveChanges} variant="outline-primary" size="sm">Save</Button>
                }
            </Card>
        );
    }
}

export default AnnotationCard;
