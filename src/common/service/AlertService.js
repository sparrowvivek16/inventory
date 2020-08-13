import Alert from 'react-s-alert';

class AlertService {

  snack(message, type) {

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

  success(value) {
    Alert.success(value, {
      position: 'top-right',
    });
  }

  error(value) {
    Alert.error(value, {
      position: 'top-right'
    });
  }

  info(value) {
    Alert.info(value, {
      position: 'top-right'
    });
  }

  warning(value) {
    Alert.warning(value, {
      position: 'top-right'
    });
  }

}

export default AlertService;