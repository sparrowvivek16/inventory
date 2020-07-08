import React, { Component } from 'react';


class Login extends Component{
    state ={
        user : null,
        password : null        
    }
    credentials = (e) =>{       
        this.setState({
            [e.target.id] : e.target.value
        });
    }
    submits = (e) =>{
        e.preventDefault();
        if(this.state.user && this.state.password !== null){           
            this.props.checkUser(this.state);
        }else{
            this.props.snack('All fields are required.');
        }
    }
    render(){
        const loginForm = (
        <div className="col s6 m7">
           
            <div className="card horizontal">               
                <div className="card-stacked">
                <form className="col s6 login-form" onSubmit={this.submits}>
                    <div className="card-content">    
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="user" type="text" className="validate" onChange={this.credentials} />
                                <label htmlFor="user">Username</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="password" type="password" className="validate" onChange={this.credentials} />
                                <label htmlFor="password">Password</label>
                                </div>
                            </div>
                    </div>
                    <div className="card-action">
                    <button className="btn blue" type="submit">Submit</button>                   
                    </div>
                    </form>
                </div>
            </div>
            <p>Copyright @ Radi & Sparrow 2020</p>
        </div>
        );

        return(
        <div className="container">
             <h3 className="header">Sign In</h3>
            {loginForm}
        </div>       
        );
    }
}

export default Login;