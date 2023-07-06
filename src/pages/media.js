"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getPhotographersMedia() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('data/photographers.json');
        return response.json();
    });
}
const mediaById = [];
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
function displayGallery(array, filter) {
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
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const { media } = yield getPhotographersMedia();
        getMediaById(media);
        setOrginalLikes(mediaById);
        displayGallery(mediaById, 'Popularité');
        sumLikes(mediaById);
    });
}
init();
