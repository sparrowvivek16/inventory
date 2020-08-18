import React, { Component } from 'react'
import { validations } from '../common/validation';
import { commonService } from '../common/CommonService';
import StorageService from '../common/service/StorageService';
import AlertService from '../common/service/AlertService';
import firebase from '../config/firebase.Config';

class profile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                email: '',
                password: '',
                role: '',
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
            id: '',
            image: '',
        }
        this.storage = new StorageService();
        this.alerts = new AlertService();
        this.auth = firebase.auth();
    }


    credentials = (e) => {
        const { name, value } = e.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    updateProfile = (e) => {
        e.preventDefault();
        const { user, id } = this.state;
        let email = user.email;
        let uid = id;
        if (validations.profileValidation(user)) {
            commonService.updateUsers(user, uid)
                .then(() => {
                    this.alerts.success(`${email} updated successfully`);
                })
                .catch(err => this.alerts.error(err));
        }
    }



    componentDidMount() {
        this.getUserCredentials();
        let id = this.storage.getUID();
        this.setState(
            { id: id }, () => this.initLoad());
    }

    initLoad() {
        this.getProfileById();
    }

    getUserCredentials() {
        this.auth.onAuthStateChanged(user => {
            if (user) {
            }
        });
    }

    getProfileById() {
        let id = this.state.id;
        commonService.getProfileById(id)
            .then(data => {
                this.setViewData(data);
            })
            .catch(err => this.alerts.error(err));
    }

    setViewData(data) {
        if (data) {
            this.setState({
                user: {
                    firstName: data.data().firstName,
                    lastName: data.data().lastName,
                    address: data.data().address,
                    phoneNumber: data.data().phoneNumber,
                    email: data.data().email,
                    role: data.data().role,
                }
            });
        }
    }

    changePassword = (e) => {
        e.preventDefault();
        const { user } = this.state;
        let users = this.auth.currentUser;
        if (validations.updatePassword(user)) {
            let cred = firebase.auth.EmailAuthProvider.credential(
                user.email,
                user.currentPassword
            );
            users.reauthenticateWithCredential(cred)
                .then(() => {
                    users.updatePassword(user.newPassword)
                        .then(() => {
                            this.alerts.success(`Password updated successfully`);
                        })
                        .catch(err => this.alerts.error(err.message));
                })
                .catch(err => this.alerts.error(err.message));
        }
    }

    // handleChange = (e) => {
    //     this.setState({ image: e.target.files })
    // }

    // handleUpload = () => { 
    //     const {image} = this.state;
    //     const formData = new FormData(); 
    //     formData.append( "myFile", image,image.name 
    //     ); 
    //     console.log(image); 
    //     axios.post("api/uploadfile", formData); 
    //   }; 

    // handleUpload = (e) => {
    //     e.preventDefault();
    //     const { image } = this.state;
    //     let profilePic = 'profilePic';
    //     let file = image[0];
    //     let storageRef = firebase.storage().ref(`${profilePic}/${file.name}`)
    //     let uploadTask = storageRef.put(file)
    //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    //         () => {
    //             let downloadLink = uploadTask.snapshot.downloadURL
    //         })
    // }

    // showImage = () => {
    //     let storageRef = firebase.storage().ref()
    //     let spaceRef = storageRef.child('images/' + this.state.image[0].name)
    //     storageRef.child('image/' + this.state.image[0].name).getDownloadURL().then((url) => {
    //         document.getElementById('show').src = url
    //     })
    // }

    render() {
        const { user } = this.state;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                        <div className="container-fluid">
                            <div className="page-header-content">
                                <div className="row align-items-center justify-content-between pt-3">
                                    <div className="col-auto mb-3">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i data-feather="user"></i></div>
                                            Account Settings - Profile
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-xl-4">
                                <div className="card">
                                    <div className="card-header">Profile Picture</div>
                                    <div className="card-body text-center">
                                        <form >
                                            <img className="img-account-profile rounded-circle mb-2" src="https://source.unsplash.com/QAB-WJcbgJk/300x300" alt="" />
                                            <div className="small font-italic text-muted mb-4">JPG or PNG no larger than 5 MB</div>
                                            {/* <input type="file" onChange={this.handleChange} /> */}
                                            <button onClick={this.handleUpload} className="btn btn-primary" type="button" >Upload new image</button>
                                            {/* <button onClick={this.showImage} type="button" >show</button> */}
                                            <img id="show" alt="" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="card mb-4">
                                    <div className="card-header">Account Details</div>
                                    <div className="card-body">
                                        <form id="profileEdit" onSubmit={this.updateProfile}>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="small mb-1" htmlFor="inputFirstName">First Name</label>
                                                        <input id="firstName" type="text" name="firstName" value={user.firstName || ''} className="form-control" onChange={this.credentials} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="small mb-1" htmlFor="inputLastName">Last Name</label>
                                                        <input id="lastName" type="text" name="lastName" value={user.lastName || ''} className="form-control " onChange={this.credentials} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="small mb-1" htmlFor="inputAddress">Address</label>
                                                        <input id="address" type="text" name="address" value={user.address || ''} className="form-control " onChange={this.credentials} />
                                                    </div> </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="small mb-1" htmlFor="inputPhoneNumber">Phone Number</label>
                                                        <input id="phoneNumber" type="text" name="phoneNumber" value={user.phoneNumber || ''} className="form-control " onChange={this.credentials} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="small mb-1" htmlFor="inputRole">Role</label>
                                                        <input onChange={this.credentials} disabled={user.role} value={user.role || ''} name="role" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="small mb-1" htmlFor="inputEmail">Email</label>
                                                        <input id="email" disabled={user.email} type="text" name="email" value={user.email || ''} className="form-control" onChange={this.credentials} />
                                                    </div> </div>
                                            </div>
                                            <button className="btn btn-primary" type="submit">Save changes</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-8">
                                <div className="card mb-4">
                                    <div className="card-header">Change Password</div>
                                    <div className="card-body">
                                        <form onSubmit={this.changePassword}>
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="currentPassword">Current Password</label>
                                                <input className="form-control" name="currentPassword" type="password" value={user.currentPassword || ''} onChange={this.credentials} placeholder="Enter current password" />
                                            </div>
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="newPassword">New Password</label>
                                                <input className="form-control" name="newPassword" type="password" value={user.newPassword || ''} onChange={this.credentials} placeholder="Enter new password" />
                                            </div>
                                            <div className="form-group">
                                                <label className="small mb-1" htmlFor="confirmPassword">Confirm Password</label>
                                                <input className="form-control" name="confirmPassword" type="password" value={user.confirmPassword || ''} onChange={this.credentials} placeholder="Confirm new password" />
                                            </div>
                                            <button className="btn btn-primary" type="submit">Save</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}

export default profile;
