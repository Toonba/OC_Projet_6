async function getPhotographers() {
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch pour pb firefox
    //https://stackoverflow.com/questions/17088609/disable-firefox-same-origin-policy
    const response = await fetch("data/photographers.json", {
        method: "GET", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json();
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
