var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { modalEvent } from '../utils/contactForm.js';
import { sortGalery } from '../utils/sort.js';
import { photographerFactory } from '../factories/photographer.js';
import { galleryFactory } from '../factories/media.js';
import { sumLikes, updateLikes, setOrginalLikes } from '../utils/likes.js';
import { Lightbox } from '../utils/lightBox.js';
function getPhotographers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('data/photographers.json');
        console.log(response.json);
        return response.json();
    });
}
function displayPersonalData(photographers) {
    const photographersSection = document.querySelector('.photographer_section');
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}
export let mediaById = [];
function getMediaById(array) {
    const urlId = new URLSearchParams(window.location.search).get('id');
    for (let i = 0; i < array.length; i += 1) {
        if (urlId) {
            if (parseInt(urlId, 10) === array[i].photographerId) {
                mediaById.push(array[i]);
            }
        }
    }
    return mediaById;
}
export function displayGallery(array, filter) {
    sortGalery(array, filter);
    const sectionGalery = document.querySelector('.galery');
    sectionGalery.innerHTML = '';
    array.forEach((element) => {
        const photographerMedia = galleryFactory(element);
        const mediaCardDOM = photographerMedia.getPhotographeGaleryDOM();
        sectionGalery.appendChild(mediaCardDOM);
    });
    Lightbox.init();
    updateLikes(array);
}
function displayData(photographers) {
    const urlId = new URLSearchParams(window.location.search).get('id');
    for (let i = 0; i < photographers.length; i += 1) {
        if (urlId) {
            if (parseInt(urlId, 10) === photographers[i].id) {
                const photographerModel = photographerFactory(photographers[i]);
                photographerModel.getPhotograpHeaderDOM();
            }
        }
    }
}
function photographerInit() {
    return __awaiter(this, void 0, void 0, function* () {
        const { photographers } = yield getPhotographers();
        displayData(photographers);
        modalEvent();
    });
}
function mediainit() {
    return __awaiter(this, void 0, void 0, function* () {
        const { media } = yield getPhotographers();
        getMediaById(media);
        setOrginalLikes(mediaById);
        displayGallery(mediaById, 'Popularité');
        sumLikes(mediaById);
    });
}
function initialInit() {
    return __awaiter(this, void 0, void 0, function* () {
        // Récupère les datas des photographes
        const { photographers } = yield getPhotographers();
        displayPersonalData(photographers);
    });
}
initialInit();
photographerInit();
mediainit();
