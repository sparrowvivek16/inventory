import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
//import { Container } from 'reactstrap';
import routes from '../../routes';

const DashboardSidebar = React.lazy(() => import('./DashboardSidebar'));
const DashboardFooter = React.lazy(() => import('./DashboardFooter'));
const DashboardHeader = React.lazy(() => import('./DashboardHeader'));

class DashboardLayout extends Component{

    // Click to collapse responsive sidebar
    overlayClick(){
        // eslint-disable-next-line no-unused-vars
        const BOOTSTRAP_LG_WIDTH = 992;
        if (window.innerWidth >= 992) {
        return;
        }
        let overlayContent = document.querySelector("body");
        if(overlayContent.classList.contains('sidenav-toggled')){
            overlayContent.classList.toggle('sidenav-toggled');
        }
    }

    render() {

        return (
          <div className="app">
        <DashboardHeader history={this.props.history} />
        <div id="layoutSidenav">
            <DashboardSidebar history={this.props.history} />
            <div id="layoutSidenav_content" onClick={this.overlayClick}>
            { <main className="main">
                {/* <Container fluid> */}
                        <Switch>
                            {routes.map((route, idx) => {
                            return route.component ? (
                            <Route key={idx} 
                            path={route.path} 
                            exact={route.exact} 
                            name={route.name}                             
                             render={props=> (
                                <route.component {...props} />
                                )} />
                                ) : (null);
                                })}
                                <Redirect from="/" to="/login" />
                        </Switch>
                {/* </Container> */}
            </main> }
            <DashboardFooter />
            </div>
        </div>
              
    </div>
        );
      }
}

export default DashboardLayout;
