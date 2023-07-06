// used in files ../pages/index.js
// eslint-disable-next-line no-unused-vars

interface Photographer {
  id: number
  name: string
  city: string
  country: string
  tagline: string
  price: number
  portrait: string
}

interface PhotographerFactory extends Photographer {
  getUserCardDome: () => HTMLElement
  getPhotographeHeaderDOM: () => HTMLElement
}

function photographerFactory(data: Photographer) {
  const { name, id, city, country, tagline, price, portrait } = data
  const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`

  function getUserCardDOM() {
    const article: HTMLElement = document.createElement('article')
    article.innerHTML = `<a title="Visiter la page de profile de ${name} ?" href="./photographer.html?id=${id}" tabindex="0"><div class="img-container"><img src="${picture}" alt="photo de profile du photographe"></div><h2>${name}</h2></a><h3>${city}, ${country}</h3><p>${tagline}</p><span>${price}€/jour</span></article>`
    return article
  }

  function getPhotograpHeaderDOM() {
    const photograpHeader: HTMLCollection = document.getElementsByClassName('photograph-header')
    photograpHeader[0].innerHTML = `<div class="description-container"><h2>${name}</h2><h3>${city}, ${country}</h3><p>${tagline}</p></div><button class="contact_button" aria-haspopup="dialog" tabindex="0">Contactez-moi</button>
        <div class="img-container"><img src="${picture}" alt="photo de profile de : ${name}"></div>`
    const invoice: HTMLElement = document.querySelector('.invoice')!
    invoice.textContent = `${price}€ / jour`
    return photograpHeader
  }
  return {
    name,
    id,
    city,
    country,
    tagline,
    price,
    picture,
    getUserCardDOM,
    getPhotograpHeaderDOM
  }
}
