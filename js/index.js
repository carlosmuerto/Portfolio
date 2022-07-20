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

// init funtion

function init() {
  console.log(works);
  initModal();
  navbarMenuBtn.addEventListener('click', showNavUl);
  navbarMenuBtnClose.forEach((element) => {
    element.addEventListener('click', showNavUl);
  });
}

window.addEventListener('load', init);