import React from 'react';
import AnnotationItem from "../entities/AnnotationItem";
import Card from 'react-bootstrap/Card'
import './Annotation.css';
import arrayMove from 'array-move';
import {Button} from "react-bootstrap";
import {saveAnnotation} from '../api/AnnotationService';
// @ts-ignore
import {SortableContainer, SortableElement} from "react-sortable-hoc";
import {User} from "firebase";


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
    currentUser: User | null;
    isAlreadyAnnotated: boolean;
    annotationItem: AnnotationItem;
}
interface State {
    relatedWords: Array<string>;
    isModified: boolean;
    isAlreadyAnnotated: boolean;
}

class AnnotationCard extends React.Component<Props, State> {

    constructor(props: Props){
        super(props);
        this.state = {
            relatedWords: props.annotationItem.relatedWords,
            isModified: false,
            isAlreadyAnnotated: props.isAlreadyAnnotated,
        };
    }


    componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any): void {
        this.setState({
            relatedWords: nextProps.annotationItem.relatedWords,
        });
    }

    onSortEnd = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
        this.setState({
            relatedWords: arrayMove(this.state.relatedWords, oldIndex, newIndex),
            isModified: true,
        });
    };

    isDisabled = () => {
        // Disable annotation if there is no currently signed in user
        return !this.props.currentUser;
    };

    saveChanges = async () => {
        // @ts-ignore
        await saveAnnotation(this.props.currentUser, {
            targetWord: this.props.annotationItem.targetWord,
            relatedWords: this.state.relatedWords
        });
        this.setState({
            isModified: false,
            isAlreadyAnnotated: true,
        });
    };

    render(): React.ReactElement {
        return (
            <Card className="Card">
                <p><b style={this.state.isAlreadyAnnotated ? { color: 'green' }: {color: 'black'}}>
                    {this.props.annotationItem.targetWord}
                </b></p>
                <SortableList items={this.state.relatedWords} onSortEnd={this.onSortEnd} disabled={this.isDisabled()} />
                {this.state.isModified &&
                    <Button className="save-button" onClick={this.saveChanges} variant="outline-primary" size="sm">Save</Button>
                }
            </Card>
        );
    }
}

export default AnnotationCard;
