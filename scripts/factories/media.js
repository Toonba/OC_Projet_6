/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
function galleryFactory(data) {
  const { id, title, photographerId, image, likes, originalLikes, date, price, video } = data
  const picture = `assets/photographers/${photographerId}/${image}`
  const mp4 = `assets/photographers/${photographerId}/${video}`
  let numberOfLike = 0
  let heartType = ''

  // condition to keep like of user even when he sort medias
  if (likes === originalLikes) {
    numberOfLike = originalLikes
    heartType = 'fa-regular'
  } else {
    numberOfLike = likes
    heartType = 'fa-solid'
  }

  function getPhotographeGaleryDOM() {
    const figure = document.createElement('figure')
    figure.className = 'media-container'
    if (image !== undefined) {
      figure.innerHTML = `<img class="lightbox-media" src="${picture}" role="button" alt="${title}" tabindex="0" ><figcaption class="mediaDescription-container"><p>${title}</p><div class="likes-container"><span class="likes">${numberOfLike}</span><span class="${heartType} fa-heart like-button" tabindex="0" role="button" aria-label="Bouton j'aime"></span></div></figcaption>`
    }
    if (video !== undefined) {
      figure.innerHTML = `<video class="lightbox-media" controle="" src="${mp4}" role="button" alt="${title}" tabindex="0"></video><figcaption class="mediaDescription-container"><p>${title}</p><div class="likes-container"><span class="likes">${numberOfLike}</span><span class="${heartType} fa-heart like-button" tabindex="0" role="button" aria-label="Bouton j'aime"></span></div></figcaption>`
    }
    return figure
  }
  return {
    id,
    photographerId,
    title,
    image,
    likes,
    date,
    price,
    video,
    getPhotographeGaleryDOM
  }
}
