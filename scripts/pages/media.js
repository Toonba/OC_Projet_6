async function getPhotographersMedia() {
    const response = await fetch("data/photographers.json");
    return await response.json();
}

let media = [];
async function displayGalery(media, filter) {
    let urlId = new URLSearchParams(window.location.search).get("id");
    let mediaById = [];
    for (let i = 0; i < media.length; i++) {
        if (urlId == media[i].photographerId) {
            mediaById.push(media[i]);
        }
    }
    media = mediaById;
    getMediaSorted(media, filter);
    return media;
}

async function init(filter) {
    // Récupère les datas des photographes
    const {media} = await getPhotographersMedia();
    displayGalery(media, filter);
}

init("popularity");
console.log(media);
