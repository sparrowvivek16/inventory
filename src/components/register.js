import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
import StorageService from '../common/service/StorageService';
import firebase from '../config/firebase.Config';
import { validations } from '../common/validations';
import ReactDatatable from '@ashvin27/react-datatable';
import { commonService } from '../common/service/CommonService';
import Switch from 'react-toggle-switch';
import feather from 'feather-icons';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: '',
            },
            userList: [],

        };
        this.ViewInit();
        this.credentials = this.credentials.bind(this);
        this.storage = new StorageService();
        this.auth = firebase.auth();
        this.db = firebase.firestore();
        this.alerts = new AlertService();
    }


    ViewInit() {
        this.config = {
            page_size: 10,
            length_menu: [10, 25, 50],
            button: {
                excel: false,
                print: false,
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
                key: "status", text: "Status", className: "Status", align: "left", sortable: true,
            },
            {
                key: "action", text: "Action", className: "Action", width: 100, align: "left", sortable: false,
                cell: record => {
                    return (
                        <div>
                            <Switch onClick={() => this.toggleSwitch(record)} on={record.status} className="btn btn-primary btn-sm" >
                                <i className="fa fa-toggle-off"></i>
                            </Switch></div>
                    );
                }
            }
        ];
    }

    toggleSwitch(record) {
        let tempRec;
        let email = record.email;
        record.status === 'active' ? tempRec = false : tempRec = true;
        let id = record.id;
        commonService.toggleUsers(tempRec, id).then(data => {
            this.reloadPage();
            if (tempRec === false) {
                this.alerts.success(`${email} deactivated successfully`);
            } else {
                this.alerts.success(`${email} activated successfully`);
            }
        }).catch(err => this.alerts.error(err));
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

    registration = (e) => {
        e.preventDefault();
        const { user } = this.state;
        if (validations.registerValidation(user)) {
            commonService.addEmail(user).then(data => {
                let id = data.user.uid;
                if (data) {
                    commonService.createUsers(user, id)
                        .then(data =>
                            this.alerts.success('Successfully Registered'))
                        .catch(err => this.alerts.error(err));
                    this.reloadPage();
                } else {
                    this.alerts.error('Error in adding user email')
                }
            }).catch(err => this.alerts.error(err));
        }
    }

    reloadPage() {
        this.getAllUsers();
    }


    status(data) {
        if (data) {
            return "active";
        } else {
            return "deactive";
        }
    }

    getAllUsers() {
        commonService.getUsers().then(data => {
            let datas = [];
            data.docs.forEach(doc => {
                datas.push({
                    id: doc.id,
                    firstName: doc.data().firstName,
                    lastName: doc.data().lastName,
                    address: doc.data().address,
                    phoneNumber: doc.data().phoneNumber,
                    email: doc.data().email,
                    role: doc.data().role,
                    status: this.status(doc.data().status),
                });
            });
            this.setState({
                userList: datas
            });
        }).catch(err => this.alerts.error(err));
    }

    resetInput(user) {
        this.setState({
            user: {
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: ''
            }
        });
    }

    tableAction() {
        this.getAllUsers();

    }

    componentDidMount() {
        this.getAllUsers();
        feather.replace();
    }

    render() {
        const { user } = this.state;
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
                                            <form id="login-form" onSubmit={this.registration}>
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
                                                            <label className="small mb-1" htmlFor="inputRole">Role</label>
                                                            <select onChange={this.credentials} value={user.role} name="role" className="form-control">
                                                                <option value="-1">--Select--</option>
                                                                <option >admin</option>
                                                                <option >user</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                                            <input id="email" type="text" name="email" value={user.email} className="form-control" onChange={this.credentials} />
                                                        </div> </div>
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
                                            onChange={(data) => this.tableAction(data)}
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