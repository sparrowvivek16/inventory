import AlertService from '../common/service/AlertService';
import { utility } from '../common/utility';

const alerts = new AlertService();

export const validations = {
    registerValidation,
    addItemValidation,
    newCategoryValid,
    newUnitValid,
    newTaxValid,
    loginValidation,
    profileValidation,
    updatePassword,
    forgetPasswordValidation,
    updateStockValid
}

//Registration
function registerValidation(values) {
    if (!values.firstName) {
        alerts.error('First Name is required.');
    }
    else if (!values.lastName) {
        alerts.error('Last Name is required.');
    }
    else if (!values.address) {
        alerts.error('Address is required.');
    }
    else if (!values.phoneNumber) {
        alerts.error('Phone Number is required.');
    }
    else if (isNaN(values.phoneNumber)) {
        alerts.error('Enter Number.');
    }
    else if (!values.email) {
        alerts.error('Email is required.');
    }
    else if (values.email && !ValidateEmail(values.email)) {
        alerts.error('Email is not valid');
    }
    else if ((!values.role) || (values.role && values.role === '-1')) {
        alerts.error("Select role");
    }
    else if (!values.password) {
        alerts.error('Password  is required.');
    }
    else if ((values.password.trim().length <= 9)) {
        alerts.error('Password must contain at least 10 characters.');
    }
    else if (values.password.search(/[0-9]/) < 0) {
        alerts.error('Your password must contain at least one digit.');
    }
    else if (values.password.search(/[a-zA-Z]/i) < 0) {
        alerts.error('Your password must contain at least one letter.');
    }
    else if (values.password.search(/[!@#$%^&*(_+|>?~,./`;':|]/) < 0) {
        alerts.error('Your password must contain at least one special charcter.');
    }
    else if (!values.confirmPassword) {
        alerts.error('Confirm Password is required.');
    }
    else if (values.password !== values.confirmPassword) {
        alerts.error("Password and Confirm Password don't match.");
    }
    else {
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

function profileValidation(values) {
    if (!values.firstName) {
        alerts.error('First Name is required.');
    }
    else if (!values.lastName) {
        alerts.error('Last Name is required.');
    }
    else if (!values.address) {
        alerts.error('Address is required.');
    }
    else if (!values.phoneNumber) {
        alerts.error('Phone Number is required.');
    }
    else if (isNaN(values.phoneNumber)) {
        alerts.error('Enter Number.');
    }
    else {
        return true;
    }
}

function updatePassword(values) {
    if (!values.currentPassword) {
        alerts.error('Current Password is required');
    }
    else if ((values.currentPassword.trim().length <= 9)) {
        alerts.error('Password must contain at least 10 characters.');
    }
    else if (!values.newPassword) {
        alerts.error('NewPassword is required');
    }
    else if (values.oldPassword === values.newPassword) {
        alerts.error('Old password and New Password are same');
    }
    else if ((values.newPassword.trim().length <= 9)) {
        alerts.error('Password must contain at least 10 characters.');
    }
    else if (values.newPassword.search(/[0-9]/) < 0) {
        alerts.error('Your password must contain at least one digit');
    }
    else if (values.newPassword.search(/[a-zA-Z]/i) < 0) {
        alerts.error('Your password must contain at least one letter');
    }
    else if (values.newPassword.search(/[!@#$%^&*(_+|<>?~,``./'';:|)]/) < 0) {
        alerts.error('Your password must contain at least one special charcter');
    }
    else if (values.newPassword !== values.confirmPassword) {
        alerts.error("New Password and Confirm Password don't match");
    }
    else if (!values.confirmPassword) {
        alerts.error('Confirm Password is required');
    }
    else if (values.currentPassword === values.confirmPassword) {
        alerts.error("New Password and Current Password are same");
    }
    else {
        return true;
    }
}

function loginValidation(user, password) {
    if (!user) {
        alerts.error('Email is required');
    }
    else if (user && !ValidateEmail(user)) {
        alerts.error('Email is not valid');
    }
    else if (!password) {
        alerts.error('Password is required');
    }
    else {
        return true;
    }
}
function forgetPasswordValidation(email) {
    if (!email) {
        alerts.error('Email is required');
    }
    else if (email && email.length <= 5) {
        alerts.error('Email must contain at least 6 characters');
    }
    else if (email && !ValidateEmail(email)) {
        alerts.error('Email is not valid');
    }
    else {
        return true;
    }
}

//add item inventory validations (required field)
function addItemValidation(values){    
    
    if(!values.particulars){
        alerts.snack('Item particular is missing.','bg-red');
    }else if(!values.category){
        alerts.snack('Please Select a category','bg-red');
    }else if(!values.subcategory || values.subcategory==='' || values.subcategory==='0'){
        alerts.snack('Please Select a Sub-category','bg-red');
    }else if(!values.qty){
        alerts.snack('Enter the available quantity','bg-red');
    }else if(!values.unit){
        alerts.snack('Please Select a Unit','bg-red');
    }else if(!values.skuID){
        alerts.snack('SKU-ID is required','bg-red');
    }else if(!values.manufactureprice){
        alerts.snack('Please enter your manufacturing price','bg-red');
    }else if(!values.slp){
        alerts.snack('Selling Price is required','bg-red');
    }else if(!values.taxes || values.taxes.length<1){
        alerts.snack('Please Select your tax(s)','bg-red');
    }else{
        return true;
    }

}

//category validations
function newCategoryValid(val,sec){
    //add new category validation
    if(sec===1){
        if(!val.newcategory){
            alerts.snack('New Category name is required','bg-red');
        }else if(!val.newsubcategory){
            alerts.snack('Sub Category is required for first insert','bg-red');
        }else{
            return true;
        } 
    }
    if(sec===2){
        if(val.docs.length){
            alerts.snack('Category name already exist','bg-red');
        }else{  
            return true;
        }
    }
    if(sec===3){
        if(!val.category || val.category ==='0'){
            alerts.snack('Please select a category','bg-red');
        }else if(!val.subcategory){          
            alerts.snack(`Please enter Sub category for ${val.category}`,'bg-red');
        }else{
            return true;
        }
    }
    if(sec===4){
        if(val.docs.length){
            alerts.snack(`Sub category name already exists for ${val.docs[0].data().name}`,'bg-red');
        }else{  
            return true;
        }
    }
}

function newUnitValid(val,sec){
    if(sec===1){
        if(!val.newunit){
            alerts.snack('New unit value is required','bg-red');
        }else{
            return true;
        }
    }
    if(sec===2){
        if(val.docs.length){
            alerts.snack(`Unit ${val.docs[0].data().unit} already exists`,'bg-red');
        }else{  
            return true;
        }
    }
}

function newTaxValid(val,sec){
    if(sec===1){
        if(!val.newtax){
            alerts.snack('New tax value is required','bg-red');
        }else if(!val.newtaxpercent){
            alerts.snack('New tax percentage is required','bg-red');
        }else{
            return true;
        }
    }
    if(sec===2){
        if(val.docs.length){
            alerts.snack(`Tax name ${val.docs[0].data().name} already exists`,'bg-red');
        }else{  
            return true;
        }
    }

    if(sec===3){
        if(!val.taxname || val.taxname ==='0'){
            alerts.snack('Please select a tax name','bg-red');
        }else if(!val.newpercent){
            alerts.snack(`New tax percentage for ${val.taxname} is required`,'bg-red');
        }else{
            return true;
        }
    }

    if(sec===4){
        if(val.docs.length){
            alerts.snack(`Tax ${val.docs[0].data().percentage}% already exists for the tax name ${val.docs[0].data().name}`,'bg-red');
        }else{  
            return true;
        }
    }
}

function updateStockValid(val){ 
    if(!val.searchterm){
        alerts.snack('Search and select an item to update stock','bg-red');
    }else if(!val.qtyupdate){
        alerts.snack('Update quantity is required','bg-red');
    }else if(!val.nuexpdate){
        alerts.snack('New expiry date is required','bg-red');
    }else if(utility.compareDate(val.nuexpdate,new Date(),'<=')){
        alerts.snack('Expiry date cannot be today or lower','bg-red');
    }else{
        return true;
    }
}
