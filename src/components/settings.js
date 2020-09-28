import React, { Component } from 'react';
import firebase from '../config/firebase.Config';
import AlertService from '../common/service/AlertService';
import StorageService from '../common/service/StorageService';
import { validations } from '../common/validations';
import feather from 'feather-icons';
import { utility } from '../common/utility';
import { commonService } from '../common/service/CommonService';
import Editcategory from './tables/editcategory';
import Deleteunits from './tables/deleteunits';
import DeleteTax from './tables/deletetax'; 
import { Combobox } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';

class Settings extends Component{
    constructor(props){
        super(props);      
        this.storage = new StorageService();
        this.alerts = new AlertService();
        this.db = firebase.firestore(); 
    }
    state = {
        allunits: {},
        searchitems: ['Loading...'],
        oldstock : false,
        nsExp : ''
    }

    componentDidMount(){
         //check if session is available, if not redirect to login
         if(this.storage.getToken()==null){
            this.props.history.push('/login');
        }
        //init the modal with dynamic values (stock delete)
        this.alerts.modalInit('removeOldStock','Confirm your action','Are you sure to delete this Stock?','deleteOStock');

         //init the modal with dynamic values (unstock)
         this.alerts.modalInit('unStockExpy','Confirm your action','Are you sure to unstock and move to expiry section?','unOStock');
        
        // Activate Feather icons
        feather.replace();
        
        //activate category settings
        this.categorySettings();

        //table to delete units
        this.unitSettings();

        //table to delete taxs
        this.taxSettings();

        //populatethe search dropdown menu
        this.searchSetting();

               
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
            //check if category exists or not          
            this.db.collection('category')
            .where('name', '==', this.state.newcategory)
            .get().then(val => {
               if(validations.newCategoryValid(val,2)){
                   //insert into DB
                   this.db.collection('category')
                   .add({
                       name : this.state.newcategory,
                       subcategory : this.state.newsubcategory
                    }).then(()=> {
                        //assign the new category to the select box
                        this.categorySettings();
                        this.alerts.snack('New category and a single sub catergory added.','bg-green');

                        //reset the state and form
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
            //check if the category and the respective subcategory exists
            this.db.collection('category')
            .where('name', '==', this.state.category)
            .where('subcategory', '==', this.state.subcategory)
            .get().then(val => {
                let cat = this.state.category; 
                if(validations.newCategoryValid(val,4)){
                   
                //insert into DB
                this.db.collection('category').add({
                    name : this.state.category,
                    subcategory : this.state.subcategory
                 }).then(()=> {
                     this.categorySettings();
                     this.alerts.snack(`New Subcategory added for ${cat}`,'bg-green');
                     //reset the state and form
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

    addNewTaxPercent = (e) =>{
        e.preventDefault();
        if(validations.newTaxValid(this.state,3)){
            //check if the tax name and the respective percentage exists
            this.db.collection('tax')
            .where('name', '==', this.state.taxname)
            .where('percentage', '==', this.state.newpercent)
            .get().then(val => {
                let taxName = this.state.taxname;
                let taxPercent = this.state.newpercent;
                if(validations.newTaxValid(val,4)){                   
                    //insert into DB
                    this.db.collection('tax').add({
                        name : this.state.taxname,
                        percentage : this.state.newpercent
                     }).then(()=> {
                         this.taxSettings();
                         this.alerts.snack(`New percentage value ${taxPercent}% added for ${taxName}`,'bg-green');
                         //reset the state and form
                        this.setState({
                            ...this.state,
                            taxname : null,
                            newpercent : null
                        });  
                        document.getElementById('new-percentage').reset();  
                    }).catch(err=> console.log(err));
                    }
            })
            .catch(err =>console.log(err));
        }

    }

    addNewUnit = (e) =>{
        e.preventDefault();
        if(validations.newUnitValid(this.state,1)){
            this.db.collection('units')
            .where('unit', '==', this.state.newunit)
            .get().then(val => {
                let newUnit = this.state.newunit;
                if(validations.newUnitValid(val,2)){
                    //insert into DB
                    this.db.collection('units')
                        .add({unit : this.state.newunit})
                        .then(()=> {
                            //update delete table
                        this.unitSettings();
                        this.alerts.snack(`Unit ${newUnit} added successfully`,'bg-green');
                            //reset the state and form
                        this.setState({
                            ...this.state,
                            newunit : null
                        });  
                        document.getElementById('new-unit').reset();  
                    }).catch(err=> console.log(err));
                }
            });
        }
    }

    addNewTax = (e) => {
        e.preventDefault();
        if(validations.newTaxValid(this.state,1)){
            this.db.collection('tax')
            .where('name', '==', (this.state.newtax).toUpperCase())
            .get().then(val => {
                let newTax = this.state.newtax;
                let newpercent = this.state.newtaxpercent;
                if(validations.newTaxValid(val,2)){
                    //insert into DB
                    this.db.collection('tax')
                        .add({name : (this.state.newtax).toUpperCase(), percentage : this.state.newtaxpercent})
                        .then(()=> {
                            //update delete table
                        this.taxSettings();
                        this.alerts.snack(`Tax name ${newTax} with ${newpercent}% added successfully`,'bg-green');
                            //reset the state and form
                        this.setState({
                            ...this.state,
                            newtax : null,
                            newtaxpercent : null
                        });  
                        document.getElementById('new-tax').reset();  
                    }).catch(err=> console.log(err));
                }
            });
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

    unitSettings = () =>{
        commonService.getAllUnits().then(data=>{
             //send to delete category table
             let allUnits=[];       
             data.docs.forEach((val,i) => {
                 let unitCollection ={
                     "id": val.id,
                     "slno": i+1,
                     "unit": val.data().unit                     
                     };
                allUnits.push(unitCollection);
             });
            this.setState({
                ...this.state,
                allUnits
            })
        }).catch(err=>console.log(err));        
    }

    taxSettings = () =>{
        commonService.getAllTax().then(data=>{
            //assign to select box            
            let justTaxes = new Set();           
            data.forEach(dat => justTaxes.add(dat.data().name));
            document.querySelector('select#taxname').innerHTML = '<option value="0">--select--</option>';
            justTaxes.forEach(jCat =>{
                document.querySelector('select#taxname').innerHTML += 
                `<option value=${jCat}>${jCat}</option>`;
            }); 

             //send to delete Tax table
             let allTax=[];       
             data.docs.forEach((val,i) => {
                 let taxs ={
                     "id": val.id,
                     "slno": i+1,
                     "name": val.data().name,
                     "percentage": val.data().percentage
                     };
                     allTax.push(taxs);
             });
            this.setState({
                ...this.state,
                allTax
            })
        }).catch(err=>console.log(err));        
    }

    searchSetting = () =>{
        //get all items from DB
        commonService.getAllItems().then(val=>{
            let searchTerms=[];
            //get the searchby value
            let key = document.querySelector('#searchby').value;
            //based on serachby assign the dropdown for search
            val.docs.forEach(dat=>{
                if(key==='barcode'){ searchTerms.push(dat.data().barcode)}
                if(key==='skuID'){searchTerms.push(dat.data().skuID)}
                if(key==='particulars'){searchTerms.push(dat.data().particulars)}

            });
            this.setState({ 
                ...this.state,
                searchitems: searchTerms
            });
        }).catch(err=>console.log(err));
    }

    stockSetting = (val)=>{        
        let key = document.querySelector('#searchby').value;
        //get stock table reference
        let stockTable = document.querySelector('.current-stock');   
       //clear the stocktable table
       stockTable.getElementsByTagName('tbody')[0].innerHTML = ''; 
        //get item by searchby and value from dropdown
        this.db.collection('items').where(key,'==',val).get()
        .then(vals=>{
            
            //assign the single item value into the table
            let data =vals.docs[0].data();
            //search term value to state and stockState and current item qty
            this.setState({ 
                ...this.state,
                searchterm : val,
                oldstock : false,
                curItmQty : data.qty
            });
            let cuexpDate = utility.formatDate(data.expdate,{ sec:1, year: 'numeric', month: 'short', day: '2-digit'});           
            document.querySelector('.aqUnit').textContent=data.unit;
             
            let row = stockTable.getElementsByTagName('tbody')[0].insertRow(-1)
            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            cell0.innerHTML = 'Current';
            cell1.innerHTML = `${data.qty} ${data.unit}`;
            data.qty!=='0' ? cell2.innerHTML =cuexpDate : cell2.innerHTML = 'N/A';
            if(utility.compareDate(cuexpDate,new Date(),'<=') && data.qty !=='0'){
                const unStockBtn = commonService.createDynBtn(['btn','btn-warning'],
                                                            [{name:'type', val:'button'},
                                                            {name: 'data-toggle', val: 'modal'},
                                                            {name: 'data-target', val: '#unStockExpy'},
                                                            {name: 'id', val: vals.docs[0].id}
                                                            ],'Unstock');
                unStockBtn.addEventListener('click',e=>this.unStockItm(e.target.id,data.skuID,data.qty,data.expdate));
                cell2.classList.add('text-danger');
                let cell3 = row.insertCell(3);
                cell3.appendChild(unStockBtn);
            }
            
            //get all the other availble stock and update into the table
            this.db.collection('itemNS').where('skuID','==',data.skuID).get()
            .then(vals=>{
                if(vals.docs.length>0){
                    this.setState({ 
                        ...this.state,
                        oldstock : true
                    });
                    vals.docs.forEach((itm,index)=>{                        
                        //remove button to delete the other stocks (existing)
                        const removeButton = commonService.createDynBtn(['btn','btn-danger'],
                                                [{name: 'type', val: 'button'},
                                                 {name: 'data-toggle', val: 'modal'},
                                                 {name: 'data-target', val: '#removeOldStock'},
                                                 {name: 'id', val: itm.id}
                                                ],'Remove');
                        removeButton.addEventListener('click',e=>this.deleteOldStock(e.target.id));

                        //insert the existing stock into table                     
                        let row = stockTable.getElementsByTagName('tbody')[0].insertRow(-1)                  
                        let cell0 = row.insertCell(0);
                        let cell1 = row.insertCell(1);
                        let cell2 = row.insertCell(2);
                        let cell3 = row.insertCell(3);
                        
                        cell0.innerHTML = index+1;
                        cell1.innerHTML = `${itm.data().qty} ${data.unit}`;
                        cell2.innerHTML = utility.formatDate(itm.data().expdate,{ sec:1, year: 'numeric', month: 'short', day: '2-digit'});
                        if(utility.compareDate(itm.data().expdate,new Date(),'<=')){
                            cell2.classList.add('text-danger');
                            this.setState({
                                ...this.state,
                                nsExp: [itm.data().skuID,itm.data().qty,itm.data().expdate]
                            });
                        }
                        cell3.appendChild(removeButton);
                    });                    
                }
            }).catch(err=>console.log(err));
        })
        .catch(err=>console.log(err));
    }

    updateStock = (e) =>{
        e.preventDefault();
        if(validations.updateStockValid(this.state)){              
            let key = document.querySelector('#searchby').value;
            if(this.state.oldstock || this.state.curItmQty!=='0'){
                 //get skuID
                this.db.collection('items').where(key,'==',this.state.searchterm).get()
                .then(dat=>{
                    this.db.collection('itemNS').add({
                        expdate : this.state.nuexpdate,
                        qty : this.state.qtyupdate,
                        skuID : dat.docs[0].data().skuID
                    })
                    .then(()=> {
                        this.resetStockUpdate();
                        this.alerts.snack(`New stock has been updated successfully`,'bg-green');
                    })
                    .catch(err=>console.log(err));
                }).catch(err=>console.log(err));
            }else {
                if(this.state.curItmQty==='0'){
                     //get docID
                    this.db.collection('items').where(key,'==',this.state.searchterm).get()
                    .then(dat=>{
                        this.db.collection('items').doc(dat.docs[0].id)
                        .update({ 
                            expdate : this.state.nuexpdate,
                            qty : this.state.qtyupdate,
                        })
                        .then(()=> {
                            this.resetStockUpdate();
                            this.alerts.snack(`New stock has been updated successfully`,'bg-green');
                        })
                        .catch(err=>console.log(err));
                        
                    })
                    .catch(err=>console.log(err));
                }
            }
        }
    }

    resetStockUpdate = () =>{
        this.setState({ 
            ...this.state,
            curItmQty: '',
            nuexpdate: '',
            qtyupdate: '',
            oldstock : false,
            searchterm: '',
            nsExp : ''
        });
        let stockTable = document.querySelector('.current-stock');   
       //clear the stocktable table
       stockTable.getElementsByTagName('tbody')[0].innerHTML = ''; 
       document.querySelector('#stock-update').reset();
    }

    //when stock remove button clicked on stock update
    deleteOldStock = (id) =>{
        
        document.getElementById('deleteOStock').addEventListener('click',()=>{
            let data = this.state.nsExp;
             //delete from DB
             this.db.collection('itemNS').doc(id).delete().then(() => {
                if(data===''){
                        this.resetStockUpdate();
                        this.alerts.snack(`Stock has been successfully deleted.`,'bg-green');
                }else{
                    this.db.collection('itemEXP').add({skuID: data[0], qty: data[1], expdate: data[2]}).then(()=>{
                        this.resetStockUpdate();
                        this.alerts.snack(`Stock has been deleted and moved to expired section.`,'bg-green');
                    }).catch(err=>console.log(err));
                }
            }).catch(err => console.log(err));
        });
    }

    //when unstock button is clicked
    unStockItm = (id,skuID,qty,expdate) =>{
        document.getElementById('unOStock').addEventListener('click',()=>{
            if(this.state.oldstock){
                this.db.collection('itemNS').where('skuID','==',skuID).get().then(NS=>{
                    this.db.collection('items').doc(id).update({expdate: NS.docs[0].data().expdate, qty: NS.docs[0].data().qty}).then(()=>{
                        this.db.collection('itemEXP').add({skuID,qty,expdate}).then(()=>{
                            this.db.collection('itemNS').doc(NS.docs[0].id).delete().then(() => {
                                this.resetStockUpdate();
                                this.alerts.snack(`Current expired stock has been moved to expired section and New Stock has been updated into Current stock.`,'bg-green');
                            }).catch(err=>console.log(err+' Delete from new Stock - Error'));
                        }).catch(err=>console.log(err+' Add into Expiry - Error'));
                    }).catch(err=>console.log(err+' Update to Current stock - Error'));
                }).catch(err=>console.log(err+' Fetch from New Stock - Error'));
            }else{
                let exdt= utility.formatDate(new Date(0),{ sec:1, year: 'numeric', month: 'numeric', day: '2-digit'})
                this.db.collection('items').doc(id).update({expdate : exdt,qty : '0'})
                    .then(()=> {
                        this.db.collection('itemEXP').add({skuID,qty,expdate}).then(()=>{
                            this.resetStockUpdate();
                            this.alerts.snack(`Stock has been moved to expired section.`,'bg-green');
                        }).catch(err=>console.log(err));
                        
                    })
                    .catch(err=>console.log(err));
            }            
        });
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
                <div className="col-md-12">
                    <div className="card mb-4">
                            <div className="card-header border-bottom">
                                <h2>Stock Update</h2>
                            </div>
                            <div className="card-body">
                            <form id="stock-update" onSubmit={this.updateStock}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="searchby">Search By: </label>
                                            <select className="form-control" id="searchby" defaultValue="barcode" onChange={this.searchSetting}>
                                                <option value="particulars">Item</option>
                                                <option value="skuID">SKU ID</option>
                                                <option value="barcode">Barcode</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="searchbox">Search</label>
                                            <Combobox
                                                data={this.state.searchitems}
                                                value={this.state.searchterm}
                                                textField='name'
                                                caseSensitive={false}
                                                filter='contains'
                                                onChange={value=> this.setState({...this.state,searchterm: value})}
                                                onSelect={value=> this.stockSetting(value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <table className="table responsive current-stock" >
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Available Quantity</th>
                                                    <th>Current Expiry Date</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="qtyupdate">Update Quantity</label>
                                            <input className="form-control" id="qtyupdate" type="number" onChange={this.getFormData}/>
                                            <label className="aqUnit"></label>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nuexpdate">New Expiry Date</label>
                                            <input className="form-control" id="nuexpdate" type="date" onChange={this.getFormData}/>                                           
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-right">
                                        <button className="btn btn-primary " type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                            </div>
                    </div>
                    </div>

                    <div className="col-md-6">
                    <div className="card mb-4">
                            <div className="card-header border-bottom">
                                {/* Tab navigation--> */}
                                <ul className="nav nav-tabs card-header-tabs" id="dashboardNav" role="tablist">
                                    <li className="nav-item mr-1"><a className="nav-link active" id="overview-pill" href="#overview" data-toggle="tab" role="tab" aria-controls="overview" aria-selected="true">Add Category</a></li>
                                    <li className="nav-item"><a className="nav-link" id="activities-pill" href="#activities" data-toggle="tab" role="tab" aria-controls="activities" aria-selected="false"> Delete Category</a></li>
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
                                                        <label htmlFor="newunit">Add Unit</label>
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
                                            <Deleteunits records={this.state.allUnits} tableRefresh={this.unitSettings} />
                                            </div>
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
                                    <li className="nav-item mr-1"><a className="nav-link active" id="addTax-pill" href="#addTax" data-toggle="tab" role="tab" aria-controls="addTax" aria-selected="true">Add Tax(s)</a></li>
                                    <li className="nav-item"><a className="nav-link" id="editTax-pill" href="#editTax" data-toggle="tab" role="tab" aria-controls="editTax" aria-selected="false">Delete Tax</a></li>
                                </ul>
                            </div>
                            <div className="card-body">
                                <div className="tab-content" id="dashboardNavContent">
                                    {/* <!-- Tax Tab Pane 1--> */}
                                    <div className="tab-pane fade show active" id="addTax" role="tabpanel" aria-labelledby="addTax-pill">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <form id="new-tax" onSubmit={this.addNewTax}>                                                    
                                                    <div className="form-group">
                                                        <label htmlFor="newtax">Tax name</label>
                                                        <input className="form-control" id="newtax" type="text" placeholder="Enter new tax name" onChange={this.getFormData}/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="newtaxpercent">Tax percentage</label>
                                                        <input className="form-control" id="newtaxpercent" type="number"  step="0.1" placeholder="Enter tax percentage" onChange={this.getFormData}/>
                                                    </div>
                                                    <div className="text-right">
                                                        <button className="btn btn-primary" type="submit">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="col-md-6">
                                                <form id="new-percentage" onSubmit={this.addNewTaxPercent}>   
                                                    <div className="form-group">
                                                        <label htmlFor="taxname">Tax name</label>
                                                        <select className="form-control" id="taxname" onChange={this.getFormData}>                                                        
                                                            <option value="0">--select--</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label htmlFor="newpercent">Tax percentage</label>
                                                            <input className="form-control" id="newpercent" type="number"  step="0.1" placeholder="New Tax percentage" onChange={this.getFormData} />
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                            <button className="btn btn-primary" type="submit">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                     {/* <!-- Tax Tab Pane 2--> */}
                                     <div className="tab-pane fade" id="editTax" role="tabpanel" aria-labelledby="editTax-pill">
                                        <div className="row">
                                            <div className="col-md-12">
                                            <DeleteTax records={this.state.allTax} tableRefresh={this.taxSettings} />
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