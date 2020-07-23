import React, { Component } from 'react';

class DashboardFooter extends Component{

    render(){
        return (
            <footer className="footer mt-auto footer-light">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 small">Copyright &#xA9; Radi & Sparrow 2020</div>
                            <div className="col-md-6 text-md-right small">
                                <a href="#!">Privacy Policy</a>
                                &#xB7;
                                <a href="#!">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
        );
    }
}

export default DashboardFooter; 