
import firebase from '../config/firebase.Config';

const auth = firebase.auth();
const db = firebase.firestore();

export const commonService = {
    signIn,
    createUsers,
    addEmail,
    //updateUser
}

function signIn(user,password) {
    const signIn= auth.signInWithEmailAndPassword(user,password);
    return signIn;
 }

function addEmail(user) {
    const addEmail= auth.createUserWithEmailAndPassword(user.email,user.password);
    if(addEmail===true){
        createUsers(user);
    }
    return addEmail;
 }

function createUsers(user) {
        const createUsers = db.collection("users").add({
         firstName: user.firstName,
         lastName:  user.lastName,
         address:  user.address,
         phoneNumber:  user.phoneNumber,
         email:  user.email,
         role:  user.role,
     });
     return createUsers;
}

// function updateUser(user) {
//     const updateUser = this.db.collection("users").doc(doc.id).update({ 
//         firstName: user.firstName,
//         lastName:  user.lastName,
//         address:  user.address,
//         phoneNumber:  user.phoneNumber,
//         role:  user.role});
//  return updateUser;
// }

