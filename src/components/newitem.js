import React, { Component } from 'react';
import AlertService from '../common/service/AlertService';
import firebase from '../config/firebase.Config';
import StorageService from '../common/service/StorageService';
import { validations } from '../common/validations';
import feather from 'feather-icons';
import { commonService } from '../common/service/CommonService';
import { utility } from '../common/utility';
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css';

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

        // fetch all category and assign to select box
        commonService.getAllCategory().then(data => {
            let justCategory = new Set();           
            data.forEach(dat => justCategory.add(dat.data().name));
            justCategory.forEach(jCat =>{
                document.querySelector('select#category').innerHTML += 
                `<option value=${jCat}>${utility.capitalizeFirstLetter(jCat)}</option>`;
            });
        }).catch(err=>console.log(err));

        //fetch all units and assign to slect box
        commonService.getAllUnits().then(data=>{
            data.docs.forEach(val =>{
                document.querySelector('select#unit').innerHTML += 
                `<option value=${val.data().unit}>${utility.capitalizeFirstLetter(val.data().unit)}</option>`;
            });       
        }).catch(err=>console.log(err));

        //fetch all taxes
        commonService.getAllTax().then(data => {
           this.setState({
               ...this.state,
               tax: data.docs.map(tax =>tax.data())
           })
        }).catch(err=>console.log(err));
    }

    state = {     
        item: {
            expdate:'',
            barcode:'',
            hsncode:'',
            remarks:'',
        }
    }
    getFormData = (e) =>{
        //send value to set sub category
        if(e.target.id === 'category'){
            
            this.setSubCategory(e.target.value);
            this.setState({ 
                ...this.state,
                item: {
                    ...this.state.item,
                    [e.target.id] : e.target.value,
                    subcategory : ''
                }
            });
        }else{
            //assign the form values to state
            this.setState({ 
                ...this.state,
                item: {
                    ...this.state.item,
                    [e.target.id] : e.target.value
                }
            });
        }
    }
    addNewItem = (e) =>{
        e.preventDefault();   
        const formVal = this.state.item    
        if(validations.addItemValidation(formVal)){
            //check if sku id exists or not
            this.db.collection('items').where('skuID','==',formVal.skuID).get().then(res=>{                
                if(!res.docs.length){
                    let barCodeVal;
                    formVal.barcode==='' ? barCodeVal = 'N/A' : barCodeVal=formVal.barcode;
                    commonService.barCodeChk(barCodeVal).then(res=>{
                        if(!res.docs.length){
                            this.db.collection('items').add({...formVal}).then(res=>{
                                this.alerts.snack(`New item successfully added`,'bg-green');
                                //reset the form and the state
                                this.setState({
                                    ...this.state,
                                    item: {}
                                });
                                document.getElementById('add-new-item').reset();
                                document.querySelector('select#subcategory').innerHTML ='<option value="0">--select--</option>';
                            }).catch(err=>console.log(err));
                        }else{
                            this.alerts.snack(`Barcode: ${formVal.barcode} already exists.`,'bg-red');
                        }
                    });
               
                }else{
                    this.alerts.snack(`Stock Keeping Unit ID: ${formVal.skuID} already exists.`,'bg-red');
                }                
            }).catch(err=>console.log(err));
       }               
    }

    setSubCategory = (cat) =>{
        const subCatSelect = document.querySelector('select#subcategory');
        subCatSelect.innerHTML ='<option value="0">Please Wait</option>';
        commonService.getAllCategory().then(data => {
            subCatSelect.innerHTML ='<option value="0">--select--</option>';
            data.forEach(dat=> {
                if(dat.data().name === cat){
                    subCatSelect.innerHTML += 
                    `<option value="${dat.data().subcategory}">
                    ${utility.capitalizeFirstLetter(dat.data().subcategory)}
                    </option>`;
                }
            });
        })
        .catch(err=> console.log(err));
    }

    render(){        
        let ListItem = ({ item }) => (
            <span>
              {item.percentage}
              <strong>{"  %"}</strong>
            </span>
          );
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
                                    <form id="add-new-item" onSubmit={this.addNewItem}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="particulars">Item Particulars <span style={{ color: 'red' }}>*</span></label>
                                                    <input className="form-control" id="particulars" type="text" placeholder="eg: Rice - Ponni" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="category">Category <span style={{ color: 'red' }}>*</span></label>
                                                    <select className="form-control" id="category"placeholder="pick a category" onChange={this.getFormData}>                                                        
                                                        <option value="0">--select--</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="subcategory">Sub Category <span style={{ color: 'red' }}>*</span></label>
                                                    <select className="form-control" id="subcategory" onChange={this.getFormData}>
                                                        <option value="0">--select--</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="qty">Quantity <span style={{ color: 'red' }}>*</span></label>
                                                    <input className="form-control" id="qty" type="number" placeholder="eg: 10" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="unit">Unit <span style={{ color: 'red' }}>*</span></label>
                                                    <select className="form-control" id="unit" onChange={this.getFormData}>
                                                        <option value="0">--select--</option>               
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="skuID">Stock Keeping Unit ID <span style={{ color: 'red' }}>*</span></label>
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
                                                    <label htmlFor="manufactureprice">Manufacturing Price <span style={{ color: 'red' }}>*</span></label>
                                                    <input className="form-control" id="manufactureprice" type="number" step="0.01" placeholder="eg: 35.00" onChange={this.getFormData} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="mrp">Maxmimum Retail Price <span style={{ color: 'red' }}>*</span></label>
                                                    <input className="form-control" id="mrp" type="number" step="0.01" placeholder="eg: 38.00" onChange={this.getFormData}/>
                                                </div>
                                            </div>                                            
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="taxes">Tax(s) <span style={{ color: 'red' }}>*</span></label>
                                                    <Multiselect                                                    
                                                    data={this.state.tax}
                                                    value={this.state.item.taxes}
                                                    textField='percentage'
                                                    filter='contains'
                                                    groupBy='name'
                                                    containerClassName='form-control'
                                                    itemComponent={ListItem}
                                                    placeholder='Select your tax(s)'
                                                    onChange={value => this.setState({ item: {
                                                        ...this.state.item,
                                                        taxes : value
                                                    } })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label htmlFor="hsncode">HSN Code </label>
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