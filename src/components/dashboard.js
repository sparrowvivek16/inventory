import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
import firebase from '../config/firebase.Config';
import StorageService from '../common/service/StorageService';

class Dashboard extends Component{

    constructor(props){
        super(props);
        this.alerts = new AlertService();
        this.storage = new StorageService();
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }

   
    componentDidMount(){
        if(this.storage.getToken()==null){
            this.props.history.push('/login');
        }
    }

    render(){        
        return (
                 <header className="page-header page-header-dark bg-gradient-primary-to-secondary pb-10">
                        <div className="container">
                            <div className="page-header-content pt-4">
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-auto mt-4">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i data-feather="activity"></i></div>
                                            Dashboard
                                        </h1>
                                        <div className="page-header-subtitle">Manage your multiple warehouse all at one place.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
        );
    }
}

export default Dashboard;