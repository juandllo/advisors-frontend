import Swal from 'sweetalert2';

const customButtons = Swal.mixin({
  customClass: {
    confirmButton: 'mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90',
    cancelButton: 'mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80'
  },
  buttonsStyling: false,
  confirmButtonText: 'Continuar'
});

export const alertSuccess = (message: string, title?: string) => {
  return customButtons.fire(title ? title: '', message, 'success');
}

export const alertSuccessTimer = (title?: string) => {
  return customButtons.fire({
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1500
  });
}

export const alertError = (message: string, title?: string) => {
  return customButtons.fire(title ? title : '', message, 'error');
}

export const alertWarning = (message: string) => {
  return customButtons.fire(message, '', 'warning');
}

export const alertInfo = (message: string) => {
  return customButtons.fire(message, '', 'info');
}

export const alertDialog = (message: string, title?: string) => {
  return customButtons.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '',
    cancelButtonColor: '',
    confirmButtonText: 'Confirmar'
  });
}