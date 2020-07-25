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
    else if ((!values.country) || (values.country && values.country === '-1')) {
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