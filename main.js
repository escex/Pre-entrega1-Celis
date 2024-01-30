//Paseos en Bote a La Isla

const precioBase = 10000; 
const reservas = [];

//funcion para subir precios en findesemanas y descuento los martes y miercoles

function multiplicadorDia(dia) {
    switch (dia) {
        case 'Sabado':
        case 'Domingo':
            return 1.5;
        case 'Martes':
        case 'Miercoles':
            return 0.8;
        default:
            return 1;
    }   
}

//funcion de calcular precio
function calcularPrecio() {
//extrayendo inputs del html y declarandolos en la funcion (no supe hacerlo en una linea de codigo)
    const diaElegido = document.getElementById('dia');
    const numPersonasFinal = document.getElementById('numPersonas');
    const dia = diaElegido.value;
    const numPersonas = parseInt(numPersonasFinal.value);
    const parrafoResultado = document.getElementById('resultado');

//asegurando que se ingrese un numero valido de personas
    if (numPersonas <= 0) {
        alert('Seleccione un numero valido de personas.');
        return;
    }
//utilizando un loop para calcular el precio por persona individualmente y sumarlo
    let precioFinal = 0;
    for (let i = 0 ; i < numPersonas; i++) {
        const multiplicador = multiplicadorDia(dia);
        precioFinal += precioBase * multiplicador;
    }
    parrafoResultado.textContent = `El precio final para el dia ${dia} con ${numPersonas} es de : $${precioFinal}`;
}
function Reserva(info) {
    this.nombre = info.nombre;
    this.telefono = info.telefono;
    this.email = info.email;
    this.dia = info.dia;
    this.numPersonas = info.numPersonas;
    this.precioFinal = info.precioFinal;
}

function hacerReserva() {
    const diaElegido = document.getElementById('dia');
    const numPersonasFinal = document.getElementById('numPersonas');
    const nombre = document.querySelector('input[placeholder="Nombre"]').value;
    const telefono = document.querySelector('input[placeholder="Numero Telefonico"]').value;
    const email = document.querySelector('input[placeholder="Correo Electronico"]').value;
    const dia = diaElegido.value;
    const numPersonas = parseInt(numPersonasFinal.value);

    if (numPersonas <= 0) {
        alert('Seleccione un número válido de personas.');
        return;
    }


    let precioFinal = 0;
    for (let i = 0; i < numPersonas; i++) {
        const multiplicador = multiplicadorDia(dia);
        precioFinal += precioBase * multiplicador;
    }

    const reservationInfo = new Reserva({
        nombre: nombre,
        telefono: telefono,
        email: email,
        dia: dia,
        numPersonas: numPersonas,
        precioFinal: precioFinal
    });

    reservas.push(reservationInfo);

    console.log(reservationInfo);
    alert('Reserva realizada con éxito. Información guardada en el objeto Reservation.');
    console.log(reservas);
}
