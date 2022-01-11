import Swal from "sweetalert2";

export async function enableSwal () {
  await Swal.fire({
    title: 'Atenção',
    text: 'Funcionalidade indisponível',
    html: '',
    icon: 'info'
  })
}