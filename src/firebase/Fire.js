import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyCp5SMxTd29SYG8OAMd4aiLlsgQxbp2IxQ",
    authDomain: "relationaldb-7117d.firebaseapp.com",
    databaseURL: "https://relationaldb-7117d.firebaseio.com",
    projectId: "relationaldb-7117d",
    storageBucket: "relationaldb-7117d.appspot.com",
    messagingSenderId: "426197231810",
    appId: "1:426197231810:web:b3d7295c153bbd367ab35b"
};

const fire=firebase.initializeApp(firebaseConfig);

export default fire;