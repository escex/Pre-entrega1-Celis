//Paseos en Bote a La Isla

const precioBase = 10000; 

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

function calcularPrecio() {
    //extrayendo inputs del html y declarandolos en la funcion (no supe hacerlo en una linea de codigo)
    const diaElegido = document.getElementById('dia');
    const numPersonasFinal = document.getElementById('numPersonas');
    const dia = diaElegido.value;
    const numPersonas = parseInt(numPersonasFinal.value);

    if (numPersonas <= 0) {
        alert('Seleccione un numero valido de personas.');
        return;
    }

    let precioFinal = 0;
    for (let i = 0 ; i < numPersonas; i++) {
        const multiplicador = multiplicadorDia(dia);
        precioFinal += precioBase * multiplicador;
    }
    alert(`El precio final para el dia ${dia} con ${numPersonas} es de : $${precioFinal}`);
}