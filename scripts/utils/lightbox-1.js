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
lightboxMedia[0].addEventListener("click", launchLightbox());

// for (let i = 0; i < lightboxMedia.length; i++) {
//     lightboxMedia[i].addEventListener("click", launchLightbox());
// }
