import { GLOBAL_VARIABLE } from '../../config/app.constants'

class StorageService {

    getToken() {
        return sessionStorage.getItem(GLOBAL_VARIABLE.SESSION_KEY);
    }

    setToken(token) {
        sessionStorage.setItem(GLOBAL_VARIABLE.SESSION_KEY,token);
    }
    
    getUID(){
        return sessionStorage.getItem(GLOBAL_VARIABLE.USER_ID);
    }

    setUID(id){
        sessionStorage.setItem(GLOBAL_VARIABLE.USER_ID,id);
    }

    getRole() {
        return sessionStorage.getItem(GLOBAL_VARIABLE.ROLE_KEY);
    }

    setRole(role){
        sessionStorage.setItem(GLOBAL_VARIABLE.ROLE_KEY, role);
    }

    logOut(){
        // remove user from local storage to log user out        
        sessionStorage.removeItem(GLOBAL_VARIABLE.SESSION_KEY);
        sessionStorage.removeItem(GLOBAL_VARIABLE.USER_ID);
    }
}

export default StorageService;