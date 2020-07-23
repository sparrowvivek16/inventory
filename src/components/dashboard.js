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
    componentDidMount(){
        if(this.storage.getToken()==null){
            this.props.history.push('/login');
        }
    }

    render(){        
        return (
            <div id="layoutSidenav_content">
                <div className="container header">
                        <div className="row">
                            <div className="col-xxl-4 col-xl-12 mb-4">
                                <div className="card h-100">
                                    <div className="card-body h-100 d-flex flex-column justify-content-center py-5 py-xl-4">
                                        <div className="row align-items-center">
                                            <div className="col-xl-8 col-xxl-12">
                                                <div className="text-center px-4 mb-4 mb-xl-0 mb-xxl-4">
                                                    <h1 className="text-primary">this is dashboard</h1>
                                                    <button className="btn btn-dark" type="button" onClick={this.logout}>logout</button>
                                                </div>
                                            </div>
                                            <div className="col-xl-4 col-xxl-12 text-center"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Dashboard;