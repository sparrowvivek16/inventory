
class AlertService {    
    closeBtn(ins){
    ins.remove();
    }
    
    snack(message, type){
        //remove exsisting alert message if any
        if(document.querySelector('.snackbar')){
            document.querySelector('.snackbar').remove();
        }
        //create the alert element
        const snackbar = document.createElement('div');
        snackbar.classList.add('snackbar');
        snackbar.classList.add('active'); 
        snackbar.classList.add(type);  
        
        //create a message element
        const mess =document.createElement('p');
        mess.textContent=message;

        //create the close button and add click event to closeBtn   
        const closebtn = document.createElement('span');
        closebtn.classList.add('snackclose');
        closebtn.classList.add('btn-xs');
        closebtn.classList.add('btn-light');
        closebtn.textContent ='x';
        closebtn.addEventListener('click',()=>this.closeBtn(snackbar));

        //assign the element to body        
        document.querySelector('body').appendChild(snackbar);
        //assign the button to element
        snackbar.appendChild(closebtn); 
        //assign the message
        snackbar.appendChild(mess);              
        
        //remove it after 6 sec
        setTimeout(() => {
        snackbar.remove(); 
        }, 6000);
    }

}

export default AlertService;