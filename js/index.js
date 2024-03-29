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
const modalCloser = document.querySelectorAll('#modal .close-modal');
const worksSection = document.querySelector('#works');

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
  modalCloser.forEach((element, index) => {
    element.addEventListener('click', () => {
      showModal(index);
    });
  });
}

function initWorks() {
  works.forEach((work, index) => {
    const article = document.createElement('article');
    article.classList.add('card');

    const cardImg = document.createElement('div');
    cardImg.classList.add('card-img');

    const image = document.createElement('img');
    image.src = work.featured
    image.alt = work.title

    console.log(work.featured)

    cardImg.appendChild(image)

    article.appendChild(cardImg)

    const cardBody = document.createElement('card-body');
    cardBody.classList.add('card-body');

    const title = document.createElement('h3');
    title.appendChild(document.createTextNode(work.title));
    cardBody.appendChild(title)

    const ul = document.createElement('ul');
    work.technologies.forEach((tech) => {
      const li = document.createElement('li');
      li.appendChild(document.createTextNode(tech));
      ul.appendChild(li);
    });
    cardBody.appendChild(ul)

    const button = document.createElement('button');
    button.appendChild(document.createTextNode('See Project'));
    button.addEventListener('click', () => {
      showModal(index);
    });
    cardBody.appendChild(button)


    article.appendChild(cardImg)
    article.appendChild(cardBody)
    worksSection.appendChild(article)
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
const messageTextarea = document.querySelector('#contact-form form #contact-form-message-textarea');

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

function getStoreFormData() {
  return JSON.parse(localStorage.getItem('contact-form-data'));
}

function updateStoreFormData(formObj) {
  const toStoreObj = Object.assign(getStoreFormData(), formObj);
  localStorage.setItem(
    'contact-form-data',
    JSON.stringify(toStoreObj),
  );
}

function initFormStorage() {
  if (!storageAvailable('localStorage')) return;
  localStorage.getItem('contact-form-data');

  nameInput.value = getStoreFormData()?.fullName ?? '';
  nameInput.addEventListener('input', () => {
    updateStoreFormData({
      fullName: nameInput.value,
    });
  });

  emailInput.value = getStoreFormData()?.eMail ?? '';
  emailInput.addEventListener('input', () => {
    updateStoreFormData({
      eMail: emailInput.value,
    });
  });

  messageTextarea.value = getStoreFormData()?.message ?? '';
  messageTextarea.addEventListener('input', () => {
    updateStoreFormData({
      message: nameInput.value,
    });
  });
}

// SpyScroll

const navanchors = document.querySelectorAll('header nav.navbar ul > li > a');

function initSpyScroll() {
  const spyedContent = [];
  navanchors.forEach((anchor) => {
    const contentId = anchor.getAttribute('href');
    if (contentId) spyedContent.push(document.querySelector(contentId));
  });

  window.addEventListener('scroll', () => {
    spyedContent.forEach((spyed) => {
      const top = window.scrollY;
      const { id, offsetHeight } = spyed;
      const offsetTop = spyed.offsetTop - 150;
      if (top >= offsetTop && top < (offsetTop + offsetHeight)) {
        navanchors.forEach((anchor) => {
          anchor.classList.remove('active');
          if (anchor.getAttribute('href') === `#${id}`) anchor.classList.add('active');
        });
      }
    });
  });
}

// init funtion
function init() {
  initModal();
  initWorks();
  initShowNav();
  initFromValidation();
  initFormStorage();
  initSpyScroll();
}

window.addEventListener('load', init);