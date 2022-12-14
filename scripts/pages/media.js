async function getPhotographersMedia() {
  const response = await fetch("data/photographers.json");
  return response.json();
}
const mediaById = [];
function getMediaById(array) {
  const urlId = new URLSearchParams(window.location.search).get("id");
  for (let i = 0; i < array.length; i += 1) {
    if (parseInt(urlId, 10) === array[i].photographerId) {
      mediaById.push(array[i]);
    }
  }
  return mediaById;
}

// Est ce que c'est vraiment nécéssaire le async ici ?
function displayGallery(array, filter) {
  // eslint-disable-next-line
  sortGalery(array, filter);
  const sectionGalery = document.querySelector(".galery");
  sectionGalery.innerHTML = "";
  array.forEach((element) => {
    // eslint-disable-next-line
    const photographerMedia = galleryFactory(element);
    const mediaCardDOM = photographerMedia.getPhotographeGaleryDOM();
    sectionGalery.appendChild(mediaCardDOM);
  });
  // eslint-disable-next-line
  Lightbox.init();
  // eslint-disable-next-line
  updateLikes(array);
}

async function init() {
  // prettier-ignore
  const { media } = await getPhotographersMedia();
  getMediaById(media);
  displayGallery(mediaById, "Popularité");
  // eslint-disable-next-line
  sumLikes(mediaById);
  // eslint-disable-next-line
  setOrginalLikes(mediaById);
}

init();
