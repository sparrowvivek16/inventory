
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

    modalInit(modalID,title,message,yesBtnID){
        //remove exsisting popup element if any
        if(document.getElementById(modalID)){
            document.getElementById(modalID).remove();
        }
        //create the popup element
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

            const modalTitle = document.createElement('h5');
            modalTitle.classList.add('modal-title');
            modalTitle.setAttribute('id','confirmModalTitle');
            modalTitle.textContent=title;

            const modalDismiss = document.createElement('button');
            modalDismiss.classList.add('close');
            modalDismiss.setAttribute('type','button');
            modalDismiss.setAttribute('data-dismiss','modal');
            modalDismiss.setAttribute('aria-label','Close');

                const closeX = document.createElement('span');
                closeX.setAttribute('aria-hidden','true');
                closeX.textContent='x';

            modalDismiss.appendChild(closeX);

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(modalDismiss);

        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.textContent=message;

        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

            const noButton =document.createElement('button');
            noButton.classList.add('btn');
            noButton.classList.add('btn-secondary');
            noButton.setAttribute('type','button');
            noButton.setAttribute('data-dismiss','modal');
            noButton.textContent='No';

            const yesButton =document.createElement('button');
            yesButton.classList.add('btn');
            yesButton.classList.add('btn-primary');
            yesButton.setAttribute('type','button');
            yesButton.setAttribute('id',yesBtnID);
            yesButton.setAttribute('data-dismiss','modal');
            yesButton.textContent='Yes';

        modalFooter.appendChild(noButton);
        modalFooter.appendChild(yesButton);


        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);

        const modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modalDialog.classList.add('modal-dialog-centered');
        modalDialog.setAttribute('role','document');
        modalDialog.appendChild(modalContent);

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.classList.add('fade'); 
        modal.setAttribute('id',modalID);
        modal.setAttribute('tabindex','-1');
        modal.setAttribute('role','dialog');
        modal.setAttribute('aria-labelledby','confirmModalTitle');
        modal.setAttribute('aria-hidden','true');
        modal.appendChild(modalDialog);
        document.querySelector('body').appendChild(modal);
        
    }

}

export default AlertService;