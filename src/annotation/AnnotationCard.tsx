import React from 'react';
import AnnotationItem from "../entities/AnnotationItem";
import Card from 'react-bootstrap/Card'
import './Annotation.css';
import arrayMove from 'array-move';
// @ts-ignore
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import firebase from 'firebase';


const SortableItem = SortableElement(({value}: {value: string}) => <li>{value}</li>);

const SortableList = SortableContainer(({items, disabled}: {items: Array<string>, disabled: boolean}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} disabled={disabled} />
            ))}
        </ul>
    );
});

interface Props {
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

    render(): React.ReactElement {
        return (
            <div className="Card-container">
                <Card className="Card">
                    <p>{this.props.annotationItem.targetWord}</p>
                    <SortableList items={this.state.relatedWords} onSortEnd={this.onSortEnd} disabled={this.isDisabled()} />
                </Card>
            </div>
        );
    }
}

export default AnnotationCard;
