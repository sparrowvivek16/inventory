
import firebase from '../config/firebase.Config';

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
    updateFullProfile
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



