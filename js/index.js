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

function init() {
  navbarMenuBtn.addEventListener('click', showNavUl);
  navbarMenuBtnClose.forEach((element) => {
    element.addEventListener('click', showNavUl);
  });
}

window.addEventListener('load', init);