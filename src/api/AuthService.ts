import firebase from 'firebase';
import {User} from "firebase";

export function getCurrentUser(): User | null {
    return firebase.auth().currentUser;
}
