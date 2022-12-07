async function getPhotographersMedia() {
    const response = await fetch("data/photographers.json");
    return await response.json();
}
let mediaById = [];
async function displayGalery(media) {
    let urlId = new URLSearchParams(window.location.search).get("id");
    for (let i = 0; i < media.length; i++) {
        if (urlId == media[i].photographerId) {
            mediaById.push(media[i]);
        }
    }
    sortGalery(mediaById, "Popularité");
    return mediaById;
}

async function init() {
    const {media} = await getPhotographersMedia();
    displayGalery(media);
    sortEvent();
    sumLikes(mediaById);
    // LightboxEventopen();
    Lightbox.init();
}

init();
