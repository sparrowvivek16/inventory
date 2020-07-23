import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className=""></div>;

// Containers
const DashboardLayout = React.lazy(() => import('./container/DashboardLayout'));

// Pages
const Login = React.lazy(() => import('./components/login'));

class App extends Component{  

  render(){
      return (
        <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <div className="Section">        
          <Switch>
            <Route exact path='/login' component={Login}/>          
            <Route path="/" name="Layout" render={props => <DashboardLayout {...props}/>} />
          </Switch> 
          </div>
          </React.Suspense>
        </BrowserRouter>
      );  
    }
}

export default App;
