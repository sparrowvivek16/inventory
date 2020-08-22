import AlertService from './service/AlertService';

const alerts = new AlertService();

export const validations = {
    loginValidation,
    registerValidation,
    profileValidation,
    updatePassword,
    forgetPasswordValidation
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