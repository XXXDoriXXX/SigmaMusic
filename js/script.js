document.addEventListener("DOMContentLoaded", function () {

    loadComponent("navbar", "../html/components/navbar.html");
    loadComponent("footer", "../html/components/footer.html");
    console.log("Сайт завантажено!");
    const header = document.querySelector("header");

    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.3 });

    hiddenElements.forEach(el => observer.observe(el));
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
});
function loadComponent(containerId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(`Помилка завантаження ${filePath}:`, error));
}
