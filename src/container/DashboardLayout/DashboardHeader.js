import React, { Component } from 'react';


class DashboardHeader extends Component{
    render(){
        return (
            <nav className="topnav navbar navbar-expand shadow navbar-light bg-white" id="sidenavAccordion">
            <a className="navbar-brand" href="index.html">IMS</a>
            <button className="btn btn-icon btn-transparent-dark order-1 order-lg-0 mr-lg-2" id="sidebarToggle" href="#"><i data-feather="menu"></i></button>
           
            <ul className="navbar-nav align-items-center ml-auto">
                <li className="nav-item dropdown no-caret mr-3 dropdown-notifications">
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
                </li>
                <li className="nav-item dropdown no-caret mr-2 dropdown-user">
                    <a className="btn btn-icon btn-transparent-dark dropdown-toggle" id="navbarDropdownUserImage" href="#!" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img className="img-fluid" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="some img"/></a>
                    <div className="dropdown-menu dropdown-menu-right border-0 shadow animated--fade-in-up" aria-labelledby="navbarDropdownUserImage">
                        <h6 className="dropdown-header d-flex align-items-center">
                            <img className="dropdown-user-img" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" alt="user img" />
                            <div className="dropdown-user-details">
                                <div className="dropdown-user-details-name">Valerie Luna</div>
                                <div className="dropdown-user-details-email">vluna@aol.com</div>
                            </div>
                        </h6>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#!">
                            <div className="dropdown-item-icon"><i data-feather="settings"></i></div>
                            Account
                        </a>
                        <a className="dropdown-item" href="#!">
                            <div className="dropdown-item-icon"><i data-feather="log-out"></i></div>
                            Logout
                        </a>
                    </div>
                </li>
            </ul>
        </nav>
        );
    }
}

export default DashboardHeader;