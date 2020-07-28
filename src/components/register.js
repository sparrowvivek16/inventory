import React, { Component,Fragment } from 'react';
import AlertService from '../common/service/AlertService';
import firebase from '../config/firebase.Config';
import { validation } from '../common/validation';
import ReactDatatable from '@ashvin27/react-datatable';
import { commonService } from '../common/service/CommonService';

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
        this.ViewInit();
        this.credentials = this.credentials.bind(this);
        this.submits = this.submits.bind(this);
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.alerts = new AlertService();
    }
    

    ViewInit(){
        this.config = {
          page_size: 10,
          length_menu: [ 2,10,25,50 ],
           button: {
                excel: true,
                print: true,
                extra: true,
            }
      }
      
          this.columns = [
            {
                key: "firstName", text: "First Name", className: "First Name", align: "left", sortable: true,
            },
            {
              key: "lastName", text: "Last Name", className: "Last Name", align: "left", sortable: true,
            },
           {
            key: "address", text: "Address", className: "Address", align: "left", sortable: true,
           },
           {
            key: "phoneNumber", text: "Phone Number", className: "Phone Number", align: "left", sortable: true,
           },
           {
            key: "email", text: "Email", className: "Email", align: "left", sortable: true,
            },
            {
                key: "role", text: "Role", className: "Role", align: "left", sortable: true,
             },
           {
              key: "action", text: "Action",className: "Action",  width: 100, align: "left" ,sortable: false,
                cell: record => { 
                    return (
                        <Fragment>
                             <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];

        this.extraButtons =[
            {
                className:"btn btn-primary buttons-pdf",
                title:"Export TEst",
                children:[
                    <span>
                    <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
                    </span>
                ],
                onClick:(event)=>{
                    console.log(event);
                },
            },
            {
                className:"btn btn-primary buttons-pdf",
                title:"Export TEst",
                children:[
                    <span>
                    <i className="glyphicon glyphicon-print fa fa-print" aria-hidden="true"></i>
                    </span>
                ],
                onClick:(event)=>{
                    console.log(event);
                },
                onDoubleClick:(event)=>{
                    console.log("doubleClick")
                }
            },
        ]
      }

      editRecord(record) {
              this.setState({  user : {
                firstName: record.firstName,
                lastName: record.lastName,
                address: record.address,
                phoneNumber: record.phoneNumber,
                email: record.email,
                role: record.role,
              }
            });
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
        commonService.AddEmail(user).then(() =>{
            // this.alerts.snack('Successfully Added','bg-green');ed
            
            commonService.createUsers(user).then(()=>{
                this.alerts.snack('Successfully Registered','bg-green');
            });

       });
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

    tableAction(){
       this.getAllUsers();
      }

        getAllUsers(){
            //const {userList} = this.state;
            this.db.collection("users")
            .get()
            .then(querySnapshot => {
              const data = querySnapshot.docs.map(doc => doc.data());
              console.log(data);
              this.setState({
                  ...this.state,
                  userList: data
                });
                console.log(this.state);
            });
            }


        componentDidMount(){
            this.getAllUsers();
        }

    render() {
        const {user} = this.state;
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
                        <div className="col-lg-12">
                            <div className="card shadow-lg border-0 rounded-lg mt-3">
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
                                            <div className="col-md-6 form-group text-right"> 
                                                <button className="btn btn-primary btn-block" href="auth-login-basic.html">Create Account</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div className="card shadow-lg border-0 rounded-lg  mt-3">
                                <div className="card-header">User List</div>
                                <div className="card-body">
                                    <div className="datatable">
                                    <ReactDatatable
                                            config={this.config}
                                            records={this.state.userList}
                                            columns={this.columns}
                                            extraButtons={this.extraButtons}
                                            onChange={(data)=>this.tableAction(data)}
                                        />
                                    </div>
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