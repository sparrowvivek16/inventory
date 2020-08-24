import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { validations } from '../common/validation';
import firebase from '../config/firebase.Config';
import { commonService } from '../common/service/CommonService';
import AlertService from '../common/service/AlertService';

class forgetPassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
        }
        this.auth = firebase.auth();
        this.alerts = new AlertService();
    }

    credentials = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    forgetPassword = (e) => {
        e.preventDefault();
        const { email } = this.state;
        if (validations.forgetPasswordValidation(email)) {
            commonService.updatePassword(email)
                .then(() => {
                    this.alerts.success(`Change Password Link has been sent to your Email`);
                    this.props.history.push('/login');
                })
                .catch(err => this.alerts.error('Email not found'));
        }

    }

    render() {
        const { email } = this.state;
        return (
            <div className="bg-primary">
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-5">
                                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                                        <div className="card-header justify-content-center">
                                            <h3 className="font-weight-light my-4">Password Recovery</h3></div>
                                        <div className="card-body">
                                            <div className="small mb-3 text-muted">Enter your email address and we will send you a link to reset your password.</div>
                                            <form id="forget-password" onSubmit={this.forgetPassword}>
                                                <div className="form-group">
                                                    <label className="small mb-1" for="inputEmailAddress">Email</label>
                                                    <input className="form-control py-4" id="email" type="text" aria-describedby="emailHelp" name="email" value={email} placeholder="Enter email address" onChange={this.credentials} />
                                                </div>
                                                <div className="form-group d-flex align-items-center justify-content-between mt-4 mb-0">
                                                    <Link to="/login">Return to login</Link>
                                                    <button className="btn btn-primary" type="submit">Reset Password</button>
                                                </div>
                                            </form>
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
                                    <Link to="/privacyPolicy">Privacy Policy</Link>
                        &#xB7;
                        <Link to="/termsAndConditions">Terms &amp; Conditions</Link>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            </div>
        )
    }
}

export default forgetPassword;
