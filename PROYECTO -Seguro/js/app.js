
// Constructores

// OBJETO 1
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

//Realiza la cotización con los datos del Seguro
Seguro.prototype.cotizarSeguro = function () {
  /* Valor del seguro de acuerdo con la marca elegida
     1 = Americano 1.15
     2 = Asiatico 1.05
     3 = Europeo 1.35
  */
  
  //Creamos una base para que se pueda hacer el ejemplo
  let cantidad;
  const base = 2000;
  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
    

    default:
      
  }
  //Leer el año
  const diferencia = new Date().getFullYear() - this.year;

  //Cada año que la diferencia es mayor va a redusirse el costo en un 3%
  cantidad -= ((diferencia * 3) * cantidad) / 100;

  /* Tipo de seguro
  Si el seguro es el básico se multiplica por un 30% más.
  Si el seguro es el completo se multiplica por un 50% más.
  */
  if (this.tipo === 'basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }
  return cantidad;

  console.log(cantidad);
}




function UI() { }


//Llena las opciones de los años PROTOTYPE 1
UI.prototype.llenarOpciones = () => {  
  const max = new Date().getFullYear(),
    min = max - 20;
  
  const selectYear = document.querySelector('#year');

  for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
}

//Muestra alertas en pantalla PROTOTYPE 2
UI.prototype.muestraMensaje = (mensaje, tipo) => { 
  const div = document.createElement('div');

  if (tipo === 'error') {
    div.classList.add('error');
  } else {
    div.classList.add('correcto');
  }
  div.classList.add('mensaje', 'mt-10');
  div.textContent = mensaje;

  //Insertar en el HTML
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.insertBefore(div, document.querySelector('#resultado'));
  setTimeout(() => {
    div.remove();
  }, 1000);

}

//Protoype de precio final
UI.prototype.mostrarResultado = (total, seguro) => {
  const { marca, year, tipo } = seguro;
  let textoMarca;

  switch (marca) {
    case '1':
      textoMarca = 'Americano'
      break;
    case '2':
      textoMarca = 'Asiatico'
      break;
    case '1':
      textoMarca = 'Europeo'
      break;
    
    default:
      
  }


  //Crear el resultado en un Div
  const div = document.createElement('div');
  div.classList.add('mt-10');
  div.innerHTML = `
  <p class="header">Tu Resumen</p>
  <p class="font-bold">Marca: <span class="font-normal">  ${textoMarca} </span></p>
  <p class="font-bold">Año: <span class="font-normal">  ${year} </span></p>
  <p class="font-bold">Tipo: <span class="font-normal">  ${tipo} </span></p>
  <p class="font-bold">Total: <span class="font-normal"> $ ${total} </span></p>
  `;

  const resultadoDiv = document.querySelector('#resultado');
  

  //Mostrando el Spinner
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';
  setTimeout(() => {
    spinner.style.display = 'none';//Se borra el spinner
    resultadoDiv.appendChild(div);//Se muestra el resultado

  }, 3000);


}

// Instanciar la interfase
const ui = new UI();



document.addEventListener('DOMContentLoaded', () => {
  ui.llenarOpciones();//Llena el select con los años

})

//Validación de formulario
eventListeners();
function eventListeners() {
  const formulario = document.querySelector('#cotizar-seguro');
  formulario.addEventListener('submit', cotizarSeguro); //Escuchamos cuando el usuario 
}

function cotizarSeguro(e) { 
  e.preventDefault();

  //Leer la marca seleccionada
  const marca = document.querySelector('#marca').value;
  //Leer el año selecconado
  const year = document.querySelector('#year').value;
  //Leer el tipo de seguro
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  
  if (marca === '' || year === '' || tipo === '') {
    ui.muestraMensaje('Todos los campos son obligatorios', 'error');
    return;
  } 
  ui.muestraMensaje('Cotizando....', 'exito');

  //Ocultar las cotizaciones previas
  const resultados = document.querySelector('#resultado div');
  if (resultados != null) {
    resultados.remove();
  }

  //Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();//Cantidad a pagar

  //Utilizar el seguro que va a cotizar
  ui.mostrarResultado(total, seguro);
  
}

