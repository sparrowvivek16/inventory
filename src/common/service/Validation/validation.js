import AlertService from '../AlertService';

const alerts = new AlertService();

export const validation = {
    registerValidation
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
    else if (isNaN(values.phoneNumber)) { 
        alerts.snack('Enter Number.','red'); 
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
    else if ((values.password.trim().length <=9)) {
        alerts.snack('Password must contain at least 10 characters.','red');  
    }    
      else  if (values.password.search(/[0-9]/) < 0) {
        alerts.snack('Your password must contain at least one digit.','red'); 
     } 
     else   if (values.password.search(/[a-zA-Z]/i) < 0) {
        alerts.snack('Your password must contain at least one letter.','red'); 
    } 
     else  if (values.password.search(/[!@#$%^&*(_+|>?~,./`;':|]/) < 0) {
        alerts.snack('Your password must contain at least one special charcter.','red'); 
    }
    else if (!values.confirmPassword) {
        alerts.snack('Confirm Password is required.','red');  
    }
    else if (values.password !== values.confirmPassword) {
        alerts.snack("Password and Confirm Password don't match.","red");
    }
    else if ((!values.role) || (values.role && values.role === '-1')) {
        alerts.snack("Select role","red");
    }
}

function ValidateEmail(mail) {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (pattern.test(mail)) {
            return (true)
        }
        return (false)
      }