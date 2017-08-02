import Rebase from 're-base';
import firebase, { database } from 'firebase';

let app = firebase.initializeApp({
    apiKey: 'AIzaSyCpOKNd2Ik3OgRAryOqTXvK8dpi9m76PdE',
    authDomain: 'poised-rock-154320.firebaseapp.com',
    databaseURL: 'https://poised-rock-154320.firebaseio.com',
    projectId: 'poised-rock-154320'
});

let isSigned = false;
app.auth().onAuthStateChanged((user) => {
    if (user) isSigned = true;
    else isSigned = false;
    console.log("user: ", user, "and", isSigned)
});

let db = database(app);
let base = Rebase.createClass(db);

export default base;