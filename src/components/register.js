import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
import firebase from '../config/firebase.Config';
import { validation } from '../common/Validation/validation';

class Register extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            user: {
                firstName: '',
                lastName:'',
                address: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
                role:''
            },
            userList:[],

        };
        this.credentials = this.credentials.bind(this);
        this.submits = this.submits.bind(this);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
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
            this.auth.createUserWithEmailAndPassword(user.email,user.password).then((data)=>{
           console.log(data);
           this.db.collection("users").add({
            firstName: user.firstName,
            lastName:  user.lastName,
            address:  user.address,
            phoneNumber:  user.phoneNumber,
            email:  user.email,
            role:  user.role,
        }).then((data) => {
           console.log(data);
           this.alerts.snack('Successfully Registered','green')
           this.resetInput(user);
        }).catch((error) => {
           this.alerts.snack(error.message,'red')
       })
            }).catch((error) => {
                this.alerts.snack(error.message,'red')
            })           
    }
}
   resetInput(user){
    this.setState({  
        user: {
            firstName: '',
            lastName:'',
            address: '',
            phoneNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            role:''
        }});
    }

        getAllUsers(){
            const {userList} = this.state;
            this.db.collection("users")
            .get()
            .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc => doc.data());
              console.log(data);
              this.setState({userList:data})
              console.log(userList);
            });
            }


        componentDidMount(){
            this.getAllUsers();
        }

    render() {
        const { user} = this.state;
        return (
            <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                        <div className="container-fluid">
                            <div className="page-header-content">
                                <div className="row align-items-center justify-content-between pt-3">
                                    <div className="col-auto mb-3">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i data-feather="user"></i></div>
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
                            <div className="card-header justify-content-center"><h3 className="font-weight-light my-4">Create Account</h3></div>
                                <div className="card-body">
                                    <form id="login-form" onSubmit={this.submits}>
                                    <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputFirstName">First Name</label>                                        
                                            <input id="firstName" type="text" name="firstName" value={user.firstName} className="form-control" onChange={this.credentials} />                                        
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                                            <input id="lastName" type="text" name="lastName" value={user.lastName} className="form-control " onChange={this.credentials} />
                                        </div>
                                        </div>
                                        </div>
                                        <div className="form-row">
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputAddress">Address</label>                                        
                                            <input id="address" type="text" name="address" value={user.address} className="form-control " onChange={this.credentials} />
                                        </div> </div>
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputPhoneNumber">Phone Number</label>
                                            <input id="phoneNumber" type="text" name="phoneNumber" value={user.phoneNumber} className="form-control " onChange={this.credentials} />
                                        </div>
                                        </div>
                                        </div>
                                        <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                            <input id="email" type="text" name="email" value={user.email} className="form-control" onChange={this.credentials} />
                                        </div> </div>
                                        <div className="col-md-6">
                                        <div className="form-group">       
                                        <label className="small mb-1" htmlFor="inputRole">Role</label>                                 
                                        <select onChange={this.credentials}  value={user.role} name="role" className="form-control">
                                        <option value="-1">--Select--</option>
                                        <option >Staff</option>
                                        <option >User</option>
                                                </select>                
                                        </div>
                                        </div>
                                        </div>
                                        <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputPassword">Password</label>
                                            <input id="password" type="password" name="password" value={user.password} className="form-control" onChange={this.credentials} />
                                        </div>
                                        </div>
                                        <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="small mb-1" htmlFor="inputConfrimPassword">Confirm Password</label>
                                            <input id="confirmPassword" type="password" name="confirmPassword" value={user.confirmPassword} className="form-control" onChange={this.credentials} />
                                        </div>
                                        </div>
                                        </div>
                                        <div className="form-group mt-4 mb-0"> <button className="btn btn-primary btn-block" href="auth-login-basic.html">Create Account</button></div>
                                        
                                    </form>
                                </div>
                                {/* <div className="card-footer text-center">
                                <Link  to="/login"> <div className="small">Already registered Sign in!</div></Link>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
                        <div class="card mb-4">
                            <div class="card-header">User List</div>
                            <div class="card-body">
                                <div class="datatable">
                                    <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                                        <thead>
                                            <tr>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Address</th>
                                                <th>Phone Number</th>
                                                <th>Email</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tiger Nixon</td>
                                                <td>System Architect</td>
                                                <td>Edinburgh</td>
                                                <td>61</td>
                                                <td>2011/04/25</td>
                                                <td>$320,800</td>
                                                <td><div class="badge badge-primary badge-pill">Full-time</div></td>
                                                <td>
                                                    <button class="btn btn-datatable btn-icon btn-transparent-dark mr-2"><i data-feather="more-vertical"></i></button>
                                                    <button class="btn btn-datatable btn-icon btn-transparent-dark"><i data-feather="trash-2"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
            </main>            
            </div>
            </div>
        );
    }
}

export default Register;