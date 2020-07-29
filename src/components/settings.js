import React, { Component } from 'react';
import firebase from '../config/firebase.Config';
import AlertService from '../common/service/AlertService';
import StorageService from '../common/service/StorageService';
import { validations } from '../common/validations';
import feather from 'feather-icons';
import { utility } from '../common/utility';
import { commonService } from '../common/service/CommonService';


class Settings extends Component{
    constructor(props){
        super(props);      
        this.storage = new StorageService();
        this.alerts = new AlertService();
        this.auth = firebase.auth();     
        this.db = firebase.firestore(); 
        this.conn = this.db.collection('category');
    }
    state = {
        
    }
    componentDidMount(){
         //check if session is available, if not redirect to login
         if(this.storage.getToken()==null){
            this.props.history.push('/login');
        }
        
        // Activate Feather icons
        feather.replace();
        
        // fetch all category and assign to select box
        commonService.getAllCategory().then(data => {
            let justCategory = new Set();           
            data.forEach(dat => justCategory.add(dat.data().name));
            justCategory.forEach(jCat =>{
                document.querySelector('select#category').innerHTML += 
                `<option value=${jCat}>${utility.capitalizeFirstLetter(jCat)}</option>`;
            });           
        });
    }
    getFormData = (e) =>{
        this.setState({ 
                ...this.state,
                [e.target.id] : e.target.value
        });              
    }

    addNewCategory = (e) =>{
        e.preventDefault();
        if(validations.newCategoryValid(this.state,1)){  
            //check if user exists or not          
            this.conn.where('name', '==', this.state.newcategory)
            .get().then(val => {
               if(validations.newCategoryValid(val,2)){
                   //insert into DB
                   this.conn.add({
                       name : this.state.newcategory,
                       subcategory : this.state.newsubcategory
                    }).then(()=> this.alerts.snack('New category and a single sub catergory added.','green'))
                    .catch(err=> console.log(err));

                //reset the sate and form
                this.setState({ 
                    ...this.state,
                    newcategory : null,
                    newsubcategory : null
                 });                
                document.getElementById('new-category').reset();
               }
            }).catch(err => console.log(err));
        }
    }

    addSubCategory = (e) =>{
        e.preventDefault();
        if(validations.newCategoryValid(this.state,3)){

            this.conn
            .where('name', '==', this.state.category)
            .where('subcategory', '==', this.state.subcategory)
            .get().then(val => {
                let cat = this.state.category; 
                if(validations.newCategoryValid(val,4)){
                   
                //insert into DB
                this.conn.add({
                    name : this.state.category,
                    subcategory : this.state.subcategory
                 }).then(()=> {
                     this.alerts.snack(`New Subcatergory added for ${cat}`,'bg-green');
                     //reset the sate and form
                    this.setState({
                        ...this.state,
                        category : null,
                        subcategory : null
                    });  
                    document.getElementById('new-sub-category').reset();  
                }).catch(err=> console.log(err));
                }
            })
            .catch(err =>console.log(err));
            
        }
    }

    render(){
        return (<>
           <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                <div className="container-fluid">
                    <div className="page-header-content">
                        <div className="row align-items-center justify-content-between pt-3">
                            <div className="col-auto mb-3">
                                <h1 className="page-header-title">
                                    <div className="page-header-icon"><i data-feather="file"></i></div>
                                    Inventory Settings
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    <div className="col-xxl-12">
                    <div className="card mb-4">
                            <div className="card-header border-bottom">
                                {/* Tab navigation--> */}
                                <ul className="nav nav-tabs card-header-tabs" id="dashboardNav" role="tablist">
                                    <li className="nav-item mr-1"><a className="nav-link active" id="overview-pill" href="#overview" data-toggle="tab" role="tab" aria-controls="overview" aria-selected="true">Add Category</a></li>
                                    <li className="nav-item"><a className="nav-link" id="activities-pill" href="#activities" data-toggle="tab" role="tab" aria-controls="activities" aria-selected="false">View / Edit Category</a></li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content" id="dashboardNavContent">
                                    {/* <!-- Category Tab Pane 1--> */}
                                    <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-pill">                                   
                                        <div className="row">
                                            <div className="col-md-6">
                                                <form id="new-category" onSubmit={this.addNewCategory}>                                                    
                                                    <div className="form-group">
                                                        <label htmlFor="newcategory">Add Category</label>
                                                        <input className="form-control" id="newcategory" type="text" placeholder="Enter new Category" onChange={this.getFormData}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="newsubcategory">Add Sub Category</label>
                                                        <input className="form-control" id="newsubcategory" type="text" placeholder="Enter a Sub Category" onChange={this.getFormData}/>
                                                    </div>
                                                    <div className="text-right">
                                                        <button className="btn btn-primary" type="submit">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-6">
                                                <form id="new-sub-category" onSubmit={this.addSubCategory}>   
                                                    <div className="form-group">
                                                        <label htmlFor="category">Category</label>
                                                        <select className="form-control" id="category" onChange={this.getFormData}>                                                        
                                                            <option value="0">--select--</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label htmlFor="subcategory">Sub Category</label>
                                                            <input className="form-control" id="subcategory" type="text" placeholder="Enter new Sub Category" onChange={this.getFormData} />
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                            <button className="btn btn-primary" type="submit">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>                                   
                                    </div>
                                {/* <!-- Category Tab Pane 2--> */}
                                    <div className="tab-pane fade" id="activities" role="tabpanel" aria-labelledby="activities-pill">
                                        <div className="datatable table-responsive">
                                            <table className="table table-bordered table-hover" id="dataTableActivity" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Event</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>Date</th>
                                                        <th>Event</th>
                                                        <th>Time</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    <tr>
                                                        <td>01/13/20</td>
                                                        <td>
                                                            <i className="mr-2 text-green" data-feather="zap"></i>
                                                            Server online
                                                        </td>
                                                        <td>1:21 AM</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
        );
    }
}

export default Settings;