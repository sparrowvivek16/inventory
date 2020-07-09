
class AlertService {
    
    snack(message, type){

        const snackbar = document.createElement('div');
        
        snackbar.classList.add('snackbar');
        document.querySelector('body').appendChild(snackbar);
        snackbar.textContent = message;
        snackbar.classList.add('active'); 
        snackbar.classList.add(type);       
        setTimeout(() => {
        snackbar.remove(); 
        }, 6000);
    }

}

export default AlertService;