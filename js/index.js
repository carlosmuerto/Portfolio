import works from './works.js';

// Mobile menu
const navbarUl = document.querySelector('nav.navbar > ul');
const navbarTitle = document.querySelector('nav.navbar > a#welcome');
const navbarMenuBtn = document.querySelector('nav.navbar > a#menu-btn');
const navbarMenuBtnClose = document.querySelectorAll(
  'nav.navbar > ul > li > a',
);

function getStyle(element, name) {
  const ComputedStyle = window.getComputedStyle
    ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
  return element.currentStyle ? element.currentStyle[name] : ComputedStyle;
}

function showNavUl() {
  if (getStyle(navbarTitle, 'display') === 'none') return;

  if (navbarUl.classList.contains('show')) {
    navbarUl.classList.remove('show');
  } else {
    navbarUl.classList.add('show');
  }
}

function initShowNav() {
  navbarMenuBtn.addEventListener('click', showNavUl);
  navbarMenuBtnClose.forEach((element) => {
    element.addEventListener('click', showNavUl);
  });
}
// popup modal

const modal = document.querySelector('#modal');
const showModalBtn = document.querySelectorAll('#works .card-body button');
const modalCloser = document.querySelectorAll('#modal .close-modal');
function modifyModal(work) {
  modal.querySelector('.card .name h3').textContent = work.title;
  modal.querySelector('.card .featured-image img').src = work.featured;
  modal.querySelector('.card .technologies ul').textContent = '';
  work.technologies.forEach((element) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(element));
    modal.querySelector('.card .technologies ul').appendChild(li);
  });
  modal.querySelector('.card .description p').textContent = work.description;
  modal.querySelector('.card .buttons a#see-live-ver').href = work.linkLive;
  modal.querySelector('.card .buttons a#see-source').href = work.linkSource;
}
function showModal(index) {
  modifyModal(works[index]);
  if (modal.classList.contains('show')) {
    modal.classList.remove('show');
  } else {
    modal.classList.add('show');
  }
}
function initModal() {
  showModalBtn.forEach((element, index) => {
    element.addEventListener('click', () => {
      showModal(index);
    });
  });
  modalCloser.forEach((element, index) => {
    element.addEventListener('click', () => {
      showModal(index);
    });
  });
}

// Form Validation
const contactForm = document.querySelector('#contact-form form');
const emailInput = document.querySelector('#contact-form form #contact-form-email-input');
const erorsList = document.querySelector('#contact-form form .errors ul');
function checkLowerCase(str) {
  return str === str.toLowerCase();
}
function checkFrom(e) {
  let someError = false;
  const EmailValidationMessage = [];
  erorsList.textContent = '';
  erorsList.classList.remove('show');
  if (!checkLowerCase(emailInput.value)) {
    EmailValidationMessage.push('eMail most be in lower case');
  }
  if (EmailValidationMessage.length > 0) {
    someError = true;
  }
  if (someError) {
    erorsList.classList.add('active');
    EmailValidationMessage.forEach((element) => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(element));
      erorsList.appendChild(li);
      e.preventDefault();
    });
  }
}

function initFromValidation() {
  contactForm.addEventListener('submit', checkFrom);
}

// Form Storage
const nameInput = document.querySelector('#contact-form form #contact-form-name-input');

/* Check for storage Availability copy form documentation */
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22
      // Firefox
      || e.code === 1014
      // test name field too, because code might not be present
      // everything except Firefox
      || e.name === 'QuotaExceededError'
      // Firefox
      || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && (storage && storage.length !== 0);
  }
}

function updateStoreFormData(fullName, eMail, message) {
  localStorage.setItem(
    'contact-form-data',
    JSON.stringify({
      fullName,
      eMail,
      message,
    }),
  );
}

function storeInputChange(e) {
  updateStoreFormData(e.target.value, null, null);
}

function getStoreFormData() {
  return JSON.parse(localStorage.getItem('contact-form-data'));
}

function initFormStorage() {
  if (!storageAvailable('localStorage')) return;
  localStorage.getItem('contact-form-data');

  nameInput.value = getStoreFormData()?.fullName ?? '';
  nameInput.addEventListener('change', storeInputChange);
}
// init funtion

function init() {
  initModal();
  initShowNav();
  initFromValidation();
  initFormStorage();
}

window.addEventListener('load', init);