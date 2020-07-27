import AlertService from '../common/service/AlertService';

const alerts = new AlertService();

export const validations = {
    registerValidation,
    addItemValidation
}

//Registration
function registerValidation(values) {
    if (!values.firstName) {
        alerts.snack('First Name is required.','red');  
    }
    else if (!values.lastName) {
        alerts.snack('Last Name is required.','red');  
    }
    else if (!values.address) {
        alerts.snack('Address is required.','red');  
    }
    else if (!values.phoneNumber) {
        alerts.snack('Phone Number is required.','red');  
    }
    else if (!values.email) {
        alerts.snack('Email is required.','red');  
    }
    else if (values.email && !ValidateEmail(values.email)) {
        alerts.snack('Email is not valid','red');
        } 
    else if (!values.userName) {
        alerts.snack('User Name is required.','red');  
    }
    else if (!values.password) {
        alerts.snack('Password  is required.','red');  
    }
    else if (!values.confirmPassword) {
        alerts.snack('Confirm Password is required.','red');  
    }
    else if (values.password !== values.confirmPassword) {
        alerts.snack("Password and Confirm Password don't match.","red");
    }
}

function addItemValidation(values){    
    if(!values.particulars){
        alerts.snack('Item particular is missing.','red')
    }else if(!values.category){
        alerts.snack('Please Select a category','red')
    }else if(!values.subcategory){
        alerts.snack('Please Select a Sub-category','red')
    }else if(!values.qty){
        alerts.snack('Enter the available quantity','red')
    }else if(!values.unit){
        alerts.snack('Please Select a Unit','red')
    }else if(!values.skuID){
        alerts.snack('SKU-ID is required','red')
    }else if(!values.manufactureprice){
        alerts.snack('Please enter your manufacturing price','red')
    }else if(!values.mrp){
        alerts.snack('Maximum Retail Price is required','red')
    }else if(!values.tax){
        alerts.snack('Please Select your tax(s)','red')
    }else{
        return true;
    }

}

function ValidateEmail(mail) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (pattern.test(mail)) {
            return (true)
        }
        return (false)
      }