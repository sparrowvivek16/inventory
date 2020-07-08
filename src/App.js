import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import Login from './components/login';
import Profile from './components/profile';
import firebase from './config/fbfsConfig';

const auth = firebase.auth();
const db = firebase.firestore();

class App extends Component{

  checkUser(data){    
    auth.signInWithEmailAndPassword(data.user,data.password).then( credt => {
      console.log(credt.user,'yes');
    }).catch(err=> console.log(err));
  }

  render(){
      return (
        <BrowserRouter>
        <div className="Section">
        {/* <Login checkUser={this.checkUser} snack={this.snack} /> */}
        <Profile />
        </div>
        </BrowserRouter>
      );  
    }

  /* Fuctional tools 
  ------------------
  Below functions are for changing or interacting with UI only.
  */
  snack(message){
      const snackbar = document.createElement('div');
      snackbar.classList.add('snackbar');
      document.querySelector('body').appendChild(snackbar);
      snackbar.textContent = message;
      snackbar.classList.add('active');
      setTimeout(() => {
        snackbar.classList.remove('active');
      }, 6000);
  }  
}

export default App;
