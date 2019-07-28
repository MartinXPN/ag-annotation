import React, {Component} from 'react';
import arrayMove from 'array-move';
// @ts-ignore
import {SortableContainer, SortableElement} from "react-sortable-hoc";

const SortableItem = SortableElement(({value}: {value: string}) => <li>{value}</li>);

const SortableList = SortableContainer(({items}: {items: Array<string>}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});

interface Props {
}

interface State {
    items: Array<string>;
}

class DragAndDropList extends Component<Props, State> {
    state = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
    onSortEnd = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });

        // this.setState(({items}) => ({
        //     items: arrayMove(items, oldIndex, newIndex),
        // }));
    };
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
    }
}

export default DragAndDropList;
