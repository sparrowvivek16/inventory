import React, { Component } from 'react';
import feather from 'feather-icons';
import { Link } from 'react-router-dom';

class DashboardFooter extends Component{   
    componentDidMount(){
        // Activate Feather icons
        feather.replace();
    } 
    render(){
        return (
            <footer className="footer mt-auto footer-light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 small">Copyright &#xA9; Radi & Sparrow 2020</div>
                            <div className="col-md-6 text-md-right small">
                            <Link to="/privacyPolicy">Privacy Policy</Link>
                                &#xB7;
                                <Link to="/termsAndConditions">Terms &amp; Conditions</Link>
                            </div>
                        </div>
                    </div>
                </footer>
        );
    }
}

export default DashboardFooter; 