import AnnotationCard from "./AnnotationCard";
import React from "react";
// @ts-ignore
import {Responsive, WidthProvider} from 'react-grid-layout';
import AnnotationItem from "../entities/AnnotationItem";
import {getAllCollection} from '../api/AnnotationService';

interface Props {
}

interface State {
    annotationItems: Array<AnnotationItem>,
}


class Annotation extends React.Component<Props, State> {
    state = {annotationItems: []};

    async componentDidMount() {
        const annotationCollection = await getAllCollection();
        this.setState({annotationItems: annotationCollection});
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
