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
function toggleDropDownMenu() {
  sectionDesign.classList.toggle('collapsed');
  //arrowUp.classList.toggle('collapsed');
  // arrowDown.classList.toggle('collapsed');
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
