let saldo = 0;
let transacciones = [];

function agregarTransaccion(tipo, monto) {
    const nuevaTransaccion = {
        tipo: tipo,
        monto: monto,
        fecha: new Date().toLocaleString()
    };
    transacciones.push(nuevaTransaccion);
    console.log('transacciones: ', transacciones);
}

function mostrarHistorial() {
    const tabla = document.getElementById("historialTabla");
    tabla.innerHTML = "<tr><th>Tipo</th><th>Monto</th><th>Fecha</th><th>Hora</th></tr>";

    const transaccionesOrdenadas = transacciones.slice().reverse();

    transaccionesOrdenadas.forEach((transaccion) => {
        const [fecha, hora] = transaccion.fecha.split(', ');

        const fila = `<tr><td>${transaccion.tipo}</td><td>$${transaccion.monto.toFixed(2)}</td><td>${fecha}</td><td>${hora}</td></tr>`;
        tabla.innerHTML += fila;
    });
}

function mostrarSaldo() {
    console.log("Tu saldo actual es de: $" + saldo.toFixed(2));
    document.getElementById("saldo").innerText = "$ " + saldo.toFixed(2);
    return saldo;
}

function ingresar() {
    const tipo = document.getElementById("tipoTransaccion").value;
    const monto = parseFloat(document.getElementById("cantidad").value);
    if (isNaN(monto) || monto < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ingrese un monto válido y positivo',
        });
        return;
    }
    
    agregarTransaccion('INGRESO', monto);
    saldo = saldo + monto;
    mostrarSaldo();
    Swal.fire({
        icon: 'success',
        title: 'Depósito exitoso',
        text: `Nuevo saldo: $${saldo.toFixed(2)}`,
    });
    console.log("Tu saldo actual es de: $" + saldo);
}

function retirar() {
    const montoRetiro = parseFloat(document.getElementById("cantidad").value);
    if (isNaN(montoRetiro) || montoRetiro < 0) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ingrese un monto válido y positivo',
        });
        return;
    }
    
    if (montoRetiro <= saldo) {
        saldo -= montoRetiro;
        agregarTransaccion('RETIRO', montoRetiro);
        mostrarSaldo();
        Swal.fire({
            icon: 'success',
            title: 'Retiro exitoso',
            text: `Nuevo saldo: $${saldo.toFixed(2)}`,
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No tiene suficiente dinero en la cuenta',
        });
    }
    console.log("Tu saldo actual es de: $" + saldo);
}

function realizarTransaccion() {
    const tipoTransaccion = document.getElementById("tipoTransaccion").value;

    if (tipoTransaccion === "deposito") {
        ingresar();
    } else if (tipoTransaccion === "retiro") {
        retirar();
    }
    mostrarHistorial();
    document.getElementById("transaccionForm").reset();
}
