
import firebase from '../config/firebase.Config';

const auth = firebase.auth();
const db = firebase.firestore();

export const commonService = {
    signIn,
    createUsers,
    addEmail,
    getUsers
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

function getUsers() {
    const getUsers = db.collection("users").get(); 
 return getUsers;
}

