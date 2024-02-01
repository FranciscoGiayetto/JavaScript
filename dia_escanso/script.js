let dias_laborables= ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'];
let dias_descanso= ['sabado', 'domingo'];
console.log(dias_laborables.length);

function mostrarMensaje(icon, title, text) {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
    });
}

function analisis_dia() {
    var diaInput = document.getElementById('dayInput');
    var dia = diaInput.value.trim().toLowerCase();

    if (dia === '') {
        mostrarMensaje('warning', 'Advertencia', 'Por favor, ingresa un día antes de verificar.');
        return;
    }

    if (dias_laborables.includes(dia)) {
        mostrarMensaje('success', 'Resultado', 'Es un día laborable: ' + dia);
    } else if (dias_descanso.includes(dia)) {
        mostrarMensaje('success', 'Resultado', 'Es un día de descanso: ' + dia);
    } else {
        mostrarMensaje('error', 'Error', 'Día no válido.');
    }

    diaInput.value = '';
}