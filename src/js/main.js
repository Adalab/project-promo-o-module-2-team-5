'use strict';

console.log('>> Ready :)');

/*              Sección de elementos que usamos en el HTML             */
/*  -----------------------------------------------------------------  */
const legendDesign = document.querySelector('.js-legendDesign');
const legendFill = document.querySelector('.js-legendFill');
const legendShare = document.querySelector('.js-legendShare');

const sectionDesign = document.querySelector('.js-sectionDesign');
const sectionFill = document.querySelector('.js-sectionFill');
const sectionShare = document.querySelector('.js-sectionShare');

// const arrowDown = document.querySelector('.js-fa-chevron-down');
// const arrowUp = document.querySelector('.js-fa-chevron-up');

/*    Sección de variables globales (que usamos en todo el fichero)    */
/*  -----------------------------------------------------------------  */

/*                        Sección de funciones                         */
/*  -----------------------------------------------------------------  */

//DISEÑO (ARROW)

const arrowDownDesign = document.querySelector('.js-arrowdown-design');
const arrowUpDesign = document.querySelector('.js-arrowup-design');
const arrowDownFill = document.querySelector('.js-arrowdown-fill');
const arrowUpFill = document.querySelector('.js-arrowup-fill');
const arrowDownShare = document.querySelector('.js-arrowdown-share');
const arrowUpShare = document.querySelector('.js-arrowup-share');

function toggleDropDownMenu() {
  sectionDesign.classList.toggle('collapsed');
  arrowDownDesign.classList.toggle('collapsed');
  arrowUpDesign.classList.toggle('collapsed');
}

function handleClickDropdown() {
  // e.preventDefault();
  toggleDropDownMenu();
}

legendDesign.addEventListener('click', handleClickDropdown);

//FORMULARIO
function toggleDropDownFill() {
  sectionFill.classList.toggle('collapsed');
  arrowDownFill.classList.toggle('collapsed');
  arrowUpFill.classList.toggle('collapsed');
}

function handleClickDropdownFill() {
  // e.preventDefault();
  toggleDropDownFill();
}

legendFill.addEventListener('click', handleClickDropdownFill);

//SHARE
function toggleDropDownShare() {
  sectionShare.classList.toggle('collapsed');
  arrowDownShare.classList.toggle('collapsed');
  arrowUpShare.classList.toggle('collapsed');
}

function handleClickDropdownShare() {
  // e.preventDefault();
  toggleDropDownShare();
}

legendShare.addEventListener('click', handleClickDropdownShare);

/* Sección de eventos (addEventListener y funciones handler asociadas) */
/*  -----------------------------------------------------------------  */

//--------------------RELLENAR EL NOMBRE Y MOSTRAR EN TARJETA-------------

const previewName = document.querySelector('.js-preview_name');
const previewJob = document.querySelector('.js-preview_job');
const previewEmail = document.querySelector('.js-preview_email');
const previewPhone = document.querySelector('.js-preview_phone');
const previewLinkedin = document.querySelector('.js-preview_linkedin');
const previewGithub = document.querySelector('.js-preview_github');

//selecciono formulario entero
const form = document.querySelector('.js-form');

//variable global (objeto)
let data = {
  name: '',
  job: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
};

//Función para pintar el preview con lo que escribes en el input
function renderInputs() {
  previewName.innerHTML = data.name;
  previewJob.innerHTML = data.job;
  previewEmail.href = data.email;
  previewPhone.href = data.phone;
  previewLinkedin.href = data.linkedin;
  previewGithub.href = data.github;
}

//función manejadora guarda valores del input y ejecuta función que pinta
function handleFill(e) {
  //----selecciono el id del input al q le afecta el evento en ese momento
  const inputId = e.target.id;
  //------selecciono el valor del input al q le afecta el evento en ese momento
  const inputValue = e.target.value;
  //Accedo a la propiedad del objeto y le meto su valor
  data[inputId] = inputValue;
  //Ejecuto la FUNCIÓN que me pintará en el preview
  renderInputs(data);
}

//evento de escuchar el formulario entero(Todos los inputs)
form.addEventListener('keyup', handleFill);

//----------------------------------------------------------------------//
//----------------PARA SELECCIONAR LA PALETA----------------------------//

const previewHeaderStrip = document.querySelector('.js-card-preview-header');
//aqui tendrian que ir mas const pero como reutilizo las que ya están declaradas arriba solo pongo esta.

//seleciono el atributo comun para poder coger todos los radiobuttons
const paletteButtons = document.querySelectorAll(
  '.js-sectionDesign input[name=colourpalette]'
);

// funcion que coge el valor del radiobutton seleccionado. Creo ademas una variable para cada color, y en funcion de radiobutton seleccionado escoge un color u otro.
function handler() {
  const selectedPalette = document.querySelector(
    '.js-sectionDesign input[name=colourpalette]:checked'
  ).value;
  let colorDark;
  let colorMedium;
  let colorLight;

  if (selectedPalette === 'colours1') {
    colorDark = '#114e4e';
    colorMedium = '#438792';
    colorLight = '#a2deaf';
  } else if (selectedPalette === 'colours2') {
    colorDark = '#420101';
    colorMedium = '#bd1010';
    colorLight = '#e95626';
  } else if (selectedPalette === 'colours3') {
    colorDark = '#3e5b65';
    colorMedium = '#eab052';
    colorLight = '#a0c0cf';
  }

  // previewHeaderStrip.style.borderColor = colorDark;
  // previewName.style.color = colorMedium; ----PREGUNTAR PATRICIA
  previewHeaderStrip.style.borderColor = colorMedium;
  previewName.style.color = colorDark;
  previewJob.style.color = colorLight;
}

//evento de cambio de cada uno de los radiobuttons
// paletteButtons.forEach((radio) => {
//   radio.addEventListener('change', handler); ----preguntar PATRICIA
// });
paletteButtons.forEach((radio) => {
  radio.addEventListener('change', handler);
});

//----------------------------------------------------------------------//
//---PARA SELECCIONAR CREAR TARJETA (CAMBIO COLOR y MOSTRAR EL RESTO---//

const shareButton = document.querySelector('.js-buttonCard');
const createdCard = document.querySelector('.js-createdCard');

function handleClickButton() {
  shareButton.classList.add('buttonCard--off');
  shareButton.classList.remove('buttonCard--on');
  createdCard.classList.remove('collapsed');
}

shareButton.addEventListener('click', handleClickButton);
