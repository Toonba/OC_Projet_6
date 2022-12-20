async function getPhotographersMedia() {
  const response = await fetch('data/photographers.json')
  return response.json()
}
const mediaById = []
function getMediaById(array) {
  const urlId = new URLSearchParams(window.location.search).get('id')
  for (let i = 0; i < array.length; i += 1) {
    if (parseInt(urlId, 10) === array[i].photographerId) {
      mediaById.push(array[i])
    }
  }
  return mediaById
}

function displayGallery(array, filter) {
  sortGalery(array, filter)
  const sectionGalery = document.querySelector('.galery')
  sectionGalery.innerHTML = ''
  array.forEach((element) => {
    const photographerMedia = galleryFactory(element)
    const mediaCardDOM = photographerMedia.getPhotographeGaleryDOM()
    sectionGalery.appendChild(mediaCardDOM)
  })
  Lightbox.init()
  updateLikes(array)
}

async function init() {
  const { media } = await getPhotographersMedia()
  getMediaById(media)
  setOrginalLikes(mediaById)
  displayGallery(mediaById, 'Popularité')
  sumLikes(mediaById)
}

init()
