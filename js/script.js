document.addEventListener("DOMContentLoaded", function () {

    loadComponent("navbar", "../html/components/navbar.html");
    loadComponent("footer", "../html/components/footer.html");
    console.log("Сайт завантажено!");
    const header = document.querySelector("header");
    showSlide(slideIndex);
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
function openModal(imgElement) {
    let modal = document.getElementById("modal");
    let modalImg = document.getElementById("modal-img");
    let captionText = document.getElementById("caption");

    modal.style.display = "block";
    modalImg.src = imgElement.src;
    captionText.innerHTML = imgElement.alt;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

let slideIndex = 0;
let slides = document.querySelectorAll(".slide");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}
function playTrack(trackSrc, trackName) {
    let player = document.getElementById("audio-player");
    let title = document.getElementById("track-title");

    player.src = `../audio/${trackSrc}`;
    player.play();

    title.innerText = "🎧 " + trackName;
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
}

function closePlayer() {
    let modal = document.getElementById("music-modal");
    modal.classList.remove("show");
    modal.style.display = "none";
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
