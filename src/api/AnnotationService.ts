import firebase, {User} from "firebase";
import AnnotationItem from "../entities/AnnotationItem";

export async function getAllCollection(): Promise<Array<AnnotationItem>> {
    const collectionSnapshot = await firebase.database()
        .ref('collection')
        .once('value');

    let annotationCollection: Array<AnnotationItem> = [];
    collectionSnapshot.forEach((childSnapshot) => {
        annotationCollection.push(childSnapshot.val());
    });

    return annotationCollection;
}

export async function saveAnnotation(user: User, annotation: AnnotationItem): Promise<void> {
    console.log({userId: user.uid});

    await firebase.database()
        .ref('annotations')
        .child(user.uid)
        .child(annotation.targetWord)
        .update(annotation);
}
