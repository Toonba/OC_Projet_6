async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    return await response.json();
}

async function displayData(photographers) {
    let urlId = new URLSearchParams(window.location.search).get("id");
    for (let i = 0; i < photographers.length; i++) {
        if (urlId == photographers[i].id) {
            const photographerModel = photographerFactory(photographers[i]);
            photographerModel.getPhotograpHeaderDOM();
        }
    }
}

async function init() {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographers();
    displayData(photographers);
    modalEvent();
}

init();
