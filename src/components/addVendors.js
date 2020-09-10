import React, { Component, Fragment } from 'react'
import AlertService from '../common/service/AlertService';
import { validations } from '../common/validations';
import ReactDatatable from '@ashvin27/react-datatable';
import { commonService } from '../common/service/CommonService';
import ConfirmPopup from '../common/ConfirmPopup';

class addVendors extends Component {
    constructor(props) {
        super(props)

        this.state = {
            vendor: {
                name: '',
                company: '',
                address: '',
                billingAddress: '',
                landLine: '',
                mobileNumber: '',
                email: '',
                gstNum: '',
                remarks: '',
                accNumber:'',
                ifscCode:'',
                accHolder:'',
            },
            vendorList: [],
            updateVendor: false,
            showModal: false,
            deleteCustomer: false,
            id: '',
        };
        this.ViewInit();
        this.credentials = this.credentials.bind(this);
        this.alerts = new AlertService();
        this.confirmPopupChild = React.createRef();
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
                key: "name", text: " Name", className: " Name", align: "left", sortable: true,
            },
            {
                key: "company", text: "Company", className: "Company", align: "left", sortable: true,
            },
            {
                key: "address", text: "Address", className: "Address", align: "left", sortable: true,
            },
            {
                key: "billingAddress", text: "Billing Address", className: "Billing Address", align: "left", sortable: true,
            },
            {
                key: "landLine", text: "Land Line", className: "Land Line", align: "left", sortable: true,
            },
            {
                key: "mobileNumber", text: "Mobile Number", className: "Mobile Number", align: "left", sortable: true,
            },
            // {
            //     key: "email", text: "Email", className: "Email", align: "left", sortable: true,
            // },
            {
                key: "gstNum", text: "GST Number", className: "GST Number", align: "left", sortable: true,
            },
            {
                key: "accNumber", text: "Acc Number", className: "Acc Number", align: "left", sortable: true,
            },
            {
                key: "ifscCode", text: "IFSC Code", className: "IFSC Code", align: "left", sortable: true,
            },
            {
                key: "accHolder", text: "Acc Holder", className: "Acc Holder", align: "left", sortable: true,
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
                                onClick={() => this.editRecord(record)}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
    }

    editRecord(record) {
        let id = record.id;
        window.location.href = "#";
        this.setState({ id: id, updateVendor: true });
        commonService.getVendorDetails(id)
            .then(data => {
                this.setViewData(data);
            })
            .catch(err => this.alerts.error(err));
    }

    setViewData(data) {
        if (data) {
            this.setState({
                vendor: {
                    name: data.data().name,
                    company: data.data().company,
                    address: data.data().address,
                    billingAddress: data.data().billingAddress,
                    landLine: data.data().landLine,
                    mobileNumber: data.data().mobileNumber,
                    email: data.data().email,
                    gstNum: data.data().gstNum,
                    remarks: data.data().remarks,
                    accNumber: data.data().accNumber,
                    ifscCode: data.data().ifscCode,
                    accHolder: data.data().accHolder,
                },
            });
        }
    }

    deleteRecord(record) {
        this.openConfirmationPopup(record.id);

        // let id = record.id;
        // this.openConfirmationPopup(record.id);
        // this.setState({ showModal: true });
        //     commonService.deleteCustomer(id)
        //         .then(() => {
        //             this.reloadPage();
        //             this.alerts.success("Customer Deleted Successfully")
        //         })
        //         .catch(err => this.alerts.error(err))

    }

    proceed(rowId, type){
        commonService.deleteVendor(rowId)
                .then(() => {
                    this.reloadPage();
                    this.alerts.success("Vendor Deleted Successfully")
                    this.closeConfirmationPopup();
                })
                .catch(err => this.alerts.error(err))

      }

    openConfirmationPopup(id) {
        this.confirmPopupChild.current.open(id,'','','','');
      }
      
      closeConfirmationPopup() {
        this.confirmPopupChild.current.close();
      }

    credentials(event) {
        const { name, value } = event.target;
        const { vendor } = this.state;
        this.setState({
            vendor: {
                ...vendor,
                [name]: value
            }
        });
    }

    addUpdateVendors = (e) => {
        e.preventDefault();
        const { vendor, id, updateVendor } = this.state;
        if (updateVendor !== true) {
            if (validations.registerVendorValidation(vendor)) {
                commonService.createVendor(vendor)
                    .then(() => {
                        this.alerts.success('Vendor Added Successfully')
                        this.resetInput();
                    })
                    .catch(err => this.alerts.error(err));
            }
        }
        else {
            if (validations.registerCustomerValidation(vendor)) {
                commonService.updateVendor(vendor, id)
                    .then(() => {
                        this.alerts.success('Vendor Updated Successfully')
                        this.resetInput();
                        this.setState({ updateVendor: false })
                    })
                    .catch(err => this.alerts.error(err));
            }
        }
        this.reloadPage();
    }

    // emailCheck() {
    //     const { vendor } = this.state;
    //     commonService.checkCustomer(vendor).then((value) => {
    //         value.forEach(doc => {
    //             let email = doc.data().email;
    //             if (vendor.email === email) {
    //                 this.alerts.error(`${email} Exists`);
    //             }
    //         });
    //     })
    //         .catch(err => this.alerts.error(err.message));
    //     return;
    // }

    resetInput() {
        this.setState({
            vendor: {
                name: '',
                company: '',
                address: '',
                billingAddress: '',
                landLine: '',
                mobileNumber: '',
                email: '',
                gstNum: '',
                remarks: '',
                accNumber:'',
                ifscCode:'',
                accHolder:'',
            }
        });
    }

    getAllVendors() {
        commonService.getVendors().then(data => {
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
                    accNumber: doc.data().accNumber,
                    ifscCode: doc.data().ifscCode,
                    accHolder: doc.data().accHolder,
                });
            });
            this.setState({
                vendorList: datas
            });
        }).catch(err => this.alerts.error(err));
    }

    tableAction() {
        this.getAllVendors();

    }


    componentDidMount() {
        this.getAllVendors();
    }

    reloadPage() {
        this.getAllVendors();
    }

    render() {
        const { vendor, updateVendor } = this.state;
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
                                            Add / Edit / Remove Vendors
                                    </h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                               <div className="card shadow-lg border-0 rounded-lg mt-3">
                               { !updateVendor ?<div className="card-header add-update-form">Add Vendors</div>:
                                  <div className="card-header add-update-form">Update Vendors</div>}
                                        <div className="card-body">
                                            <form id="login-form" onSubmit={this.addUpdateVendors}>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputName">Name</label>
                                                            <input id="name" type="text" name="name" value={vendor.name} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputCompany">Company</label>
                                                            <input id="company" type="text" name="company" value={vendor.company} className="form-control " onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputAddress">Address</label>
                                                            <input id="address" type="text" name="address" value={vendor.address} className="form-control " onChange={this.credentials} />
                                                        </div> </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputBillAddress">Bill Address</label>
                                                            <input id="billingAddress" type="text" name="billingAddress" value={vendor.billingAddress} className="form-control " onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputLandLine">LandLine</label>
                                                            <input id="landLine" type="text" name="landLine" value={vendor.landLine} className="form-control " onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputMobileNumber">Mobile Number</label>
                                                            <input id="mobileNumber" type="text" name="mobileNumber" value={vendor.mobileNumber} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputGSTNum">GST Num</label>
                                                            <input id="gstNum" type="text" name="gstNum" value={vendor.gstNum} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <div class="form-group">
                                                    <label class="small mb-1" for="inputEmailAddress">Email </label>
                                                    <input id="inputEmailAddress" type="text" name="email" value={vendor.email} className="form-control" onChange={this.credentials} />
                                                </div>
                                                </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputAccNumber">Acc number</label>
                                                            <input id="accNumber" type="text" name="accNumber" value={vendor.accNumber} className="form-control " onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputIfscCode">IFSC Code</label>
                                                            <input id="ifscCode" type="text" name="ifscCode" value={vendor.ifscCode} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                </div>
                                                    {/* <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputRemarks">Remarks</label>
                                                            <textarea id="remarks" type="text" name="remarks" value={vendor.remarks} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="col-md-6 form-group text-right"> */}
                                                    <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputAccHolder">Acc Holder</label>
                                                            <input id="accHolder" type="text" name="accHolder" value={vendor.accHolder} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                         <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputRemarks">Remarks</label>
                                                            <textarea id="remarks" type="text" name="remarks" value={vendor.remarks} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                        {!updateVendor ? <button className="btn btn-primary btn-block" href="auth-login-basic.html" >Create Vendor</button>
                                                            : <button className="btn btn-primary btn-block" href="auth-login-basic.html" >Update Vendor</button>}
                                                    
                                                </div>
                                                 </div>
                                                 </div> 
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row justify-content-center">
                                <div className="col-lg-12">
                                    <div className="card shadow-lg border-0 rounded-lg mt-3">
                                        <div className="card-header">Vendor List</div>
                                        <div className="card-body">
                                            <div className="datatable">
                                                <ReactDatatable
                                                    config={this.config}
                                                    records={this.state.vendorList}
                                                    columns={this.columns}
                                                    onChange={(data) => this.tableAction(data)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
                <ConfirmPopup ref={this.confirmPopupChild} proceed={(rowId, type)=> this.proceed(rowId,type)}/>
            </div>
        )
    }
}

export default addVendors;

