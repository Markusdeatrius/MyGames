let navbar = document.querySelector('.header .flex .navbar')
let menuBtn = document.querySelector('#menu-btn')

menuBtn.onclick = () => {
    navbar.classList.toggle('active')
    menuBtn.classList.toggle('fa-times')
}

window.onscroll = () => {
    navbar.classList.remove('active')
    menuBtn.classList.remove('fa-times')
}