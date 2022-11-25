async function getPhotographersMedia() {
    const response = await fetch("data/photographers.json");
    return await response.json();
}

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
    return mediaById;
}

async function init() {
    // Récupère les datas des photographes
    const {media} = await getPhotographersMedia();
    displayGalery(media, "popularity");
}
async function sort(filter) {
    const {media} = await getPhotographersMedia();
    displayGalery(media, filter);
}
init();

function getMediaSorted(array, filter) {
    for (i = 0; i < array.length; i++) {
        switch (filter) {
            case "popularity":
                array.sort(function compare(a, b) {
                    if (a.likes < b.likes) {
                        return 1;
                    } else if (a.likes > b.likes) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                photographerGalery = galeryFactory(array[i]);
                photographerGalery.getPhotographeGaleryDOM();
                break;
            case "date":
                array.sort(function compare(a, b) {
                    if (a.date < b.dat) {
                        return -1;
                    } else if (a.date > b.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                photographerGalery = galeryFactory(array[i]);
                photographerGalery.getPhotographeGaleryDOM();
                break;
            case "title":
                array.sort(function compare(a, b) {
                    if (a.title < b.title) {
                        return -1;
                    } else if (a.title > b.title) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                photographerGalery = galeryFactory(array[i]);
                photographerGalery.getPhotographeGaleryDOM();
                break;
        }
    }
}

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
