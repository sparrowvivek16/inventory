import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
import firebase from '../config/firebase.Config';
import StorageService from '../common/service/StorageService';
import { validations } from '../common/validations';
import feather from 'feather-icons';
import { commonService } from '../common/service/CommonService';
import { utility } from '../common/utility';
import SelectPure from "select-pure";

class Newitem extends Component{
    constructor(props){
        super(props);
        this.alerts = new AlertService();
        this.storage = new StorageService();
        this.db = firebase.firestore();
    }
    componentDidMount(){
         //check if session is available, if not redirect to login
         if(this.storage.getToken()==null){
            this.props.history.push('/login');
        }
        
        // Activate Feather icons
        feather.replace();
        const myOptions = [
            {
              label: "New York ",
              value: "NY",
            },
            {
              label: "Washington ",
              value: "WA",
            },
            {
              label: "California",
              value: "CA",
            },
            {
              label: "New Jersey",
              value: "NJ",
            },
            {
              label: "North Carolina",
              value: "NC",
            },
          ];

         new SelectPure(".selectTax", {
            options:   myOptions,    
            multiple: true, // default: false
            autocomplete: true,
            icon: 'fa fa-times'
        });

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
    state = {     
        item: {}
    }
    getFormData = (e) =>{
        this.setState({ 
            item: {
                ...this.state.item,
                [e.target.id] : e.target.value
            }
        });

        //send value to set sub category
        if(e.target.id === 'category'){
            
            this.setSubCategory(e.target.value);
        }
    }
    addNew = (e) =>{
        e.preventDefault();       
        if(validations.addItemValidation(this.state.item)){
          
            this.setState({ item: {} });
            document.getElementById('add-new-item').reset();
        }               
    }

    setSubCategory = (cat) =>{
        commonService.getAllCategory().then(data => {
            document.querySelector('select#subcategory').innerHTML ='';
            data.forEach(dat=> {
                if(dat.data().name === cat){
                    document.querySelector('select#subcategory').innerHTML += 
                    `<option value=${dat.data().subcategory}>${utility.capitalizeFirstLetter(dat.data().subcategory)}</option>`;
                }
            });
        })
        .catch(err=> console.log(err));
        
    }

    render(){
        
        return(
            <>
            <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                        <div className="container-fluid">
                            <div className="page-header-content">
                                <div className="row align-items-center justify-content-between pt-3">
                                    <div className="col-auto mb-3">
                                        <h1 className="page-header-title">
                                            <div className="page-header-icon"><i data-feather="file"></i></div>
                                            Add / Edit / Remove Items
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div className="container">
                        <div className="card">
                            <div className="card-header">Add New Item</div>
                            <div className="card-body">
                            <div className="sbp-preview">
                                <div className="sbp-preview-content">
                                    <form id="add-new-item" onSubmit={this.addNew}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="particulars">Item Particulars</label>
                                                    <input className="form-control" id="particulars" type="text" placeholder="eg: Rice - Ponni" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="category">Category</label>
                                                    <select className="form-control" id="category"placeholder="pick a category" onChange={this.getFormData}>                                                        
                                                        <option value="0">--select--</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="subcategory">Sub Category</label>
                                                    <select className="form-control" id="subcategory" onChange={this.getFormData}>
                                                        <option value="0">--select--</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="qty">Quantity</label>
                                                    <input className="form-control" id="qty" type="number" placeholder="eg: 10" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="unit">Unit</label>
                                                    <select className="form-control" id="unit" onChange={this.getFormData}>
                                                        <option value="0">--select--</option>
                                                        <option value="grain">KG</option>
                                                        <option value="pluses">CC</option>
                                                        <option value="pickles">Ton</option>                                                        
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="skuID">Stock Keeping Unit ID</label>
                                                    <input className="form-control" id="skuID" type="text" placeholder="eg: RI-PNI-38" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="expdate">Expiry Date</label>
                                                    <input className="form-control" id="expdate" type="date" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="barcode">Barcode</label>
                                                    <input className="form-control" id="barcode" type="text" placeholder="please scan code" onChange={this.getFormData}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="manufactureprice">Manufacturing Price</label>
                                                    <input className="form-control" id="manufactureprice" type="number" step="0.01" placeholder="eg: 35.00" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="mrp">Maxmimum Retail Price</label>
                                                    <input className="form-control" id="mrp" type="number" step="0.01" placeholder="eg: 38.00" onChange={this.getFormData}/>
                                                </div>
                                            </div>
                                            {/* Tax needs to be added separately */}
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="tax">Tax(s)</label>
                                                    <span className="selectTax" id="tax"></span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="hsncode">HSN Code</label>
                                                    <input className="form-control" id="hsncode" type="text" placeholder="10063010" onChange={this.getFormData}/>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="remarks">Remarks</label>
                                                    <textarea className="form-control" id="remarks" rows="3" onChange={this.getFormData}></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12 text-right">
                                                <button className="btn btn-primary" type="submit">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </>
        );
    }
}

export default Newitem;