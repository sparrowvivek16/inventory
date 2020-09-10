import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup } from 'reactstrap';
import AlertService from '../common/service/AlertService';

class OrderPopup extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            submitted: false,
            backEndError: '',
            showModal: false,
            popupBody:'jfgljfg',
            popupHeader: 'Item Selection',
            popupButtonTxt:'Yes',
            popupButtonTxt1:'No',
            rowId: 0
        };
    
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.alertService = new AlertService();
    }

    close(){
        this.setState({ showModal: false });
    }
    
    open(popupHeader,popupButtonTxt,popupButtonTxt1){
        if(popupHeader  && popupButtonTxt && popupButtonTxt1){
            this.setState({ 
                popupHeader: popupHeader,
                popupButtonTxt: popupButtonTxt,
                popupButtonTxt1: popupButtonTxt1
            });
        }
        this.setState({ showModal: true, });
        console.log('show login popup');
    }

    createOrUpdateNotification(rowId, type) {
       alert("hi")
      }


      
  render(){
    const {  rowId , popupButtonTxt} = this.state;
    return (
        <div>
        <Modal isOpen={this.state.showModal} className="col-md-8">
            <div>
                <ModalHeader toggle={this.close}>{this.state.popupHeader}</ModalHeader>
                <ModalBody>
                    <div className="categories-holder">
                        <FormGroup>
                           <input type="text"></input>
                           <input type="text"></input>
                           <input type="text"></input>
                           <input type="text"></input>
                           <input type="text"></input>

                            <input type="text"></input>
                        </FormGroup>
                    </div>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={() => this.createOrUpdateNotification(rowId,popupButtonTxt)}>{this.state.popupButtonTxt}</Button>
                    <Button color="secondary" onClick={this.close}>{this.state.popupButtonTxt1}</Button>
                </ModalFooter>
            </div>
        </Modal>
    </div>
    );
  }
}
export default OrderPopup;