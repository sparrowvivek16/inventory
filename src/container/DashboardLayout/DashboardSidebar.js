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
        const { isAdmin } = this.state;
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
                            {isAdmin && <div className="sidenav-menu-heading">Admin</div>}
                            {isAdmin && <NavLink className="nav-link" to="/register">
                                <div className="nav-link-icon"><i data-feather="plus"></i></div>
                                    New User
                                </NavLink>}
                        </div>
                    </div>
                    <div className="sidenav-footer">
                        <div className="sidenav-footer-content">
                            <div className="sidenav-footer-subtitle">Logged in as:</div>
                            <div className="sidenav-footer-title">Valerie Luna</div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

}

export default DashboardSidebar;