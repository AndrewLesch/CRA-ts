import { toast, ToastOptions } from 'react-toastify';

const toastConfig: ToastOptions = {
  position: 'top-center',
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: null,
};

const NotificationService = {
  error(msg: string) {
    toast.error(msg, toastConfig);
  },
};

export default NotificationService;
