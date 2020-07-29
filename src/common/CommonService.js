
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

async function addEmail(user) {
    return await auth.createUserWithEmailAndPassword(user.email,user.password);    
    
 }

async function createUsers(user) {
        return await db.collection("users").add({
         firstName: user.firstName,
         lastName:  user.lastName,
         address:  user.address,
         phoneNumber:  user.phoneNumber,
         email:  user.email,
         role:  user.role,
     });
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

