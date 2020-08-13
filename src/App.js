import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

const loading = () => <div className=""></div>;

// Containers
const DashboardLayout = React.lazy(() => import('./container/DashboardLayout'));

// Pages
const Login = React.lazy(() => import('./components/login'));

class App extends Component{  

  render(){
      return (
        <div>
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
         <Alert stack={{limit: 3}} />
         </div>
      );  
    }
}

export default App;
