import AnnotationCard from "./AnnotationCard";
import React from "react";
// @ts-ignore
import {Responsive, WidthProvider} from 'react-grid-layout';
import AnnotationItem from "../entities/AnnotationItem";
import {getAllCollection, getUserAnnotations} from '../api/AnnotationService';
import {User} from "firebase";

interface DisplayedAnnotation {
    item: AnnotationItem;
    isAlreadyAnnotated: boolean;
}

interface Props {
    currentUser: User | null;
}

interface State {
    annotationItems: Array<DisplayedAnnotation>;
}


class Annotation extends React.Component<Props, State> {
    state = {annotationItems: []};

    async componentDidMount() {
        await this.fetchAnnotations();
    }
    async componentWillReceiveProps(nextProps: Readonly<Props>, nextContext: any) {
        if(this.props.currentUser !== nextProps.currentUser)
            await this.fetchAnnotations();
    }

    fetchAnnotations = async () => {
        const annotationCollection = await getAllCollection();

        if(this.props.currentUser === null ) {
            this.setState({annotationItems: annotationCollection.map((annotation: AnnotationItem) => {
                    return {item: annotation, isAlreadyAnnotated: false};
                })});
            return;
        }

        const userAnnotations = await getUserAnnotations(this.props.currentUser);
        const annotatedTargetWords: Map<string, AnnotationItem> = new Map();
        userAnnotations.forEach((annotation: AnnotationItem) => {
            annotatedTargetWords.set(annotation.targetWord, annotation);
        });

        this.setState({annotationItems: annotationCollection.map((annotation: AnnotationItem) => {
            const targetWord: string = annotation.targetWord;
            const isAnnotated: boolean = annotatedTargetWords.has(targetWord);
            // @ts-ignore
            const item: AnnotationItem = isAnnotated ? annotatedTargetWords.get(targetWord) : annotation;
            return {item: item, isAlreadyAnnotated: isAnnotated}
        })});
    };

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
                            <AnnotationCard
                                annotationItem={annotation.item}
                                isAlreadyAnnotated={annotation.isAlreadyAnnotated}
                                currentUser={this.props.currentUser}/>
                        </div>
                    )
                })}
            </ResponsiveGridLayout>
        );
    }
}

export default Annotation;
