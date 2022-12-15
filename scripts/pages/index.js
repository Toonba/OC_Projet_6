/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
async function getPhotographers() {
  const response = await fetch('data/photographers.json', {
    method: 'GET', // or 'PUT'
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
  // comprends pas trop ce qu'est censé faire, j'aurais tendance à vouloir mettre un return photographers tous simplement;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

init()
