import React, { Component, Fragment  } from 'react';
import firebase from '../../config/firebase.Config';
import AlertService from '../../common/service/AlertService';
import ReactDatatable from '@ashvin27/react-datatable';

class DeleteTax extends Component{
    constructor(props){
        super(props);
        this.conn = firebase.firestore().collection("tax");
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
                key: "name",
                text: "Tax name",
                className: "tax",
                align: "left",
                sortable: true,
            },
            {
                key: "percentage",
                text: "Percentage",
                className: "percentage",
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
                                onClick={() => this.deleteRecord(record)}
                                data-toggle="modal" data-target="#deleteTaxPop">
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
            show_pagination: false,
            button: {
                excel: false,
                print: false
            }
        }
    }
    componentDidMount(){
        //init the modal with dynamic values
        this.alerts.modalInit('deleteTaxPop','Confirm your action','Are you sure to delete this tax?','deleteTaxRec');
    }
 
    deleteRecord(record) {
        document.getElementById('deleteTaxRec').addEventListener('click',()=>{
            this.conn.doc(record.id).delete().then(() => {
                this.props.tableRefresh();
                this.alerts.snack(`Tax name ${record.name} with ${record.percentage}%  deleted`,'bg-green');  
            }).catch(err => console.log(err));
        });
        
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

export default DeleteTax;