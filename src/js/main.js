'use strict';

//-------------------LEGENDS---------------

const arrowDesign = document.querySelector('.js-arrowdown-design');
const arrowFill = document.querySelector('.js-arrowdown-fill');
const arrowShare = document.querySelector('.js-arrowdown-share');
const allLegends = document.querySelectorAll('.js-legend');

for (const eachLegend of allLegends) {
  eachLegend.addEventListener('click', handleClickAnyLegend);
}

function handleClickAnyLegend(e) {
  const selectedLegend = e.target.id;
  console.log('legend clicado --> ' + selectedLegend);
  const contents = document.querySelectorAll('.js_content');
  //const arrow = e.target.id.querySelector('.js_arrow');

  for (const conten of contents) {
    const idContent = conten.id;
    console.log('contenidos --> ' + idContent);
    if (idContent.includes(selectedLegend)) {
      conten.classList.toggle('collapsed');
      if (conten.classList.contains('collapsed')) {
        arrowDesign.classList.remove('fa-chevron-up');
        arrowDesign.classList.add('fa-chevron-down');
        arrowFill.classList.remove('fa-chevron-up');
        arrowFill.classList.add('fa-chevron-down');
        arrowShare.classList.remove('fa-chevron-up');
        arrowShare.classList.add('fa-chevron-down');
      } else {
        arrowDesign.classList.add('fa-chevron-up');
        arrowDesign.classList.remove('fa-chevron-down');
        arrowFill.classList.add('fa-chevron-up');
        arrowFill.classList.remove('fa-chevron-down');
        arrowShare.classList.add('fa-chevron-up');
        arrowShare.classList.remove('fa-chevron-down');
      }

      // if (selectedLegend.includes('form')) {
      //   arrowFill.classList.add('fa-chevron-up');
      //   arrowFill.classList.remove('fa-chevron-down');
      //   arrowFill.classList.toggle('fa-chevron-down');

      // arrowFill.classList.toggle('fa-chevron-down');
      // } else if (selectedLegend.includes('share')) {
      //   arrowDesign.classList.add('fa-chevron-up');
      //   arrowDesign.classList.remove('fa-chevron-down');
      //   arrowFill.classList.remove('fa-chevron-up');
      //   arrowFill.classList.add('fa-chevron-down');
      //   arrowShare.classList.remove('fa-chevron-up');
      //   arrowShare.classList.add('fa-chevron-down');
    } else {
      conten.classList.add('collapsed');
    }
  }
}

//--------------------RELLENAR EL NOMBRE Y MOSTRAR EN TARJETA-------------

const previewName = document.querySelector('.js-preview_name');
const previewJob = document.querySelector('.js-preview_job');
//
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
  palette: '01',
};

// LocalStorage

function setDataInLocalStorage() {
  localStorage.setItem('dataSaved', JSON.stringify(data));
}

function getDataFromLocalStorage() {
  const localStorageData = localStorage.getItem('dataSaved');
  if (localStorageData !== null) {
    const object = JSON.parse(localStorageData);
    data = object;
    renderInputs();
    handleFill();
  }
}

//Función para pintar el preview con lo que escribes en el input
function renderInputs() {
  //Mantaner en preview los campos rellenos si no hay nada escrito
  data.name === ''
    ? (previewName.innerHTML = 'Nombre Apellido')
    : (previewName.innerHTML = data.name);

  data.job === ''
    ? (previewJob.innerHTML = 'Front-end developer')
    : (previewJob.innerHTML = data.job);

  setDataInLocalStorage();
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
  setDataInLocalStorage(); // Guardar en LocalStorage
}

//evento de escuchar el formulario entero(Todos los inputs)
form.addEventListener('keyup', handleFill);

//----------------------------------------------------------------------//
//----------------PARA SELECCIONAR LA PALETA----------------------------//

const previewHeaderStrip = document.querySelector('.js-card-preview-header');
const socialMediaIcon = document.querySelectorAll('.socialmedia_icon');
const socialMediaCircle = document.querySelectorAll('.card__socialmedia--item');
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
    data.palette = '01';
  } else if (selectedPalette === 'colours2') {
    colorDark = '#420101';
    colorMedium = '#bd1010';
    colorLight = '#e95626';
    data.palette = '02';
  } else if (selectedPalette === 'colours3') {
    colorDark = '#3e5b65';
    colorMedium = '#eab052';
    colorLight = '#a0c0cf';
    data.palette = '03';
  }

  for (const eachIcon of socialMediaIcon) {
    eachIcon.style.color = colorDark;
  }

  for (const eachCircle of socialMediaCircle) {
    eachCircle.style.borderColor = colorLight;
  }

  previewHeaderStrip.style.borderColor = colorMedium;
  previewName.style.color = colorDark;

  setDataInLocalStorage();
}

paletteButtons.forEach((radio) => {
  radio.addEventListener('change', handler);
});

//----------------------------------------------------------------------//
//---PARA SELECCIONAR CREAR TARJETA (CAMBIO COLOR y MOSTRAR EL RESTO---//

const shareButton = document.querySelector('.js-buttonCard');
const createdCard = document.querySelector('.js-createdCard');
const createdCardLink = document.querySelector('.js_createdCard__link');
const catchError = document.querySelector('.js_catchError');
const twitterBtn = document.querySelector('.js-buttonLink');

function handleClickButton(e) {
  e.preventDefault();
  fetch('https://awesome-profile-cards.herokuapp.com/card', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())

    .then((data) => {
      if (data.success) {
        createdCardLink.innerHTML = data.cardURL;
        createdCardLink.href = `${data.cardURL}`;
        const textCardTwitter = 'Mira la tarjeta que me he creado!!!';
        twitterBtn.href = `https://twitter.com/intent/tweet?text=${textCardTwitter}&url=${data.cardURL}`;
        shareButton.classList.add('buttonCard--off');
        shareButton.classList.remove('buttonCard--on');
        createdCard.classList.remove('collapsed');
        catchError.innerHTML = '';
      } else {
        catchError.innerHTML = 'Error: debes rellenar todos los campos';
      }
    });
}

shareButton.addEventListener('click', handleClickButton);

//--------------------- interactividad imagen -----------------------//

const fr = new FileReader();
const fileField = document.querySelector('.js__profile-upload-btn');
const profileImage = document.querySelector('.js__profile-image');
const profilePreview = document.querySelector('.js__profile-preview');

/**
 * Recoge el archivo añadido al campo de tipo "file"
 * y lo carga en nuestro objeto FileReader para que
 * lo convierta a algo con lo que podamos trabajar.
 * Añade un listener al FR para que ejecute una función
 * al tener los datos listos
 * @param {evento} e
 */
function getImage(e) {
  const myFile = e.currentTarget.files[0];
  fr.addEventListener('load', writeImage);
  fr.readAsDataURL(myFile);
}

/**
 * Una vez tenemos los datos listos en el FR podemos
 * trabajar con ellos ;)
 */
function writeImage() {
  /* En la propiedad `result` de nuestro FR se almacena
   * el resultado. Ese resultado de procesar el fichero que hemos cargado
   * podemos pasarlo como background a la imagen de perfil y a la vista previa
   * de nuestro componente.
   */
  profileImage.style.backgroundImage = `url(${fr.result})`;
  profilePreview.style.backgroundImage = `url(${fr.result})`;
  data.photo = fr.result;
}

/**
 * Genera un click automático en nuesto campo de tipo "file"
 * que está oculto
 */

/**
 * Añadimos los listeners necesarios:
 * - al botón visible para generar el click automático
 * - al campo oculto para cuando cambie su value
 */
fileField.addEventListener('change', getImage);

//------------------------RESETEO-----------------------------//

const buttonReset = document.querySelector('.js-card_reset');
function handleClickReset() {
  location.reload();
}

buttonReset.addEventListener('click', handleClickReset);

getDataFromLocalStorage();

/*
const buttonReset = document.querySelector('.js-card_reset');
const resetName = document.querySelector('.js-full_name');
const resetJob = document.querySelector('.js-job');
const resetEmail = document.querySelector('.js-email');
const resetPhone = document.querySelector('.js-phone');
const resetLinkedin = document.querySelector('.js-linkedin');
const resetGithub = document.querySelector('.js-github');

function handleClickReset() {
  // Resetear data_____________
  data = {
    name: '',
    job: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    palette: 'colours1',
  };

  // Resetear todos los preview a los placeholder______________
  previewName.innerHTML = 'Nombre Apellido';
  previewJob.innerHTML = 'Front-end developer';
  // previewEmail.href = '';
  // previewPhone.href = '';
  // previewLinkedin.href = '';
  // previewGithub.href = '';
  // previewColourpalette.value = '';
  previewHeaderStrip.style.borderColor = '#438792';
  previewName.style.color = '#114e4e';
  previewJob.style.color = '#000000';
  for (const eachIcon of socialMediaIcon) {
    eachIcon.style.color = '#114e4e';
  }
  for (const eachCircle of socialMediaCircle) {
    eachCircle.style.borderColor = '#a2deaf';
  }
  profilePreview.style.backgroundImage = '';

  // Resetear el radio button (diseña)_____________________
  const selectedPalette = document.querySelector(
    '.js-sectionDesign input[name=colourpalette]:checked'
  );
  if (selectedPalette) {
    selectedPalette.checked = false;
  }

  // Resetear todos los inputs (rellena)__________________
  resetName.value = '';
  resetJob.value = '';
  resetEmail.value = '';
  resetPhone.value = '';
  resetLinkedin.value = '';
  resetGithub.value = '';
  fileField.value = '';
  profileImage.style.backgroundImage = '';

  // Resetear el create card (share)____________________________
  shareButton.classList.remove('buttonCard--off');
  shareButton.classList.add('buttonCard--on');
  createdCard.classList.add('collapsed');
}

buttonReset.addEventListener('click', handleClickReset);

//------------------------------------------------------------//
//----DESHABILITAR LINKS ICONOS-------------------------------//

const socialMediaItems = document.querySelectorAll(
  '.card__socialmedia--item a'
);
function handlerSocialMediaItemsClick(event) {
  event.preventDefault();
}

socialMediaItems.forEach((a) => {
  a.addEventListener('click', handlerSocialMediaItemsClick);
});
*/
