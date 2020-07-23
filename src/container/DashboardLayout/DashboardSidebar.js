import React, { Component } from 'react';

class DashboardSidebar extends Component{

    render(){
        return (
           
                <div id="layoutSidenav_nav">
                    <nav className="sidenav shadow-right sidenav-light">
                        <div className="sidenav-menu">
                            <div className="nav accordion" id="accordionSidenav">
                                <div className="sidenav-menu-heading">Core</div>
                                <a className="nav-link collapsed" href="#!" data-toggle="collapse" data-target="#collapseDashboards" aria-expanded="false" aria-controls="collapseDashboards">
                                    <div className="nav-link-icon"><i data-feather="activity"></i></div>
                                    Dashboards
                                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseDashboards" data-parent="#accordionSidenav">
                                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPages">
                                        <a className="nav-link" href="index.html">
                                            Default
                                            <span className="badge badge-primary-soft text-primary ml-auto">Updated</span>
                                        </a>
                                    </nav>
                                </div>
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