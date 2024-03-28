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
    //Timeout para recordar descuentos
    setTimeout(() => {
        Swal.fire({
            text:'Recuerda: Todos los martes y miercoles hay 20% de descuento! '
        });
    }, 2000)
}

//Funcion con promesa para checkear disponibilidad
function checkAvailability(selectedDay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const availableDays = ['Lunes','Martes', 'Miercoles','Viernes','Domingo'];
            if (availableDays.includes(selectedDay)) {
                resolve('¡El día está disponible para reservas!');
            } else {
                reject('Lo siento, el día seleccionado no está disponible para reservas.');
            }
        }, 1000); 
    });
}
//Usando boton
function verDisponibilidad() {
    const selectedDay = document.getElementById('dia').value;
    checkAvailability(selectedDay)
        .then((message) => {
            Swal.fire({
                title: 'Dia Disponible',
                text: message,
                icon: 'success'
            });
            document.getElementById('hacerReservaBtn').removeAttribute('hidden');
        })
        .catch((error) => {
            Swal.fire({
                title: 'Dia No Disponible',
                text: error,
                icon: 'error'
            });
            document.getElementById('hacerReservaBtn').setAttribute('hidden', 'true');
        });
}

// Funciones para Storage
function almacenarReserva(reserva) {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    reservasGuardadas.push(reserva);
    localStorage.setItem('reservas', JSON.stringify(reservasGuardadas));
}

function obtenerReservas() {
    const reservasGuardadas = JSON.parse(localStorage.getItem('reservas')) || [];
    return reservasGuardadas;
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

    almacenarReserva(reservationInfo);

    console.log('Reserva almacenada:', reservationInfo);
    Swal.fire({
        title:'Reserva Confirmada',
        text:'Reserva realizada con éxito. La información se ha guardado en la reserva.'
    });
    console.log(reservas);
}

const todasLasReservas = obtenerReservas();
console.log('Todas las reservas:', todasLasReservas);


//event listener para hacer el fondo de de la pagina dinamico de acuerdo al movimiento del mouse
document.addEventListener('DOMContentLoaded', function () {
    const background = document.querySelector('.background');

    document.addEventListener('mousemove', function (e) {
        const xPos = -(e.clientX / window.innerWidth * 10 - 5);
        const yPos = -(e.clientY / window.innerHeight * 10 - 5);
        background.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});


//usando fetch para obtener clima
const API_KEY = 'db736d81afbcb41c09fdbb5550725a80';
const CITY = 'Ostrov%20Paskhi';
const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

const weatherIcon = document.querySelector('.icon img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');

fetch(WEATHER_API)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    weatherIcon.setAttribute('src', iconURL);
    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;
  })
  .catch(error => console.log(error));

  function reservaRender() {
    const containerReserva = document.getElementById('container-reservas');
    containerReserva.innerHTML = '';

    const reservations = obtenerReservas();

    if (reservations.length === 0) {
        containerReserva.innerHTML = '<p>No hay reservas realizadas.</p>';
    } else {
        const ul = document.createElement('ul');
        reservations.forEach(reserva => {
            const li = document.createElement('li');
            li.textContent = `Nombre: ${reserva.nombre}, Dia: ${reserva.dia}, Personas: ${reserva.numPersonas}, Precio Final: ${reserva.precioFinal}`;
            ul.appendChild(li);
        });
        containerReserva.appendChild(ul);
    }
}

document.addEventListener('DOMContentLoaded', reservaRender);

