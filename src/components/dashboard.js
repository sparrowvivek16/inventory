import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
import firebase from '../config/fbfsConfig';
import StorageService from '../common/service/StorageService';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.alerts = new AlertService();
        this.storage = new StorageService();
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

    logout = () =>{
        this.auth.signOut().then(() =>{
            this.storage.logOut();
            this.props.history.push('/login');
        }).catch(err => console.log(err));        
    }

    render(){
        if(this.storage.getToken()==null){
            this.props.history.push('/login');
        }
        return (
            <div className="container">
                <h2>this is dashboard</h2>
                <button className="btn grey" onClick={this.logout}>logout</button>
            </div>
        );
    }
}

export default Dashboard;