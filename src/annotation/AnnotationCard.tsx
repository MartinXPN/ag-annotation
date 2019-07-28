import React from 'react';
import AnnotationItem from "../entities/AnnotationItem";
import Card from 'react-bootstrap/Card'
import './Annotation.css';
import arrayMove from 'array-move';
// @ts-ignore
import {SortableContainer, SortableElement} from "react-sortable-hoc";

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
    // annotationItem: AnnotationItem;
}
interface State {
    items: Array<string>;
}

class AnnotationCard extends React.Component<Props, State> {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
    onSortEnd = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    render(): React.ReactElement {
        return (
            <div className="Card-container">
                <Card className="Card">
                    <text>Target word</text>
                    <SortableList items={this.state.items} onSortEnd={this.onSortEnd} disabled={true} />
                </Card>
            </div>
        );
    }
}

export default AnnotationCard;
