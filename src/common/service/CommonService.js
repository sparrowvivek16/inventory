import firebase from '../../config/firebase.Config';

const auth = firebase.auth();
const db = firebase.firestore();

export const commonService = {
    createUsers,
    AddEmail,
    getAllCategory,
    getAllUnits,
    getAllTax,
    barCodeChk
}

function AddEmail(user) {
    const addemail= auth.createUserWithEmailAndPassword(user.email,user.password);
    //createUsers(user);
    return addemail;
 }

function createUsers(user) {
  
        const cUsers = db.collection("users").add({
         firstName: user.firstName,
         lastName:  user.lastName,
         address:  user.address,
         phoneNumber:  user.phoneNumber,
         email:  user.email,
         role:  user.role,
     });
     return cUsers;
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

