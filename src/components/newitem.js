import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
import firebase from '../config/fbfsConfig';
import StorageService from '../common/service/StorageService';

class Newitem extends Component{
    constructor(props){
        super(props);
        this.alerts = new AlertService();
        this.storage = new StorageService();
        this.auth = firebase.auth();
        this.db = firebase.firestore();
    }
    state ={
        particulars : null,
        category : null,
        subcategory : null,
        qty : null,
        skuID : null,
        expdate : null,
        barcode : null,
        manufactureprice : null,
        mrp : null,
        tax : null,
        hsncode : null,
        remarks : null
    }
    getFormData = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        });       
    }
    addNew = (e) =>{
        e.preventDefault();
        console.log(this.state);
        document.getElementById('add-new-item').reset();
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
                                                    <input className="form-control" id="category" type="text" placeholder="eg: grain" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="subcategory">Sub Category</label>
                                                    <input className="form-control" id="subcategory" type="text" placeholder="eg: rice" onChange={this.getFormData} />
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
                                                    <select className="form-control" id="tax" onChange={this.getFormData}>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                    </select>
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