import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
import firebase from '../config/fbfsConfig';
import StorageService from '../common/service/StorageService';

class Login extends Component{
    constructor(props){
        super(props);
        this.alerts = new AlertService();
        this.storage = new StorageService();
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }
    state ={
        user : null,
        password : null        
    }
    componentDidMount(){
        if(this.storage.getToken()!=null){
            this.props.history.push('/dashboard');
        }
    }
    
    credentials = (e) =>{       
        this.setState({
            [e.target.id] : e.target.value
        });
    }   

    submits = (e) =>{
        e.preventDefault();
        if(this.state.user && this.state.password !== null){           
            this.auth.signInWithEmailAndPassword(this.state.user,this.state.password).then( credt => {
                console.log(credt.user);       
                this.storage.setUID(credt.user.uid);
                this.storage.setToken(credt.user.l);
                this.props.history.push('/dashboard');
              }).catch(err=> this.alerts.snack(err.message,'red'));
        }else{
            this.alerts.snack('All fields are required.','red');            
        }
    }
    render(){        
        const loginForm = (
        

        <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                   
                        
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header justify-content-center">
                            <h1 className="font-weight-light my-4 text-center">Inventory Management System</h1>
                                </div>
                            <div className="card-body">
                            <h3 className="font-weight-light my-4">Login</h3>
                                <form id="login-form" onSubmit={this.submits}>
                                    
                                    <div className="form-group">
                                        <label className="small mb-1" htmlFor="inputEmailAddress">Email</label>                                        
                                        <input className="form-control py-4" id="user" type="email" onChange={this.credentials} />                                        
                                    </div>
                                
                                    <div className="form-group">
                                        <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                          <input className="form-control py-4" id="password" type="password" onChange={this.credentials} />
                                    </div>
                                    
                                    <div className="form-group">
                                        <div className="custom-control custom-checkbox">
                                            <input className="custom-control-input" id="rememberPasswordCheck" type="checkbox" />
                                            <label className="custom-control-label" htmlFor="rememberPasswordCheck">Remember password</label>
                                        </div>
                                    </div>
                                
                                    <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                        <a className="small" href="auth-password-basic.html">Forgot Password?</a>
                                        <button className="btn btn-primary" type="submit">Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center">
                                <div className="small"><a href="auth-register-basic.html">Need an account? Sign up!</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>            
        </div>
        <div id="layoutAuthentication_footer">
        <footer className="footer mt-auto footer-dark">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 small">Copyright &#xA9; Radi & Sparrow 2020</div>
                    <div className="col-md-6 text-md-right small">
                        <a href="#!">Privacy Policy</a>
                        &#xB7;
                        <a href="#!">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
        </div>
        </div>
        );

        return(
        <div className="bg-primary">             
            {loginForm}
        </div>       
        );
    }
}

export default Login;