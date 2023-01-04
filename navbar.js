const toggleButton= document.getElementsByClassName('toggle-button')[0]
const navBarLinks=document.getElementsByClassName('navbar-links-li')[0]
const navBarLinks2=document.getElementsByClassName('navbar-links-li')[1]
const navBarLinks3=document.getElementsByClassName('navbar-links-li')[2]
const navBarLinks4=document.getElementsByClassName('navbar-links-li')[3]
const navBarLinks5=document.getElementsByClassName('navbar-links-li')[4]
const navBarIcons=document.getElementsByClassName('navbar-icons')[0]

toggleButton.addEventListener('click' , () => {
    navBarLinks.classList.toggle('active')
    navBarLinks2.classList.toggle('active')
    navBarLinks3.classList.toggle('active')
    navBarLinks4.classList.toggle('active')
    navBarLinks5.classList.toggle('active')
    navBarIcons.classList.toggle('active')
})