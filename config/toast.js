import { ToastAndroid } from 'react-native';

const ShowToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT, ToastAndroid.TOP);
};

export default ShowToast;
