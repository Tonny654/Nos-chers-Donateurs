let openBtn = document.getElementById("nav-open");
let closeBtn = document.getElementById("nav-close");
let navWrapper = document.getElementById("nav-wrapper");
let navlatteral = document.getElementById("nav-latteral");


const openNav = () => {
    navWrapper.classList.add("active");
    navlatteral.style.left = "0";
};

const closeNav = () => {
    navWrapper.classList.remove("active");
    navlatteral.style.left = "-100%";
};


openBtn.addEventListener("click" , openNav);
closeBtn.addEventListener("click" , closeNav);