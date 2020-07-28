
import firebase from '../../config/firebase.Config';

const auth = firebase.auth();
const db = firebase.firestore();

export const commonService = {
    createUsers,
    AddEmail
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

