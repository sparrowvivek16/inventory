
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

var close = document.getElementsByClassName("closebtn");
var i;

for (i = 0; i < close.length; i++) {
  close[i].onclick = function(){
    var div = this.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}