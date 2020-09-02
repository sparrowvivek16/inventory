import firebase from '../../config/firebase.Config';

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage().ref();

export const commonService = {
    signIn,
    checkUser,
    createUsers,
    addEmail,
    getUsers,
    toggleUsers,
    getProfileById,
    updateUsers,
    updatePassword,
    updatePicture,
    updateFullProfile,
    getAllCategory,
    getAllUnits,
    getAllTax,
    barCodeChk,
    getAllItems,
    createCustomer,
    updateCustomer,
    getCustomers,
    getCustomerDetails,
    deleteCustomer,
   // checkCustomer
}

function signIn(user, password) {
    const signIn = auth.signInWithEmailAndPassword(user, password);
    return signIn;
}

function checkUser(user) {
    const checkUser = db.collection("users").where("email", "==", user).get();
    return checkUser;
}


async function addEmail(user) {
    return await auth.createUserWithEmailAndPassword(user.email, user.password);

}

async function createUsers(user, id) {
    return await db.collection("users").doc(id).set({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        status: true
    });
}

function getUsers() {
    const getUsers = db.collection("users").where("role", "==", "user").get();
    return getUsers;
}

function toggleUsers(tempRec, id) {
    const toggleUsers = db.collection("users").doc(id).update({
        status: tempRec
    });
    return toggleUsers;
}

function getProfileById(id) {
    const getProfileById = db.collection("users").doc(id).get();
    return getProfileById;
}

function getCustomerDetails(id) {
    const getCustomerDetails = db.collection("customers").doc(id).get();
    return getCustomerDetails;
}

function updateUsers(user, uid) {
    const updateUsers = db.collection("users").doc(uid).update({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
    });
    return updateUsers;
}

function updatePassword(email) {
    const updatePassword = auth.sendPasswordResetEmail(email);
    return updatePassword;
}

async function updatePicture(image, name, metadata) {
    return await storage.child(name).put(image, metadata)
}

function updateFullProfile(user, uid, imageUrl) {
    const updateFullProfile = db.collection("users").doc(uid).set({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
        email: user.email,
        role: user.role,
        status: user.status,
        image: imageUrl,
    });
    return updateFullProfile;
}

// fetch all category
async function getAllCategory(){
    try {
        return await db.collection('category').get();
    }
    catch (err) {
        return console.log(err);
    }
}

//fetch all units
async function getAllUnits(){
    try{
        return await db.collection('units').get();
    }catch (err){
        return console.log(err);
    }
}

//fetch all tax(s)
async function getAllTax(){
    try{
        return await db.collection('tax').get();         
    }catch (err){
        return console.log(err);
    }
}

//check barcode exists or not
async function barCodeChk(val){ 
    try{
        return await db.collection('items').where('barcode','==',val).get();   
    }catch(err){
        return console.log(err);
    }         
        
}

//fetch all Item(s)
async function getAllItems(){
    try{
        return await db.collection('items').get();         
    }catch (err){
        return console.log(err);
    }
}


function createCustomer(user) {
    const createCustomers =  db.collection("customers").add({
        name: user.name,
        company: user.company,
        address: user.address,
        billingAddress: user.billingAddress,
        landLine: user.landLine,
        mobileNumber: user.mobileNumber,
        email: user.email,
        gstNum: user.gstNum,
        remarks:user.remarks,
    });
    return createCustomers;
}


function updateCustomer(user,id) {
    const updateCustomer =  db.collection("customers").doc(id).update({
        name: user.name,
        company: user.company,
        address: user.address,
        billingAddress: user.billingAddress,
        landLine: user.landLine,
        mobileNumber: user.mobileNumber,
        email: user.email,
        gstNum: user.gstNum,
        remarks:user.remarks,
    });
    return updateCustomer;
}

function getCustomers() {
    const getCustomers = db.collection("customers").get();
    return getCustomers;
} 

function deleteCustomer(rowId) { 
    const deleteCustomer =  db.collection("customers").doc(rowId).delete();
    return deleteCustomer;
} 

// function checkCustomer(user) {
//     const checkCustomer = db.collection("customers").get();
//     return checkCustomer;
// }