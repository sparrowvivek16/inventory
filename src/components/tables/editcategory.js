import React, { Component, Fragment  } from 'react';
import firebase from '../../config/firebase.Config';
import AlertService from '../../common/service/AlertService';
import ReactDatatable from '@ashvin27/react-datatable';

class Editcategory extends Component{
    constructor(props){
        super(props);
        this.conn = firebase.firestore().collection("category");
        this.alerts = new AlertService();
        this.columns = [
            {
                key: "slno",
                text: "#",
                className: "slno",
                align: "left",
                sortable: true,
            },
            {
                key: "category",
                text: "Category",
                className: "category",
                align: "left",
                sortable: true,
            },
            {
                key: "subcategory",
                text: "Subcategory",
                className: "subcategory",
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
                            {/* <button
                                className="btn btn-primary btn-sm"
                                onClick={() => this.editRecord(record)}
                                style={{marginRight: '5px'}}>
                                <i className="fa fa-edit"></i>
                            </button> */}
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
    state={
        
    }
    // editRecord(record) {
    //     console.log("Edit Record", record);
    // }
 
    deleteRecord(record) {
        this.conn.doc(record.id).delete().then(() => {
            this.props.tableRefresh();
            this.alerts.snack(`Subcategory ${record.subcategory} deleted`,'green');  
        }).catch(err => console.log(err));
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

export default Editcategory;