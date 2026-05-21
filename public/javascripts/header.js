const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", (e) => {
    nav.classList.toggle("active");
})

