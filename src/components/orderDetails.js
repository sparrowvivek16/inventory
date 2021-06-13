import React, { Component, Fragment } from 'react'
import { commonService } from '../common/service/CommonService';
import ReactDatatable from '@ashvin27/react-datatable';
import AlertService from '../common/service/AlertService';

class orderDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {
                name: '',
                company: '',
                address: '',
                billingAddress: '',
                mobileNumber: '',
                email: '',
                id: '',
                accNum: '',
                accHolder: '',
            },
            quantity: 1,
            customerList: [],
            vendorList: [],
            groceryItems: [],
            showCustomer: false,
            selectedGroceryItems: [],
            showSelectedItems: false,

        }
        this.ViewInit();
        this.alerts = new AlertService();
        this.getCustomer = this.getCustomer.bind(this);
    }

    ViewInit() {
        this.config = {
            page_size: 10,
            length_menu: [10, 25, 50],
            button: {
                excel: false,
                print: false,
            }
        }


        this.columns = [
            {
                key: "particulars", text: "Items", className: "Items", align: "left", sortable: true,
            },
            {
                key: "category", text: "Category", className: "Category", align: "left", sortable: true,
            },
            {
                key: "subcategory", text: "Sub Category", className: "Sub Category", align: "left", sortable: true,
            },
            {
                key: "qty", text: "Qty", className: "Qty", align: "left", sortable: true,
            },
            {
                key: "unit", text: "Units", className: "Units", align: "left", sortable: true,
            },
            {
                key: "skuID", text: "SKU ID", className: "SKU ID", align: "left", sortable: true,
            },
            {
                key: "expdate", text: "Exp Date", className: "Exp Date", align: "left", sortable: true,
            },
            {
                key: "barcode", text: " Bar Code", className: "Bar Code", align: "left", sortable: true,
            },
            {
                key: "manufactureprice", text: "Manuf Price", className: "Manuf Price", align: "left", sortable: true,
            },
            {
                key: "slp", text: "Selling Price", className: "Selling Price", align: "left", sortable: true,
            },
            {
                key: "taxes", text: "TaxPercent", className: "TaxPercent", align: "left", sortable: true,
            },
            {
                key: "hsncode", text: "HSN Code", className: "HSN Code", align: "left", sortable: true,
            },
            {
                key: "remarks", text: "Remarks", className: "Remarks", align: "left", sortable: true,
            },
            {
                key: "action", text: "Action", className: "action", width: 100, align: "left", sortable: false,
                cell: record => {
                    return (
                        <Fragment>
                            <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.addRecord(record)}>
                                <i className="fa fa-plus"></i>
                            </button>

                        </Fragment>
                    );
                }
            }
        ];
    }
    /******************************Add action**********************************/
    addRecord(record) {
        let { selectedGroceryItems } = this.state;
        let id = selectedGroceryItems.some((value) => {
            return (value.id === record.id);
        });
        if (id === record.id.length > 1) {
            this.alerts.snack(`Already selected this item`, 'bg-red');
        }
        else {
            selectedGroceryItems.push(record);
            this.setState({ selectedGroceryItems, showSelectedItems: true })
        }

    }
    /**************************RadioButton action******************************/
    chooseType = (event) => {
        if (event.target.value === "customer") {
            this.resetInput();
            this.setState({ showCustomer: true })
        }
        else {
            this.resetInput();
            this.setState({ showCustomer: false })
        }
    }

    resetInput() {
        this.setState({
            user: {
                name: '',
                company: '',
                address: '',
                billingAddress: '',
                landLine: '',
                mobileNumber: '',
                email: '',
                gstNum: '',
                remarks: '',
                accNumber: '',
                ifscCode: '',
                accHolder: '',
            }
        });
    }

    /******************************Customer Section**********************************/

    //get all Customer details 
    getAllCustomers() {
        commonService.getCustomers()
            .then(data => {
                let datas = [];
                data.docs.forEach(doc => {
                    datas.push({
                        id: doc.id,
                        name: doc.data().name,
                        company: doc.data().company,
                        address: doc.data().address,
                        billingAddress: doc.data().billingAddress,
                        landLine: doc.data().landLine,
                        mobileNumber: doc.data().mobileNumber,
                        email: doc.data().email,
                        gstNum: doc.data().gstNum,
                        remarks: doc.data().remarks,
                    });
                });
                this.setState({ customerList: datas });
            })
            .catch(err => this.alerts.error(err));
    }

    //getCustomer name and id
    getCustomer = (e) => {
        const { user, customerList } = this.state;
        const { name } = e.target;
        //Matching and getting the event and id
        let data = customerList.filter(item => {
            return item.name === e.target.value
        });
        //separate that id from the array
        let id = data.map(s => (s.id));
        //convert the array to string and store it in state
        let userId = id.toString()
        if (e.target.value !== "null") {
            this.setState({
                user: {
                    ...user,
                    [name]: e.target.value,
                    id: userId
                }
            }, () => this.getProfileById());
        }
        else {
            this.alerts.error("Choose Name")
        }

    }

    //Show customer information based on dropdown change
    getProfileById() {
        let id = this.state.user.id;
        commonService.getCustomerById(id)
            .then(data => {
                this.setViewData(data);
            })
            .catch(err => this.alerts.error(err));
    }


    /******************************Vendor Section**********************************/
    //get all Vendor details
    getAllVendors() {
        commonService.getVendors()
            .then(data => {
                let datas = [];
                data.docs.forEach(doc => {
                    datas.push({
                        id: doc.id,
                        name: doc.data().name,
                        company: doc.data().company,
                        address: doc.data().address,
                        billingAddress: doc.data().billingAddress,
                        landLine: doc.data().landLine,
                        mobileNumber: doc.data().mobileNumber,
                        email: doc.data().email,
                        gstNum: doc.data().gstNum,
                        remarks: doc.data().remarks,
                        accNum: doc.data().accNum,
                        accHolder: doc.data().accHolder,
                    });
                });
                this.setState({ vendorList: datas });
            })
            .catch(err => this.alerts.error(err));
    }

    //getVendor name and id
    getVendor = (e) => {
        const { user, vendorList } = this.state;
        const { name } = e.target;
        //Matching and getting the event and id
        let data = vendorList.filter(item => {
            return item.name === e.target.value
        });
        //separate that id from the array
        let id = data.map(s => (s.id));
        //convert the array to string and store it in state
        let userId = id.toString()
        if (e.target.value !== "null") {
            this.setState({
                user: {
                    ...user,
                    [name]: e.target.value,
                    id: userId
                }
            }, () => this.getVendorById());
        }
        else {
            this.alerts.error("Choose Name")
        }

    }

    //Show Vendor information based on dropdown change
    getVendorById() {
        let id = this.state.user.id;
        commonService.getVendorById(id)
            .then(data => {
                this.setViewData(data);
            })
            .catch(err => this.alerts.error(err));
    }

    setViewData(data) {
        if (data) {
            this.setState({
                user: {
                    name: data.data().name,
                    company: data.data().company,
                    address: data.data().address,
                    billingAddress: data.data().billingAddress,
                    mobileNumber: data.data().mobileNumber,
                    email: data.data().email,
                    accNum: data.data().accNumber,
                    accHolder: data.data().accHolder,
                },
            });
        }
    }

    /******************************Grocery Section**********************************/
    //get all Grocery details
    getAllItems() {
        commonService.getItems()
            .then(data => {
                let datas = [];
                data.docs.forEach(doc => {
                    let taxValue = '';
                    doc.data().taxes
                        .forEach(tax => {
                            taxValue += ` ${tax.name}-${tax.percentage}%`;
                        })
                    datas.push({
                        id: doc.id,
                        barcode: doc.data().barcode,
                        category: doc.data().category,
                        expdate: doc.data().expdate,
                        hsncode: doc.data().hsncode,
                        manufactureprice: doc.data().manufactureprice,
                        particulars: doc.data().particulars,
                        qty: doc.data().qty,
                        remarks: doc.data().remarks,
                        skuID: doc.data().skuID,
                        slp: doc.data().slp,
                        taxes: taxValue,
                        subcategory: doc.data().subcategory,
                        unit: doc.data().unit,
                    });
                });
                //let value = datas.map(doc => doc.qty)
                //let quantity = value.toString();
                this.setState({
                    groceryItems: datas,
                    //quantity: quantity
                });
            })
            .catch(err => this.alerts.error(err));
    }

    tableAction() {
        this.getAllItems();

    }

    componentDidMount() {
        this.getAllCustomers();
        this.getAllVendors();
        this.getAllItems();
    }

    handleQuantity = (event, index) => {
        if (event.target.value > 0) {
            const { selectedGroceryItems } = this.state;
            let newData = [...selectedGroceryItems];
            newData[index].qty = event.target.value;
            this.setState({ selectedGroceryItems:newData });
            console.log(event.target)  
        }
        else {
            this.alerts.snack(`Quantity Canot be less than one`, 'bg-red');
        }

    }

    removeRow = (index) => {
        const { selectedGroceryItems } = this.state;
        var newData = [...selectedGroceryItems];
        newData.splice(index, 1);
        this.setState({ selectedGroceryItems: newData });
        if (selectedGroceryItems > 0) {
            this.setState({ showSelectedItems: false })
        }
    }

    submit = () => {
        const { selectedGroceryItems } = this.state;
        alert("Check ur console");
        console.log(selectedGroceryItems);
    }

    render() {
        const { customerList, user, vendorList, showCustomer, selectedGroceryItems, showSelectedItems } = this.state;
        return (
            <div id="layoutAuthentication">
                <div id="layoutAuthentication_content">
                    <main>
                        <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
                            <div className="container-fluid">
                                <div className="page-header-content">
                                    <div className="row align-items-center justify-content-between pt-3">
                                        <div className="col-auto mb-3">
                                            <h1 className="page-header-title">
                                                <div className="page-header-icon"><i data-feather="file"></i></div>
                                        Order Status
                                </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="card mb-4">
                                        <div className="sbp-preview-content">
                                            <div className="card-header border-bottom">
                                                <label htmlFor="newunit">Choose Type</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-solid">
                                                <input className="custom-control-input" id="customRadioSolid2" type="radio" value="vendor" name="customRadioSolid" checked={showCustomer !== true} onChange={this.chooseType} />
                                                <label className="custom-control-label" htmlFor="customRadioSolid2">Vendor</label>
                                            </div>
                                            <div className="custom-control custom-radio custom-control-solid">
                                                <input className="custom-control-input" id="customRadioSolid1" type="radio" value="customer" name="customRadioSolid" checked={showCustomer === true} onChange={this.chooseType} />
                                                <label className="custom-control-label" htmlFor="customRadioSolid1">Customer</label>
                                            </div>
                                        </div>
                                        <div className="card-header border-bottom">
                                            {showCustomer ? <label htmlFor="newunit">Select Customer</label> :
                                                <label htmlFor="newunit">Select Vendor</label>}
                                        </div>
                                        {showCustomer ? <div className="card-body">
                                            <div className="tab-content" id="dashboardNavContent">
                                                {/* <!-- Unit Tab Pane 1--> */}
                                                <div className="tab-pane fade show active" id="addUnit" role="tabpanel" aria-labelledby="addUnit-pill">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <form id="customerList" >
                                                                <div className="form-group">
                                                                    <select className="form-control" value={user.name} name="name" onChange={this.getCustomer}>
                                                                        <option value="null">--select--</option>
                                                                        {customerList && customerList.map(Name => (
                                                                            <option value={Name.Name} key={Name.id}>
                                                                                {Name.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                {/* <div className="text-right">
                                                                    <button className="btn btn-primary" type="submit">Submit</button>
                                                                </div> */}
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div> :

                                            <div className="card-body">
                                                <div className="tab-content" id="dashboardNavContent">
                                                    {/* <!-- Unit Tab Pane 1--> */}
                                                    <div className="tab-pane fade show active" id="addUnit" role="tabpanel" aria-labelledby="addUnit-pill">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <form id="vendorList" >
                                                                    <div className="form-group">
                                                                        <select className="form-control" value={user.name} name="name" onChange={this.getVendor}>
                                                                            <option value="null">--select--</option>
                                                                            {vendorList && vendorList.map(Name => (
                                                                                <option value={Name.Name} key={Name.id}>
                                                                                    {Name.name}
                                                                                </option>
                                                                            ))}
                                                                        </select>
                                                                    </div>
                                                                    {/* <div className="text-right">
                                                                    <button className="btn btn-primary" type="submit">Submit</button>
                                                                </div> */}
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>}
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <div className="card mb-4">
                                        <div className="card-header border-bottom">
                                            {showCustomer ? <label htmlFor="newunit">Customer Details</label> :
                                                <label htmlFor="newunit">Vendor Details</label>}
                                        </div>
                                        <div className="card-body">
                                            <div className="tab-content" id="dashboardNavContent">
                                                {/* <!-- Unit Tab Pane 1--> */}
                                                <div className="tab-pane fade show active" id="addUnit" role="tabpanel" aria-labelledby="addUnit-pill">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <form id="new-unit" onSubmit={this.addNewUnit}>
                                                                <div className="form-row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="small mb-1" htmlFor="inputName">Name</label>
                                                                            <input id="name" type="text" disabled={user.name} defaultValue={user.name} name="name" className="form-control" onChange={this.credentials} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="small mb-1" htmlFor="inputCompany">Company</label>
                                                                            <input id="company" type="text" disabled={user.company} defaultValue={user.company} name="company" className="form-control " onChange={this.credentials} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="small mb-1" htmlFor="inputAddress">Address</label>
                                                                            <input id="address" type="text" disabled={user.address} defaultValue={user.address} name="address" className="form-control " onChange={this.credentials} />
                                                                        </div> </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="small mb-1" htmlFor="inputBillAddress">Bill Address</label>
                                                                            <input id="billingAddress" type="text" disabled={user.billingAddress} defaultValue={user.billingAddress} name="billingAddress" className="form-control " onChange={this.credentials} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="small mb-1" htmlFor="inputMobileNumber">Mobile Number</label>
                                                                            <input id="mobileNumber" type="text" disabled={user.mobileNumber} defaultValue={user.mobileNumber} name="mobileNumber" className="form-control" onChange={this.credentials} />
                                                                        </div> </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="small mb-1" htmlFor="inputEmailAddress">Email </label>
                                                                            <input id="inputEmailAddress" type="text" disabled={user.email} defaultValue={user.email} name="email" className="form-control" onChange={this.credentials} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {!showCustomer && <div className="form-row">
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="small mb-1" htmlFor="inputAccHolder">Acc Holder</label>
                                                                            <input id="accHolder" type="text" disabled={user.accHolder} defaultValue={user.accHolder} name="accHolder" className="form-control" onChange={this.credentials} />
                                                                        </div> </div>
                                                                    <div className="col-md-6">
                                                                        <div className="form-group">
                                                                            <label className="small mb-1" htmlFor="inputAccNumber">Acc Number</label>
                                                                            <input id="accNum" type="text" disabled={user.accNum} defaultValue={user.accNum} name="accNum" className="form-control" onChange={this.credentials} />
                                                                        </div>
                                                                    </div>
                                                                </div>}
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="card shadow-lg border-0 rounded-lg mt-3">
                                        <div className="card-header">Item List</div>
                                        <div className="card-body">
                                            <div className="datatable">
                                                <ReactDatatable
                                                    config={this.config}
                                                    records={this.state.groceryItems}
                                                    columns={this.columns}
                                                    onChange={(data) => this.tableAction(data)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {showSelectedItems && selectedGroceryItems.length > 0 && <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="card shadow-lg border-0 rounded-lg mt-3">
                                        <div className="card-header">Selected Items</div>
                                        <div className="card-body">
                                            <div className="datatable">
                                                <table className="table table-bordered table-hover" id="dataTable" width="100%" cellSpacing="0">
                                                    <thead>
                                                        <tr>
                                                            <th>Items</th>
                                                            <th>Category</th>
                                                            <th>Sub Category</th>
                                                            <th> Qty</th>
                                                            <th>Units</th>
                                                            <th> SKU ID</th>
                                                            <th>Exp Date</th>
                                                            <th>Bar Code</th>
                                                            <th>Manuf Price</th>
                                                            <th>Selling Price</th>
                                                            <th>TaxPercent</th>
                                                            <th>HSN Code</th>
                                                            <th>Remarks</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {selectedGroceryItems.length > 0 && selectedGroceryItems.map((item, key) => {
                                                            return (
                                                                <tr key={key}>
                                                                    <td>{item.particulars}</td>
                                                                    <td>{item.category}</td>
                                                                    <td>{item.subcategory}</td>
                                                                    <th><input type="number" value={item.qty} id="qty" onChange={(event) => this.handleQuantity(event, key)} /> </th>
                                                                    <td>{item.unit}</td>
                                                                    <td>{item.skuID}</td>
                                                                    <td>{item.expdate}</td>
                                                                    <td>{item.barcode}</td>
                                                                    <td>{item.manufactureprice}</td>
                                                                    <td>{item.slp}</td>
                                                                    <td>{item.taxes}</td>
                                                                    <td>{item.hsncode}</td>
                                                                    <td>{item.remarks}</td>
                                                                    <th><button onClick={() => this.removeRow(key)}>Remove</button></th>
                                                                </tr>
                                                            )
                                                        })}
                                                         <tr><th>{selectedGroceryItems.length > 0 && <button onClick={this.submit}>Submit</button>}</th></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </main>
                </div>
            </div>
        )
    }
}

export default orderDetails;
