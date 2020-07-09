import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';

class App extends Component{  

  render(){
      return (
        <BrowserRouter>
        <div className="Section">        
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/' component={Dashboard}/>          
        </Switch> 
        </div>
        </BrowserRouter>
      );  
    }
}

export default App;
