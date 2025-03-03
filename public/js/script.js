
const isMobile = window.innerWidth <= 768;
document.addEventListener("DOMContentLoaded", function () {

    loadComponent("navbar", "/navbar.html");
    loadComponent("footer", "/footer.html");
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
    if (!isMobile) {
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });}
});

function loadComponent(containerId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(containerId).innerHTML = data;
        })
        .catch(error => console.error(`Помилка завантаження ${filePath}:`, error));
}
const tracks = [
    { src: "../audio/track1.mp3", title: "Трек 1 - Енергія", image: "../images/music1.jpg" },
    { src: "../audio/track2.mp3", title: "Трек 2 - Глибокі емоції", image: "../images/music2.jpg" },
    { src: "../audio/track3.mp3", title: "Трек 3 - Космічні вібрації", image: "../images/music3.jpg" }
];

let currentTrack = 0;
let isPlaying = false;

function openPlayer(index) {
    currentTrack = index;
    let modal = document.getElementById("music-modal");
    let player = document.getElementById("audio-player");
    let title = document.getElementById("track-title");
    let trackImage = document.getElementById("track-image");

    player.src = tracks[currentTrack].src;
    title.innerText = tracks[currentTrack].title;
    trackImage.src = tracks[currentTrack].image;

    modal.classList.add("show");
    modal.style.display = "flex";

    player.play();
    isPlaying = true;
    setTimeout(() => {
        modal.classList.add("show");
    }, 10);
}

function closePlayer() {
    let modal = document.getElementById("music-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}



function togglePlay() {
    let player = document.getElementById("audio-player");
    if (isPlaying) {
        player.pause();
    } else {
        player.play();
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % tracks.length;
    openPlayer(currentTrack);
}

function prevTrack() {
    currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
    openPlayer(currentTrack);
}

function updateProgressBar() {
    let player = document.getElementById("audio-player");
    let progressBar = document.getElementById("progress-bar");
    progressBar.value = (player.currentTime / player.duration) * 100;
}

function changeTrackTime() {
    let player = document.getElementById("audio-player");
    let progressBar = document.getElementById("progress-bar");
    player.currentTime = (progressBar.value / 100) * player.duration;
}

function toggleMenu() {
    const menu = document.getElementById("nav-links");
    const menuToggle = document.querySelector(".menu-toggle");

    if (menu.classList.contains("show")) {
        menu.style.opacity = "0";
        menu.style.transform = "translateY(-20px)";
        setTimeout(() => {
            menu.classList.remove("show");
        }, 400);
    } else {
        menu.classList.add("show");
        menu.style.opacity = "1";
        menu.style.transform = "translateY(0)";
    }
}

document.addEventListener("click", function (event) {
    const menu = document.getElementById("nav-links");
    const menuToggle = document.querySelector(".menu-toggle");


    if (isMobile && menu.classList.contains("show")) {
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) {
            menu.style.opacity = "0";
            menu.style.transform = "translateY(-20px)";
            setTimeout(() => {
                menu.classList.remove("show");
            }, 400);
        }
    }
});
