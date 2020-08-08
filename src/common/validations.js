import AlertService from '../common/service/AlertService';

const alerts = new AlertService();

export const validations = {
    registerValidation,
    addItemValidation,
    newCategoryValid,
    newUnitValid,
    newTaxValid
}

//Registration
function registerValidation(values) {
    if (!values.firstName) {
        alerts.snack('First Name is required.','bg-red');  
    }
    else if (!values.lastName) {
        alerts.snack('Last Name is required.','bg-red');  
    }
    else if (!values.address) {
        alerts.snack('Address is required.','bg-red');  
    }
    else if (!values.phoneNumber) {
        alerts.snack('Phone Number is required.','bg-red');  
    }
    else if (!values.email) {
        alerts.snack('Email is required.','bg-red');  
    }
    else if (values.email && !ValidateEmail(values.email)) {
        alerts.snack('Email is not valid','bg-red');
        } 
    else if (!values.userName) {
        alerts.snack('User Name is required.','bg-red');  
    }
    else if (!values.password) {
        alerts.snack('Password  is required.','bg-red');  
    }
    else if (!values.confirmPassword) {
        alerts.snack('Confirm Password is required.','bg-red');  
    }
    else if (values.password !== values.confirmPassword) {
        alerts.snack("Password and Confirm Password don't match.","bg-red");
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
    }else if(!values.mrp){
        alerts.snack('Maximum Retail Price is required','bg-red');
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

//general email validation
function ValidateEmail(mail) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (pattern.test(mail)) {
            return (true)
        }
        return (false)
      }