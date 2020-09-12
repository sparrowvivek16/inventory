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
import EditDeleteItem from './tables/editDeleteItem';

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

        //fetch all items
        this.setItems();
    }

    state = {     
        item: {
            expdate:'',
            barcode:'',
            hsncode:'',
            remarks:''
        },
        itemStatus: 'create'
    }
    getFormData = (e) =>{
        //send value to set sub category
        if(e.target.id === 'category'){
            
            this.setSubCategory(e.target.value,0);
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
    addNewnEditItem = (e) =>{
        e.preventDefault();   
        const formVal = this.state.item    
        if(validations.addItemValidation(formVal)){
            //check if sku id exists or not
            this.db.collection('items').where('skuID','==',formVal.skuID).get().then(res=>{ 
                //Create new item               
                if(!res.docs.length && this.state.itemStatus === 'create'){
                    let barCodeVal;
                    formVal.barcode==='' ? barCodeVal = 'N/A' : barCodeVal=formVal.barcode;
                    commonService.barCodeChk(barCodeVal).then(res=>{
                        if(!res.docs.length ){
                            this.db.collection('items').add({...formVal}).then(()=>{
                                this.alerts.snack(`New item successfully added`,'bg-green');
                                //add the item to the edit or delete table
                                this.setItems();
                                //reset the form and the state
                                this.clearForm();
                            }).catch(err=>console.log(err));
                        }else{ this.alerts.snack(`Barcode: ${formVal.barcode} already exists.`,'bg-red'); }
                    });
               
                }else if(res.docs.length && this.state.itemStatus === 'create'){ this.alerts.snack(`Stock Keeping Unit ID: ${formVal.skuID} already exists.`,'bg-red'); }
                
                //update exisiting item
                if(res.docs.length && this.state.itemStatus === 'update'){
                    let docID = formVal.id;
                    delete formVal.id;
                    delete formVal.slno;
                    delete formVal.tax;
                    this.db.collection('items').doc(docID).update({...formVal}).then(()=>{
                        this.alerts.snack(`Item updated successfully`,'bg-green');
                        //add the item to the edit or delete table
                        this.setItems();
                        //reset the form and the state
                        this.clearForm();
                    }).catch(err=>console.log(err));
                }
            }).catch(err=>console.log(err));
       }               
    }

    setSubCategory = (cat,update) =>{
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
            update !== 0 ? subCatSelect.value = update : update=0;

        }).catch(err=> console.log(err));
    }

    //for the datatable
    setItems = () =>{
        commonService.getAllItems().then(data =>{
            let allItems=[];       
            data.docs.forEach((val,i) => {     
                //format the expiry date and taxes for the datatable           
                let expDate,iTax='';
                val.data().expdate !== '' ? expDate = utility.formatDate(val.data().expdate,
                                                        {   
                                                            sec:1,
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: '2-digit'
                                                        }) : expDate='';
                val.data().taxes.forEach(tax=>{
                    iTax += ` ${tax.name}-${tax.percentage}%`;
                })
                let eachItem ={
                    "id": val.id,
                    "slno": i+1,
                    "particulars": val.data().particulars,
                    "category": val.data().category,
                    "subcategory": val.data().subcategory,
                    "qty": val.data().qty,
                    "unit": val.data().unit,
                    "skuID": val.data().skuID,
                    "expdate": expDate,
                    "barcode": val.data().barcode,
                    "manufactureprice": val.data().manufactureprice,
                    "slp": val.data().slp,
                    "tax": iTax,
                    "hsncode": val.data().hsncode,
                    "remarks": val.data().remarks
                    };
                    allItems.push(eachItem);
            });
            this.setState({
                ...this.state,
                allItems: allItems
            })
        }).catch(err=>console.log(err));
    }

    editItem = (item)=>{ 
        //tax string opertions      
        let a = item.tax.replace(/\s/g,'');
        let arr = a.split('%');
        let t = arr.filter(n => n);
        let itemTaxes=[];
        t.forEach(itax=>{
           let val = itax.split('-');
           itemTaxes.push({name:val[0],percentage:val[1]})
        });    
        //update form for editing    
        document.querySelector('.add-update-form').textContent = 'Update Existing Item';
        this.alerts.snack('Please edit the record and click update','bg-blue');
        let expDate = utility.formatDate(item.expdate,{sec:2,year: 'numeric',month: '2-digit',day: '2-digit'});
        this.setState({
            ...this.state,
            item:{
                ...item,
                expdate: expDate,
                taxes: itemTaxes
            },
            itemStatus: 'update'
        });
        //assign values to the form one by one
        const updateForm = document.getElementById('add-new-item');
        updateForm.particulars.value = item.particulars;
        updateForm.category.value = item.category;
        this.setSubCategory(item.category,item.subcategory);
        updateForm.qty.value = item.qty;
        updateForm.unit.value = item.unit;
        updateForm.skuID.value = item.skuID;
        updateForm.expdate.value = expDate;
        updateForm.barcode.value = item.barcode;
        updateForm.manufactureprice.value = item.manufactureprice;
        updateForm.slp.value = item.slp;
        updateForm.hsncode.value = item.hsncode;
        updateForm.remarks.value = item.remarks;
        updateForm.submitBtn.textContent ='Update';
        //scroll to top for editing
        window.location.href = "#";
    }

    clearForm = () =>{
        //clear the form and state and reset it to add new items
        const clearForm = document.getElementById('add-new-item');
        document.querySelector('.add-update-form').textContent = 'Add New Item';
        this.setState({
            ...this.state,
            item:{
                expdate:'',
                barcode:'',
                hsncode:'',
                remarks:''
            },
            itemStatus: 'create'
        });
        clearForm.submitBtn.textContent ='Create';
        clearForm.reset();
        document.querySelector('select#subcategory').innerHTML ='<option value="0">--select--</option>';
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
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-header add-update-form">Add New Item</div>
                                <div className="card-body">
                                        <form id="add-new-item" onSubmit={this.addNewnEditItem}>
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
                                                        <label htmlFor="slp">Selling price <span style={{ color: 'red' }}>*</span></label>
                                                        <input className="form-control" id="slp" type="number" step="0.01" placeholder="eg: 38.00" onChange={this.getFormData}/>
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
                                                <div className="col-md-10 text-right">
                                                    <button className="btn btn-light" type="button" onClick={this.clearForm}>Clear</button>
                                                    
                                                </div>
                                                <div className="col-md-2">
                                                    <button className="btn btn-primary" id="submitBtn" type="submit">Create</button>
                                                </div>
                                            </div>
                                        </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="card mb-4">
                                <div className="card-header">Edit / Delete Item</div>
                                <div className="card-body">
                                <EditDeleteItem records={this.state.allItems} tableRefresh={this.setItems} editItem={this.editItem} />
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