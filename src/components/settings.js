import React, { Component } from 'react';
import firebase from '../config/firebase.Config';
import AlertService from '../common/service/AlertService';
import StorageService from '../common/service/StorageService';
import { validations } from '../common/validations';
import feather from 'feather-icons';
import { utility } from '../common/utility';
import { commonService } from '../common/service/CommonService';
import Editcategory from './tables/editcategory';

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
        
        //activate category settings
        this.categorySettings();
        
        
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
                    }).then(()=> {
                        //assign the new category to the select box
                        this.categorySettings();
                        this.alerts.snack('New category and a single sub catergory added.','green');

                        //reset the sate and form
                        this.setState({ 
                            ...this.state,
                            newcategory : null,
                            newsubcategory : null
                        });                
                        document.getElementById('new-category').reset();
                    }).catch(err=> console.log(err));
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
                     this.categorySettings()
                     this.alerts.snack(`New Subcategory added for ${cat}`,'bg-green');
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

    categorySettings = () =>{
        // fetch all category
        commonService.getAllCategory().then(data => {
            //assign to select box            
            let justCategory = new Set();           
            data.forEach(dat => justCategory.add(dat.data().name));
            document.querySelector('select#category').innerHTML = '<option value="0">--select--</option>';
            justCategory.forEach(jCat =>{
                document.querySelector('select#category').innerHTML += 
                `<option value=${jCat}>${utility.capitalizeFirstLetter(jCat)}</option>`;
            }); 
            //send to editcategory table
            let allCategory=[];       
            data.docs.forEach((val,i) => {
                let categoryCollection ={
                    "id": val.id,
                    "slno": i+1,
                    "category": val.data().name,
                    "subcategory": val.data().subcategory
                    };
                allCategory.push(categoryCollection);
            });
           
            this.setState({ 
                ...this.state,
                allCategory
            });  
        }).catch(err => console.log(err));
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
                    <div className="col-md-6">
                    <div className="card mb-4">
                            <div className="card-header border-bottom">
                                {/* Tab navigation--> */}
                                <ul className="nav nav-tabs card-header-tabs" id="dashboardNav" role="tablist">
                                    <li className="nav-item mr-1"><a className="nav-link active" id="overview-pill" href="#overview" data-toggle="tab" role="tab" aria-controls="overview" aria-selected="true">Add Category</a></li>
                                    <li className="nav-item"><a className="nav-link" id="activities-pill" href="#activities" data-toggle="tab" role="tab" aria-controls="activities" aria-selected="false">Edit / Delete Category</a></li>
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
                                        <div >
                                            <Editcategory records={this.state.allCategory} tableRefresh={this.categorySettings} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                    <div className="card mb-4">
                            <div className="card-header border-bottom">
                                 {/* Unit Tab navigation--> */}
                                 <ul className="nav nav-tabs card-header-tabs" id="dashboardNav" role="tablist">
                                    <li className="nav-item mr-1"><a className="nav-link active" id="addUnit-pill" href="#addUnit" data-toggle="tab" role="tab" aria-controls="addUnit" aria-selected="true">Add Units</a></li>
                                    <li className="nav-item"><a className="nav-link" id="editUnit-pill" href="#editUnit" data-toggle="tab" role="tab" aria-controls="editUnit" aria-selected="false">Delete Units</a></li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content" id="dashboardNavContent">
                                    {/* <!-- Unit Tab Pane 1--> */}
                                    <div className="tab-pane fade show active" id="addUnit" role="tabpanel" aria-labelledby="addUnit-pill">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <form id="new-unit" onSubmit={this.addNewUnit}>                                                    
                                                    <div className="form-group">
                                                        <label htmlFor="newcategory">Add Unit</label>
                                                        <input className="form-control" id="newunit" type="text" placeholder="Enter new Unit" onChange={this.getFormData}/>
                                                    </div>
                                                    <div className="text-right">
                                                        <button className="btn btn-primary" type="submit">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                     {/* <!-- Unit Tab Pane 2--> */}
                                     <div className="tab-pane fade" id="editUnit" role="tabpanel" aria-labelledby="editUnit-pill">
                                        <div className="row">
                                            <div className="col-md-12">
                                            <div className="table-responsive">
                                            <table className="table table-bordered table-hover" id="dataTableActivity" width="100%" cellSpacing="0">
                                                <thead>
                                                    <tr>
                                                        <th width="1%">#</th>
                                                        <th width="80%">Unit</th>
                                                        <th width="19%">Action</th>
                                                    </tr>
                                                </thead>
                                                <tfoot>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Unit</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </tfoot>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Rice</td>
                                                        <td>
                                                            <button className="btn btn-datatable btn-icon btn-transparent-dark"><i data-feather="trash-2"></i></button>
                                                        </td>
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
                    </div>
                </div>
            </div></>
        );
    }
}

export default Settings;