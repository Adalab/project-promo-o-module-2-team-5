'use strict';

//hide box

const titleBoxDesign = document.querySelector('.design');
const coloursDesign = document.querySelector('.paletteandcolours');
const arrowDown = document.querySelector('.fa-chevron-down');
const arrowUp = document.querySelector('.fa-chevron-up');

function closeDesign() {
  coloursDesign.classList.toggle('collapsed');
  arrowDown.classList.toggle('collapsed');
  arrowUp.classList.toggle('collapsed');
}

function ClickCloseMenu() {
  closeDesign();
}

titleBoxDesign.addEventListener('click', ClickCloseMenu);

//change colours

const palette1 = document.querySelector('.card__preview--title');
const colours2 = document.querySelector('#colours2');

function changePalette() {
  palette1.classList.add('title2');
}

colours2.addEventListener('click', changePalette);