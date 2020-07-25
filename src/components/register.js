import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
//import firebase from '../config/firebase.Config';
import { validation } from '../common/service/Validation/validation';

class Register extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            user: {
                firstName: null,
                lastName:null,
                address: null,
                phoneNumber: null,
                email: null,
                userName: null,
                password: null,
                confirmPassword: null,
                role:null
            },
 
        };
        this.credentials = this.credentials.bind(this);
        this.submits = this.submits.bind(this);
        this.goBack = this.goBack.bind(this);
        
        this.alerts = new AlertService();
    }

    credentials(event) {    
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    submits(event) { 
        event.preventDefault();
        const { user} = this.state;
        if(validation.registerValidation(user)){
        }
    }

        goBack(){
            this.props.history.goBack()
        }

    render() {
        const { user} = this.state;
        return (
            <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                <header class="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                        <div class="container-fluid">
                            <div class="page-header-content">
                                <div class="row align-items-center justify-content-between pt-3">
                                    <div class="col-auto mb-3">
                                        <h1 class="page-header-title">
                                            <div class="page-header-icon"><i data-feather="user"></i></div>
                                            Registration
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div class="card-header justify-content-center"><h3 class="font-weight-light my-4">Create Account</h3></div>
                                <div className="card-body">
                                    <form id="login-form" onSubmit={this.submits}>
                                    <div class="form-row">
                                    <div class="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputFirstName">First Name</label>                                        
                                            <input id="firstName" type="text" name="firstName" value={user.firstName} className="form-control" onChange={this.credentials} />                                        
                                        </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                                            <input id="lastName" type="text" name="lastName" value={user.lastName} className="form-control " onChange={this.credentials} />
                                        </div>
                                        </div>
                                        </div>
                                        <div class="form-row">
                                        <div class="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputAddress">Address</label>                                        
                                            <input id="address" type="text" name="address" value={user.address} className="form-control " onChange={this.credentials} />
                                        </div> </div>
                                        <div class="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputPhoneNumber">Phone Number</label>
                                            <input id="phoneNumber" type="text" name="phoneNumber" value={user.phoneNumber} className="form-control " onChange={this.credentials} />
                                        </div>
                                        </div>
                                        </div>
                                        <div class="form-row">
                                    <div class="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                            <input id="email" type="text" name="email" value={user.email} className="form-control" onChange={this.credentials} />
                                        </div> </div>
                                        <div class="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputUserName">User Name</label>
                                            <input id="userName" type="text" name="userName" value={user.userName} className="form-control" onChange={this.credentials} />
                                        </div>
                                        </div>
                                        </div>
                                        <div class="form-row">
                                    <div class="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                            <input id="password" type="password" name="password" value={user.password} className="form-control" onChange={this.credentials} />
                                        </div>
                                        </div>
                                        <div class="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputConfrimPassword">Confirm Password</label>
                                            <input id="confirmPassword" type="password" name="confirmPassword" value={user.confirmPassword} className="form-control" onChange={this.credentials} />
                                        </div>
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-group">       
                                        <label className="small mb-1" htmlFor="inputRole">Role</label>                                 
                                        <select onChange={this.credentials}  value={user.role} name="role" className="form-control">
                                        <option value="-1">--Select--</option>
                                        <option value="A">Staff</option>
                                        <option value="B">User</option>
                                                </select>                
                                        </div>
                                        </div>
                                        <div class="form-group mt-4 mb-0"> <button className="btn btn-primary btn-block" href="auth-login-basic.html">Create Account</button></div>
                                        
                                    </form>
                                </div>
                                {/* <div className="card-footer text-center">
                                <Link  to="/login"> <div className="small">Already registered Sign in!</div></Link>
                                </div> */}
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
    }
}

export default Register;