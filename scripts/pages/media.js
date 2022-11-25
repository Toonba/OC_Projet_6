async function getPhotographersMedia() {
    const response = await fetch("data/photographers.json");
    return await response.json();
}

async function displayGalery(media, filter) {
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
    displayGalery(media, popularity);
}

init();

//filter part 
const filterOption = document.getElementsByClassName("dropdown-option");
const filterBtn = document.getElementsByClassName("filter-button");
const dropdown = document.getElementsByClassName("dropdown");
const btnContent = document.getElementsByClassName("button-content");
const galeryArticle = document.getElementsByClassName("media-container");

filterBtn[0].addEventListener("click", function (e) {
    dropdown[0].style.display = "block";
});

for (let i = 0; i < filterOption.length; i++) {
    filterOption[i].addEventListener("click", function (e) {
        dropdown[0].style.display = "none";
        btnContent[0].textContent = filterOption[i].textContent;
    });
}

function sortByPopularity(array) {
    for (let i = 0; i< array.length; i++){
        if (array[i].likes
    }

}