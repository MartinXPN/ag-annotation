import AnnotationCard from "./AnnotationCard";
import React from "react";
// @ts-ignore
import {Responsive, WidthProvider} from 'react-grid-layout';
import AnnotationItem from "../entities/AnnotationItem";


interface Props {
}

interface State {
    annotationItems: Array<AnnotationItem>,
}


class Annotation extends React.Component<Props, State> {
    state = {annotationItems: []};

    componentDidMount(): void {
        this.setState({annotationItems: [
                {targetWord: "yo", relatedWords: ["b", "i", "kct"]},
                {targetWord: "yo", relatedWords: ["b", "i", "kct"]},
                {targetWord: "yo", relatedWords: ["b", "i", "kct"]},
                {targetWord: "yo", relatedWords: ["b", "i", "kct", "dsfasdfasdfs", "dfas", "asdfsd", "sdfasd"]},
                {targetWord: "yo", relatedWords: ["b", "i", "kct"]},
                {targetWord: "yo", relatedWords: ["b", "i", "kct"]},
                {targetWord: "yo", relatedWords: ["b", "i", "kct"]},
                {targetWord: "yo", relatedWords: ["b", "i", "kct"]},
                {targetWord: "yo", relatedWords: ["b", "i", "kct"]},
            ]})
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

                {this.state.annotationItems.map((item: AnnotationItem, index: number) => {
                    console.log({x: index % columns, y: Math.floor(index / columns)});
                    return(
                        <div key={index.toString()}
                             data-grid={{x: index % columns, y: Math.floor(index / columns), w: 1, h: 1, static: true}}>
                            <AnnotationCard annotationItem={item} isAlreadyAnnotated={false}/>
                        </div>
                    )
                })}
            </ResponsiveGridLayout>
        );
    }
}

export default Annotation;
