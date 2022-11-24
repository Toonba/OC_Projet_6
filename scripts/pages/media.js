async function getPhotographersMedia() {
    const response = await fetch("data/photographers.json");
    return await response.json();
}

async function displayGalery(media) {
    let urlId = new URLSearchParams(window.location.search).get("id");
    for (let i = 0; i < media.length; i++) {
        if (urlId == media[i].photographerId) {
            photographerGalery = galeryFactory(media[i]);
            photographerGalery.getPhotographeGaleryDOM();
        }
    }
}

async function init() {
    // Récupère les datas des photographes
    const {media} = await getPhotographersMedia();
    displayGalery(media);
}

init();
