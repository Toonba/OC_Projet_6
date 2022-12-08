async function getPhotographersMedia() {
    const response = await fetch("data/photographers.json");
    return await response.json();
}
let mediaById = [];
function getMediaById(array) {
    let urlId = new URLSearchParams(window.location.search).get("id");
    for (let i = 0; i < array.length; i++) {
        if (urlId == array[i].photographerId) {
            mediaById.push(array[i]);
        }
    }
    return mediaById;
}

//Est ce que c'est vraiment nécéssaire le async ici ?
function displayGallery(array, filter) {
    sortGalery(array, filter);
    const sectionGalery = document.querySelector(".galery");
    sectionGalery.innerHTML = "";
    array.forEach((element) => {
        const photographerMedia = galleryFactory(element);
        const mediaCardDOM = photographerMedia.getPhotographeGaleryDOM();
        sectionGalery.appendChild(mediaCardDOM);
    });
    Lightbox.init();
    updateLikes(array);
}

async function init() {
    const {media} = await getPhotographersMedia();
    getMediaById(media);
    displayGallery(mediaById, "Popularité");
}

init();
