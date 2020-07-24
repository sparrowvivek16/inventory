import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class DashboardSidebar extends Component{

    render(){
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
                                <div className="sidenav-menu-heading">Admin</div>                               
                                <NavLink className="nav-link" to="/register">
                                    <div className="nav-link-icon"><i data-feather="plus"></i></div>
                                    New User
                                </NavLink>                                           
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