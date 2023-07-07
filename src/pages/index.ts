import { modalEvent } from '../utils/contactForm.js'
import { sortGalery } from '../utils/sort.js'
import { photographerFactory, Photographer } from '../factories/photographer.js'
import { galleryFactory, Media } from '../factories/media.js'
import { sumLikes, updateLikes, setOrginalLikes } from '../utils/likes.js'
import { Lightbox } from '../utils/lightBox.js'

interface MainData {
  photographers: Photographer[]
  media: Media[]
}

async function getPhotographers(): Promise<MainData> {
  const response = await fetch('data/photographers.json')
  console.log(response.json)
  return response.json()
}

function displayPersonalData(photographers: Photographer[]) {
  const photographersSection: HTMLElement = document.querySelector('.photographer_section')!

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

export let mediaById: Media[] = []
function getMediaById(array: Media[]) {
  const urlId = new URLSearchParams(window.location.search).get('id')
  for (let i = 0; i < array.length; i += 1) {
    if (urlId) {
      if (parseInt(urlId, 10) === array[i].photographerId) {
        mediaById.push(array[i])
      }
    }
  }
  return mediaById
}

export function displayGallery(array: Media[], filter: string) {
  sortGalery(array, filter)
  const sectionGalery = document.querySelector('.galery')!
  sectionGalery.innerHTML = ''
  array.forEach((element) => {
    const photographerMedia = galleryFactory(element)
    const mediaCardDOM = photographerMedia.getPhotographeGaleryDOM()
    sectionGalery.appendChild(mediaCardDOM)
  })
  Lightbox.init()
  updateLikes(array)
}

function displayData(photographers: Photographer[]) {
  const urlId = new URLSearchParams(window.location.search).get('id')
  for (let i = 0; i < photographers.length; i += 1) {
    if (urlId) {
      if (parseInt(urlId, 10) === photographers[i].id) {
        const photographerModel = photographerFactory(photographers[i])
        photographerModel.getPhotograpHeaderDOM()
      }
    }
  }
}

async function photographerInit() {
  const { photographers } = await getPhotographers()
  displayData(photographers)
  modalEvent()
}

async function mediainit() {
  const { media } = await getPhotographers()
  getMediaById(media)
  setOrginalLikes(mediaById)
  displayGallery(mediaById, 'Popularité')
  sumLikes(mediaById)
}

async function initialInit() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayPersonalData(photographers)
}

initialInit()
photographerInit()
mediainit()
