import firebase, {User} from "firebase";
import AnnotationItem from "../entities/AnnotationItem";


export async function getAllCollection(): Promise<Array<AnnotationItem>> {
    const collectionSnapshot = await firebase.database()
        .ref('collection')
        .once('value');

    const annotationCollection: Array<AnnotationItem> = [];
    collectionSnapshot.forEach((childSnapshot) => {
        annotationCollection.push(childSnapshot.val());
    });

    return annotationCollection;
}


export async function getUserAnnotations(user: User): Promise<Array<AnnotationItem>> {
    const annotationSnapshot = await firebase.database()
        .ref('annotations')
        .child(user.uid)
        .once('value');

    const annotationCollection: Array<AnnotationItem> = [];
    annotationSnapshot.forEach((childSnapshot) => {
        annotationCollection.push(childSnapshot.val());
    });

    return annotationCollection;
}

export function listenToUserAnnotations(user: User, callback: Function): void {
    firebase.database()
        .ref('annotations')
        .child(user.uid)
        .on('value', annotationSnapshot => {
            const annotationCollection: Array<AnnotationItem> = [];
            annotationSnapshot.forEach((childSnapshot) => {
                annotationCollection.push(childSnapshot.val());
            });

            callback(annotationCollection);
        });
}

export async function saveAnnotation(user: User, annotation: AnnotationItem): Promise<void> {
    await firebase.database()
        .ref('annotations')
        .child(user.uid)
        .child(annotation.targetWord)
        .update(annotation);
}
