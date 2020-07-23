import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
//import { Container } from 'reactstrap';
import routes from '../../routes';

const DashboardSidebar = React.lazy(() => import('./DashboardSidebar'));
const DashboardFooter = React.lazy(() => import('./DashboardFooter'));
const DashboardHeader = React.lazy(() => import('./DashboardHeader'));



class DashboardLayout extends Component{
    render() {

        return (
          <div className="app">
        <DashboardHeader history={this.props.history} />
        <div id="layoutSidenav">
            <DashboardSidebar history={this.props.history} />
            <div id="layoutSidenav_content">
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
