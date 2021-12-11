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

/*    Sección de variables globales (que usamos en todo el fichero)    */
/*  -----------------------------------------------------------------  */

/*                        Sección de funciones                         */
/*  -----------------------------------------------------------------  */

//DISEÑO
function toggleDropDownMenu() {
  sectionDesign.classList.toggle('collapsed');
}

function handleClickDropdown() {
  // e.preventDefault();
  toggleDropDownMenu();
}

legendDesign.addEventListener('click', handleClickDropdown);

//FORMULARIO
function toggleDropDownFill() {
  sectionFill.classList.toggle('collapsed');
}

function handleClickDropdownFill() {
  // e.preventDefault();
  toggleDropDownFill();
}

legendFill.addEventListener('click', handleClickDropdownFill);

//SHARE
function toggleDropDownShare() {
  sectionShare.classList.toggle('collapsed');
}

function handleClickDropdownShare() {
  // e.preventDefault();
  toggleDropDownShare();
}

legendShare.addEventListener('click', handleClickDropdownShare);

/* Sección de eventos (addEventListener y funciones handler asociadas) */
/*  -----------------------------------------------------------------  */

//--------------------RELLENAR EL NOMBRE Y MOSTRAR EN TARJETA-------------

const inputName = document.querySelector('.js-full_name');
const inputJob = document.querySelector('.js-job');
const inputEmail = document.querySelector('.js-email');
const inputPhone = document.querySelector('.js-phone');
const inputLinkedin = document.querySelector('.js-linkedin');
const inputGithub = document.querySelector('.js-github');

const previewName = document.querySelector('.js-preview_name');
const previewJob = document.querySelector('.js-preview_job');
const previewEmail = document.querySelector('.js-preview_email');
const previewPhone = document.querySelector('.js-preview_phone');
const previewLinkedin = document.querySelector('.js-preview_linkedin');
const previewGithub = document.querySelector('.js-preview_github');

//INPUT NAME

let dataName = '';

function handleNameInput() {
  dataName = inputName.value;
  previewName.innerHTML = dataName;
}
inputName.addEventListener('keyup', handleNameInput);

//INPUT JOB
let dataJob = '';

function handleJobInput() {
  dataJob = inputJob.value;
  previewJob.innerHTML = dataJob;
}
inputJob.addEventListener('keyup', handleJobInput);

//INPUT EMAIL
function handleEmailInput() {
  previewEmail.href = inputEmail.value;
}
inputEmail.addEventListener('keyup', handleEmailInput);

//INPUT tel
function handleTelInput() {
  previewPhone.href = inputPhone.value;
}
inputPhone.addEventListener('keyup', handleTelInput);

//INPUT linkedin
function handleLinkedinInput() {
  previewLinkedin.href = inputLinkedin.value;
}
inputLinkedin.addEventListener('keyup', handleLinkedinInput);

//INPUT Github
function handleGithubInput() {
  previewGithub.href = inputGithub.value;
}
inputGithub.addEventListener('keyup', handleGithubInput);

//-------CÓDIGO MEJORADO aún en proceso---------

// let data = {
//   name: '',
//   job: '',
//   email: '',
//   phone: '',
//   linkedin: '',
//   github: '',
// };

//Creo función para que lo que está como value del inputName, lo guardo en una variable global q declaro arriba

// function getData(data) {
//   data.name = e.currentTarget.value;
// }

// function handleDataInput(e) {
//   getData();
//   previewName.innerHTML = data.name;
// }

// function handleDataInput(e) {
//   e.preventDefault();
//   e.currentTarget;
//   renderData(getData);
// }

// inputName.addEventListener('keyup', handleDataInput);


//----------------PARA SELECCIONAR LA PALETA----------------------------//

const previewHeaderStrip = document.querySelector ('.js-card-preview-header');



//seleciono el atributo comun para poder coger todos los radiobuttons
const paletteButtons = document.querySelectorAll ('.js-sectionDesign input[name=colourpalette]');


// funcion que coge el valor del radiobutton seleccionado
function handler(){

  const selectedPalette = document.querySelector('.js-sectionDesign input[name=colourpalette]:checked').value;
  let colorDark;
  let colorMedium;
  let colorLight;
  
  if (selectedPalette === 'colours1') {
    colorDark = '#114e4e';
    colorMedium = '#438792';
    colorLight = '#a2deaf';

  }else if (selectedPalette === 'colours2'){
    colorDark = '#420101';
    colorMedium = '#bd1010';
    colorLight = '#e95626';

  } else if (selectedPalette === 'colours3'){
    colorDark = '#3e5b65';
    colorMedium = '#eab052';
    colorLight = '#a0c0cf';
  }
 
  previewHeaderStrip.style.borderColor = colorDark;
  previewName.style.color = colorMedium;
  previewJob.style.color = colorLight;
}


//evento de cambio de cada uno de los radiobuttons
paletteButtons.forEach(radio => {
  radio.addEventListener ('change', handler)
});