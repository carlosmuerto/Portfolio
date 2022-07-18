// Mobile menu

const navbarUl = document.querySelector('nav.navbar > ul');
const navbarMenuBtn = document.querySelector('nav.navbar > a#menu-btn');
const navbarMenuBtnClose = document.querySelector(
  'nav.navbar li#menu-btn-close',
);

function showNavUl() {
  if (navbarUl.classList.contains('show')) {
    navbarUl.classList.remove('show');
  } else {
    navbarUl.classList.add('show');
  }
}

// eslint-disable-next-line no-unused-vars
function init() {
  navbarMenuBtn.addEventListener('click', showNavUl);
  navbarMenuBtnClose.addEventListener('click', showNavUl);
}
