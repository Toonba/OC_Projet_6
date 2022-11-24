//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    const response = await fetch("data/photographers.json");
    return await response.json();

    // et bien retourner le tableau photographers seulement une fois
    return {
        //comprends pas trop ce qu'est censé faire, j'aurais tendance à vouloir mettre un return photographers tous simplement
        photographers: [...photographers],
    };
}

async function displayData(photographers) {
    const photograpHeader = document.getElementsByClassName("photograph-header");
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
}

init();
