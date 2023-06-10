const burger = document.querySelector('.header--burger');
const menu = document.querySelector('.menu');
const html = document.querySelector('html');
const menuLinks = document.querySelectorAll('.menu--link');
const overlay = document.querySelector('.overlay');


burger.addEventListener('click', show);
window.addEventListener('click', click);

// Animation for burger & menu
function show() {

    if (burger.classList.contains('active')) {
        burger.classList.remove('active');
        menu.classList.toggle('show');
        html.style.overflow = '';
        overlay.style.display = 'none';
    } else {
        burger.classList.add('active');
        menu.classList.toggle('show');
        html.style.overflow = 'hidden';
        overlay.style.display = 'block';

    }
}
// Close menu on click outside
function click(event) {
    const target = event.target;
    const isMenu = target === menu || menu.contains(target);
    const isBurgerMenu = target === burger;
    const isMenuActive = menu.classList.contains('show');

    if (!isMenu && !isBurgerMenu && isMenuActive) {
        burger.classList.remove('active');
        menu.classList.remove('show');
        html.style.overflow = '';
        overlay.style.display = 'none';
    }
};

// Close menu on link click
menuLinks.forEach(link => link.addEventListener('click', show));