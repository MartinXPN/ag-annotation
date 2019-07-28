import AnnotationCard from "./AnnotationCard";
import React from "react";
// @ts-ignore
import {Responsive, WidthProvider} from 'react-grid-layout';
import AnnotationItem from "../entities/AnnotationItem";
import {getAllCollection, getUserAnnotations} from '../api/AnnotationService';
import {getCurrentUser} from "../api/AuthService";

interface DisplayedAnnotation {
    item: AnnotationItem;
    isAlreadyAnnotated: boolean;
}

interface Props {
}

interface State {
    annotationItems: Array<DisplayedAnnotation>;
}


class Annotation extends React.Component<Props, State> {
    state = {annotationItems: []};

    async componentDidMount() {
        const annotationCollection = await getAllCollection();
        // @ts-ignore
        let userAnnotations = await getUserAnnotations(getCurrentUser());
        userAnnotations = new Set(userAnnotations.map((annotation: AnnotationItem) => annotation.targetWord));

        this.setState({annotationItems: annotationCollection.map((annotation: AnnotationItem) => {
            return {item: annotation, isAlreadyAnnotated: userAnnotations.has(annotation.targetWord)}
        })});
    }

    render(): React.ReactElement {
        const ResponsiveGridLayout = WidthProvider(Responsive);
        const columns = 3;
        return (
            <ResponsiveGridLayout
                className="Annotation-grid-container"
                breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
                cols={{lg: columns, md: columns, sm: columns, xs: columns, xxs: columns}}
                margin={[8, 80]}
                autoSize={true}>

                {this.state.annotationItems.map((annotation: DisplayedAnnotation, index: number) => {
                    return(
                        <div key={index.toString()}
                             data-grid={{x: index % columns, y: Math.floor(index / columns), w: 1, h: 1, static: true}}>
                            <AnnotationCard annotationItem={annotation.item} isAlreadyAnnotated={annotation.isAlreadyAnnotated}/>
                        </div>
                    )
                })}
            </ResponsiveGridLayout>
        );
    }
}

export default Annotation;
