import React, { Component, Fragment  } from 'react';
import firebase from '../../config/firebase.Config';
import AlertService from '../../common/service/AlertService';
import ReactDatatable from '@ashvin27/react-datatable';

class EditDeleteItem extends Component{
    constructor(props){
    super(props);
        this.conn = firebase.firestore().collection("items");
        this.alerts = new AlertService();
        this.columns = [
            {
                key: "slno",
                text: "#",
                align: "left",
                sortable: true,
            },
            {
                key: "particulars",
                text: "Item",
                align: "left",
                sortable: true,
            },
            {
                key: "category",
                text: "Cat",
                align: "left",
                sortable: true,
            },
            {
                key: "subcategory",
                text: "Subcat",
                align: "left",
                sortable: true,
            },
            {
                key: "qty",
                text: "Qty",
                align: "left",
                sortable: true,
            },
            {
                key: "unit",
                text: "Unit",
                align: "left",
                sortable: true,
            },
            {
                key: "skuID",
                text: "SKU-ID",
                align: "left",
                sortable: true,
            },
            {
                key: "expdate",
                text: "ExpiryDate",
                align: "left",
                sortable: true,
            },
            {
                key: "barcode",
                text: "Barcode",
                align: "left",
                sortable: true,
            },
            {
                key: "manufactureprice",
                text: "MFG Price",
                align: "left",
                sortable: true,
            },
            {
                key: "slp",
                text: "Selling price",
                align: "left",
                sortable: true,
            },
            {
                key: "tax",
                text: "TaxPercent",
                align: "left",
                sortable: true,
            },
            {
                key: "hsncode",
                text: "HSN Code",
                align: "left",
                sortable: true,
            },
            {
                key: "remarks",
                text: "Remarks",
                align: "left",
                sortable: true,
            },      
            {
                key: "action",
                text: "Action",
                className: "action",
                width: 100,
                align: "left",
                sortable: false,
                cell: record => { 
                    return (
                        <Fragment>
                            <button 
                                className="btn btn-danger btn-sm" 
                                data-toggle="modal" data-target="#deleteItemPop"
                                onClick={() => this.deleteRecord(record)}>
                                <i className="fa fa-trash"></i>
                            </button>
                            <button 
                                className="btn btn-primary btn-sm" 
                                onClick={() => this.editRecord(record)}>
                                <i className="fa fa-edit"></i>
                            </button>
                        </Fragment>
                    );
                }
            }
        ];
        this.config = {
            page_size: 10,
            length_menu: [10, 20, 50],
            show_filter: true,
            show_pagination: true,
            button: {
                excel: false,
                print: false
            }
        }
    }
    componentDidMount(){
        //init the modal with dynamic values
        this.alerts.modalInit('deleteItemPop','Confirm your action','Are you sure to delete this Item?','deleteItemRec');
    }
    deleteRecord(record) {
        document.getElementById('deleteItemRec').addEventListener('click',()=>{
            this.conn.doc(record.id).delete().then(() => {
                this.props.tableRefresh();
                this.alerts.snack(`Item ${record.particulars} has been successfully deleted`,'bg-green');  
            }).catch(err => console.log(err));
        });
    }
    editRecord(record){
        this.props.editItem(record);
    }
    render() {
        return (
            <div className="datatable table-responsive">
                <ReactDatatable
                    config={this.config}
                    records={this.props.records}
                    columns={this.columns}
                />
            </div>
        )
    }
}

export default EditDeleteItem;