'use strict';

/////--------------- V A R I A B L E S ---------------//////

//variable global (objeto)
let data = {
  name: '',
  job: '',
  email: '',
  phone: '',
  linkedin: '',
  github: '',
  palette: '01',
  photo: '',
};

//legend
const allLegends = document.querySelectorAll('.js-legend');
const allArrows = document.querySelectorAll('.js_arrows');

//previw de la tarjeta
const previewName = document.querySelector('.js-preview_name');
const previewJob = document.querySelector('.js-preview_job');

//seleccionar formulario
const form = document.querySelector('.js-form');

//seleccionar paleta
const previewHeaderStrip = document.querySelector('.js-card-preview-header');
const socialMediaIcon = document.querySelectorAll('.socialmedia_icon');
const socialMediaCircle = document.querySelectorAll('.card__socialmedia--item');

//crear tarjeta-cambiar color tarjeta-mostrar el resto
const shareButton = document.querySelector('.js-buttonCard');
const createdCard = document.querySelector('.js-createdCard');
const createdCardLink = document.querySelector('.js_createdCard__link');
const catchError = document.querySelector('.js_catchError');
const twitterBtn = document.querySelector('.js-buttonLink');

//interactividad imagen
const fr = new FileReader();
const fileField = document.querySelector('.js__profile-upload-btn');
const profileImage = document.querySelector('.js__profile-image');
const profilePreview = document.querySelector('.js__profile-preview');

//reset
const buttonReset = document.querySelector('.js-card_reset');

/////--------------- F U N C I O N E S ---------------//////

// --> LEGENDS - COLAPSABLES <-- \\
for (const eachLegend of allLegends) {
  eachLegend.addEventListener('click', handleClickAnyLegend);
  eachLegend.addEventListener('click', changeArrows);
}

function handleClickAnyLegend(e) {
  const selectedLegend = e.currentTarget.id;
  const contents = document.querySelectorAll('.js_content');

  for (const content of contents) {
    const idContent = content.id;
    if (idContent === selectedLegend) {
      content.classList.toggle('collapsed');
    } else {
      content.classList.add('collapsed');
    }
  }
}

function changeArrows(event) {
  for (const eachArrow of allArrows) {
    eachArrow.classList.remove('fa-chevron-up');
    eachArrow.classList.add('fa-chevron-down');
  }
  const selectedArrow = event.currentTarget;
  selectedArrow.children[1].classList.add('fa-chevron-up');
}

// --> RELLENAR EL NOMBRE Y MOSTRAR EN TARJETA <-- \\

//Función para pintar el preview con lo que escribes en el input
function renderInputs() {
  if (data.photo !== '') {
    profileImage.style.backgroundImage = `url(${data.photo})`;
    profilePreview.style.backgroundImage = `url(${data.photo})`;
  } else {
    profileImage.style.backgroundImage = `url("https://www.fillmurray.com/240/200")`;
    profilePreview.style.backgroundImage = '';
  }
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

// --> SELECCIONAR LA PALETA<-- \\

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

// --> CREAR TARJETA - CAMBIAR COLOR - MOSTRAR EL RESTO<-- \\

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

// --> INTERACTIVIDAD IMAGEN<-- \\

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
  setDataInLocalStorage();
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

// --> LOCALSTORAGE:

function setDataInLocalStorage() {
  localStorage.setItem('dataSaved', JSON.stringify(data));
}

function getDataFromLocalStorage() {
  const localStorageData = localStorage.getItem('dataSaved');
  if (localStorageData !== null) {
    const object = JSON.parse(localStorageData);
    data = object;
    renderInputs();
  }
}

// --> RESET:

getDataFromLocalStorage();

function handleClickReset() {
  document.querySelector('.js-form').reset();
  data.name = '';
  data.job = '';
  data.email = '';
  data.phone = '';
  data.linkedin = '';
  data.github = '';
  data.photo = '';
  data.palette = '01';

  for (const eachPalette of paletteButtons) {
    if (eachPalette.value === 'colours1') {
      eachPalette.checked = true;
    } else {
      eachPalette.checked = false;
    }
  }
  renderInputs();
}

buttonReset.addEventListener('click', handleClickReset);
