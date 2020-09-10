import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import StorageService from "../../common/service/StorageService";

class DashboardSidebar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAdmin: false,
        }
        this.storageService = new StorageService();
    }

    componentDidMount() {
        let role = this.storageService.getRole();
        if (role === "admin") {
            this.setState({ isAdmin: true });
        }
    }

    render() {
        const { isAdmin } = this.state;
        return (
            <div id="layoutSidenav_nav">
                <nav className="sidenav shadow-right sidenav-light">
                    <div className="sidenav-menu">
                        <div className="nav accordion" id="accordionSidenav">
                            <div className="sidenav-menu-heading">User</div>
                            <NavLink className="nav-link" to="/dashboard">
                                <div className="nav-link-icon"><i data-feather="activity"></i></div>
                                    Dashboard
                                </NavLink>
                            <NavLink className="nav-link" to="/newitem">
                                <div className="nav-link-icon"><i data-feather="plus-square"></i></div>
                                    New Item
                                </NavLink>
                            <NavLink className="nav-link" to="/settings">
                                <div className="nav-link-icon"><i data-feather="settings"></i></div>
                                    Settings
                                </NavLink>
                            {isAdmin && <div>
                                <div className="sidenav-menu-heading">Admin</div>
                                <NavLink className="nav-link" to="/register">
                                    <div className="nav-link-icon"><i data-feather="plus"></i></div>
                                    New User
                                </NavLink>
                                <div className="sidenav-menu-heading">Orders</div>
                                <NavLink className="nav-link" to="/addCustomer">
                                    <div className="nav-link-icon"><i data-feather="plus"></i></div>
                                    Customers
                                </NavLink>
                                <NavLink className="nav-link" to="/addVendors">
                                    <div className="nav-link-icon"><i data-feather="plus"></i></div>
                                    Vendors
                                </NavLink>
                                <NavLink className="nav-link" to="/orderDetails">
                                    <div className="nav-link-icon"><i data-feather="plus"></i></div>
                                   Order Details
                                </NavLink>
                            </div>}
                        </div>
                    </div>
                    {/* <div className="sidenav-footer">
                        <div className="sidenav-footer-content">
                            <div className="sidenav-footer-subtitle">Logged in as:</div>
                            <div className="sidenav-footer-title">Valerie Luna</div>
                        </div>
                    </div> */}
                </nav>
            </div>
        );
    }

}

export default DashboardSidebar;