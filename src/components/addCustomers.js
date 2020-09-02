import React, { Component, Fragment } from 'react'
import AlertService from '../common/service/AlertService';
import { validations } from '../common/validations';
import ReactDatatable from '@ashvin27/react-datatable';
import { commonService } from '../common/service/CommonService';
import ConfirmPopup from '../common/ConfirmPopup';

class addCustomers extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
            },
            customerList: [],
            updateCustomer: false,
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
            {
                key: "email", text: "Email", className: "Email", align: "left", sortable: true,
            },
            {
                key: "gstNum", text: "GST Number", className: "GST Number", align: "left", sortable: true,
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
        this.setState({ id: id, updateCustomer: true });
        commonService.getCustomerDetails(id)
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
                    landLine: data.data().landLine,
                    mobileNumber: data.data().mobileNumber,
                    email: data.data().email,
                    gstNum: data.data().gstNum,
                    remarks: data.data().remarks,
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
        commonService.deleteCustomer(rowId)
                .then(() => {
                    this.reloadPage();
                    this.alerts.success("Customer Deleted Successfully")
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
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    addUpdateCustomers = (e) => {
        e.preventDefault();
        const { user, id, updateCustomer } = this.state;
        if (updateCustomer !== true) {
            if (validations.registerCustomerValidation(user)) {
                commonService.createCustomer(user)
                    .then(() => {
                        this.alerts.success('Customer Added Successfully')
                        this.resetInput();
                    })
                    .catch(err => this.alerts.error(err));
            }
        }
        else {
            if (validations.registerCustomerValidation(user)) {
                commonService.updateCustomer(user, id)
                    .then(() => {
                        this.alerts.success('Customer Updated Successfully')
                        this.resetInput();
                        this.setState({ updateCustomer: false })
                    })
                    .catch(err => this.alerts.error(err));
            }
        }
        this.reloadPage();
    }

    // emailCheck() {
    //     const { user } = this.state;
    //     commonService.checkCustomer(user).then((value) => {
    //         value.forEach(doc => {
    //             let email = doc.data().email;
    //             if (user.email === email) {
    //                 this.alerts.error(`${email} Exists`);
    //             }
    //         });
    //     })
    //         .catch(err => this.alerts.error(err.message));
    //     return;
    // }

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
            }
        });
    }

    getAllCustomers() {
        commonService.getCustomers().then(data => {
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
            this.setState({
                customerList: datas
            });
        }).catch(err => this.alerts.error(err));
    }

    tableAction() {
        this.getAllCustomers();

    }


    componentDidMount() {
        this.getAllCustomers();
    }

    reloadPage() {
        this.getAllCustomers();
    }

    render() {
        const { user, updateCustomer } = this.state;
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
                                            Add / Edit / Remove Customers
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
                               { !updateCustomer ?<div className="card-header add-update-form">Add Customer</div>:
                                  <div className="card-header add-update-form">Update Customer</div>}
                                        <div className="card-body">
                                            <form id="login-form" onSubmit={this.addUpdateCustomers}>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputName">Name</label>
                                                            <input id="name" type="text" name="name" value={user.name} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputCompany">Company</label>
                                                            <input id="company" type="text" name="company" value={user.company} className="form-control " onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputAddress">Address</label>
                                                            <input id="address" type="text" name="address" value={user.address} className="form-control " onChange={this.credentials} />
                                                        </div> </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputBillAddress">Bill Address</label>
                                                            <input id="billingAddress" type="text" name="billingAddress" value={user.billingAddress} className="form-control " onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputLandLine">LandLine</label>
                                                            <input id="landLine" type="text" name="landLine" value={user.landLine} className="form-control " onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputMobileNumber">Mobile Number</label>
                                                            <input id="mobileNumber" type="text" name="mobileNumber" value={user.mobileNumber} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputGSTNum">GST Num</label>
                                                            <input id="gstNum" type="text" name="gstNum" value={user.gstNum} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <div class="form-group">
                                                    <label class="small mb-1" for="inputEmailAddress">Email </label>
                                                    <input id="inputEmailAddress" type="text" name="email" value={user.email} className="form-control" onChange={this.credentials} />
                                                </div>
                                                </div>
                                                    {/* <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputRemarks">Remarks</label>
                                                            <textarea id="remarks" type="text" name="remarks" value={user.remarks} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="col-md-6 form-group text-right"> */}
                                                         <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label className="small mb-1" htmlFor="inputRemarks">Remarks</label>
                                                            <textarea id="remarks" type="text" name="remarks" value={user.remarks} className="form-control" onChange={this.credentials} />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                        {!updateCustomer ? <button className="btn btn-primary btn-block" href="auth-login-basic.html" >Create Customer</button>
                                                            : <button className="btn btn-primary btn-block" href="auth-login-basic.html" >Update Customer</button>}
                                                    
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
                                        <div className="card-header">Customer List</div>
                                        <div className="card-body">
                                            <div className="datatable">
                                                <ReactDatatable
                                                    config={this.config}
                                                    records={this.state.customerList}
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

export default addCustomers;
