import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from "./firebase.config";



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}




function App() {
  const [user, setUser] = useState({});
  const provider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const gitProvider = new firebase.auth.GithubAuthProvider();

  const handelGoogleSignIn = () => {
        firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setUser(user);

      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email);
      });
  }

  const handelFacebookSignIn = () =>{
        firebase
        .auth()
        .signInWithPopup(fbProvider)
        .then((result) => {
          var credential = result.credential;
          var user = result.user;
          var accessToken = credential.accessToken;
          console.log('Fb user', user);
          setUser(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
  }

    const handelGithubSignIn = () =>{
          firebase
      .auth()
      .signInWithPopup(gitProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        setUser(user);
        console.log('Git user', user);
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log('error', errorCode, errorMessage, email, credential);
      });
    }
  return (
    <div className="App">
      <button onClick={handelGoogleSignIn}>Sign in using Google</button>
      <br/>
      <button onClick={handelFacebookSignIn}>Sign in using Facebook</button>
      <br/>
      <button onClick={handelGithubSignIn}>Sign in using Github</button>
      <h3>User: {user.displayName}</h3>
      <img src={user.photoURL} alt=""/>
    </div>
  );
}

export default App;
