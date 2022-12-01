//DOM elements
const lightbox = document.getElementById("lightbox");
const lightboxBody = document.getElementsByClassName("lightbox-body");
const lightboxMedia = document.getElementsByClassName("lightbox-media");
const current = document.getElementsByClassName("current");
const next = document.getElementsByClassName("next");
const previous = document.getElementsByClassName("previous");
const lightboxClose = document.getElementsByClassName("lightbox-close-button");
const mediaContainer = document.getElementsByClassName("media-container");
const likesContainer = document.getElementsByClassName("likes-container");

//code handling the lightbox media
function launchLightbox() {
    lightbox.style.display = "block";
    main.setAttribute("aria-hidden", "true");
    lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
    lightbox.style.display = "none";
    main.setAttribute("aria-hidden", "false");
    lightbox.setAttribute("aria-hidden", "true");
}

// current.setAttribute("src", lightboxMedia[0].getAttribute("src"));
function LightboxEventopen() {
    for (let i = 0; i < lightboxMedia.length; i++) {
        lightboxMedia[i].addEventListener("click", function (e) {
            launchLightbox();
            current[0].setAttribute("src", lightboxMedia[i].getAttribute("src"));
        });
        lightboxMedia[i].addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
                launchLightbox();
                current[0].setAttribute("src", lightboxMedia[i].getAttribute("src"));
            }
        });
        previous[0].addEventListener("click", function (e) {
            launchLightbox();
            if (i == 0) {
                current[0].setAttribute("src", lightboxMedia[lightboxMedia.lenght].getAttribute("src"));
            }
            current[0].setAttribute("src", lightboxMedia[i - 1].getAttribute("src"));
        });
        previous[0].addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
                launchLightbox();
                if (i == 0) {
                    current[0].setAttribute("src", lightboxMedia[lightboxMedia.lenght].getAttribute("src"));
                }
                current[0].setAttribute("src", lightboxMedia[i - 1].getAttribute("src"));
            }
        });
        next[0].addEventListener("click", function (e) {
            launchLightbox();
            if (i == lightboxMedia.length) {
                current[0].setAttribute("src", lightboxMedia[0].getAttribute("src"));
            }
            current[0].setAttribute("src", lightboxMedia[i + 1].getAttribute("src"));
        });
        next[0].addEventListener("keydown", function (e) {
            if (e.key == "Enter") {
                launchLightbox();
                if (i == lightboxMedia.length) {
                    current[0].setAttribute("src", lightboxMedia[lightboxMedia.lenght].getAttribute("src"));
                }
                current[0].setAttribute("src", lightboxMedia[i - 1].getAttribute("src"));
            }
        });
    }
}

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        e.preventDefault();
        closeLightbox();
    }
});

lightboxClose[0].addEventListener("click", function (e) {
    closeLightbox();
});

// ca marche pas en haut je sais aps pk, mais j'en ai marre alors je te laisse gérer ça, check une vidéo sur le type qui gère ca en faisant une class
