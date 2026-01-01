import Swal from 'sweetalert2';

const defaultButtonClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 mx-2";

// botones de la alerta customizados de acuerdo con el framework css usado, en este caso tailwind
const customButtons = Swal.mixin({
  customClass: {
    popup: 'dark:bg-muted',
    title: 'dark:text-white',
    htmlContainer: 'dark:text-gray-300',
    confirmButton: `${defaultButtonClass} bg-primary text-primary-foreground hover:bg-primary/90`,
    cancelButton: `${defaultButtonClass} bg-secondary text-secondary-foreground hover:bg-secondary/80`
  },
  buttonsStyling: false,
  confirmButtonText: 'Continuar'
});

// alerta con mensaje de proceso satisfactorio
export const alertSuccess = (message: string, title?: string) => {
  return customButtons.fire(title ? title : '', message, 'success');
}

// alerta que unicamente se visualiza 1.5 segundos
export const alertSuccessTimer = (title?: string) => {
  return customButtons.fire({
    icon: 'success',
    title: title,
    showConfirmButton: false,
    timer: 1500
  });
}

// alerta con mensaje de proceso fallido
export const alertError = (message: string, title?: string) => {
  return customButtons.fire(title ? title : '', message, 'error');
}

// alerta con mensaje de cuidado
export const alertWarning = (message: string) => {
  return customButtons.fire({
    text: message,
    icon: 'warning',
    confirmButtonText: 'Aceptar'
  });
}

// alerta con mensaje informativo
export const alertInfo = (message: string) => {
  return customButtons.fire(message, '', 'info');
}

// alerta con pregunta de si o no
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
