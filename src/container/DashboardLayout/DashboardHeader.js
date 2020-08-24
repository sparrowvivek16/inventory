import React, { Component } from 'react';
import firebase from '../../config/firebase.Config';
import StorageService from '../../common/service/StorageService';
import { commonService } from '../../common/CommonService';
import image from '../../assets/img/empty.jpg'; 

class DashboardHeader extends Component {
    constructor(props) {
        super(props)
            this.state = {
                user: {
                    firstName: '',
                    email: '',
                },
                id: '',
                imageUrl: '',

        }
        this.auth = firebase.auth();
        this.storage = new StorageService();
    }


    logout = () => {
        this.auth.signOut().then(() => {
            this.storage.logOut();
            this.props.history.push('/login');
        }).catch(err => console.log(err));
    }

    account = () => {
        this.props.history.push('/profile')
    }

    //open or collapse sidebar
    sidebarClick = (e) => {
        e.preventDefault();
        document.querySelector("body").classList.toggle("sidenav-toggled");
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
                imageUrl: data.data().image,
                user: {
                    firstName: data.data().firstName,
                    email: data.data().email,
                },
            });
        }
    }

    render() {
        const { user, imageUrl } = this.state;
        return (
            <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
                <a className="navbar-brand" href="#!">IMS</a>
                <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" id="sidebarToggle" href="#" onClick={this.sidebarClick}><i data-feather="menu"></i></button>

                <ul className="navbar-nav align-items-center ml-auto">
                    {/* <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownAlerts" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i data-feather="bell"></i></a>
                        <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownAlerts">
                            <h6 className="dropdown-header dropdown-notifications-header">
                                <i className="mr-2" data-feather="bell"></i>
                            Alerts Center
                        </h6>
                            <a className="dropdown-item dropdown-notifications-item" href="#!">
                                <div className="dropdown-notifications-item-icon bg-warning"><i data-feather="activity"></i></div>
                                <div className="dropdown-notifications-item-content">
                                    <div className="dropdown-notifications-item-content-details">December 29, 2019</div>
                                    <div className="dropdown-notifications-item-content-text">This is an alert message. It&apos;s nothing serious, but it requires your attention.</div>
                                </div>
                            </a>
                            <a className="dropdown-item dropdown-notifications-footer" href="#!">View All Alerts</a>
                        </div>
                    </li> */}
                    <li className="nav-item dropdown no-caret mr-2 dropdown-user">
                        <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {imageUrl ?   <img className="img-fluid" src={imageUrl} alt="user img" />:
                            <img className="dropdown-user-img" src={image} alt="user img" />}</a>
                        <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                            <h6 className="dropdown-header d-flex align-items-center">
                            {imageUrl ?   <img className="dropdown-user-img" src={imageUrl} alt="user img" />:
                            <img className="dropdown-user-img" src={image} alt="user img" />}
                                <div className="dropdown-user-details">
                                    <div className="dropdown-user-details-name">{user.firstName}</div>
                                    <div className="dropdown-user-details-email">{user.email}</div>
                                </div>
                            </h6>
                            <div className="dropdown-divider"></div>
                            <button className="dropdown-item"  onClick={this.account}>
                            {/* <div className="dropdown-item" > */}
                                <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                            Account
                        </button>
                        <button className="dropdown-item" onClick={this.logout}>
                                <div className="dropdown-item-icon"><i data-feather="log-out"></i></div>
                            Logout
                            </button>
                        </div>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default DashboardHeader;