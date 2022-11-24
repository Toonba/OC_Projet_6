async function getPhotographers() {
    const response = await fetch("data/photographers.json")
    return await response.json()
    //comprends pas trop ce qu'est censé faire, j'aurais tendance à vouloir mettre un return photographers tous simplement;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const {photographers} = await getPhotographers();
    displayData(photographers);
}

init();
