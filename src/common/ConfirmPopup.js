
import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,FormGroup,Label } from 'reactstrap';
import AlertService from '../common/service/AlertService';

class ConfirmPopup extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
            submitted: false,
            backEndError: '',
            showModal: false,
            popupHeader: 'Confirm Deletion',
            popupBody: 'Are you sure you want to delete?',
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
        console.log('close login popup');
    }
    
    open(rowId,popupHeader,popupBody,popupButtonTxt,popupButtonTxt1){
        if(popupHeader && popupBody && popupButtonTxt && popupButtonTxt1){
            this.setState({ 
                popupHeader: popupHeader,
                popupBody: popupBody,
                popupButtonTxt: popupButtonTxt,
                popupButtonTxt1: popupButtonTxt1
            });
        }
        this.setState({ showModal: true, rowId : rowId });
        console.log('show login popup');
    }



      
  render(){
    const {  rowId , popupButtonTxt} = this.state;
    return (
        <div>
        <Modal isOpen={this.state.showModal} className={this.props.className}>
            <div>
                <ModalHeader toggle={this.close}>{this.state.popupHeader}</ModalHeader>
                <ModalBody>
                    <div className="categories-holder">
                        <FormGroup>
                            <Label for="">{this.state.popupBody}</Label>
                        </FormGroup>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=> this.props.proceed(rowId ,popupButtonTxt)}>{this.state.popupButtonTxt}</Button>
                    <Button color="secondary" onClick={this.close}>{this.state.popupButtonTxt1}</Button>
                </ModalFooter>
            </div>
        </Modal>
    </div>
    );
  }
}
export default ConfirmPopup;