/* eslint-disable space-before-function-paren */
async function getPhotographers() {
  const response = await fetch('data/photographers.json')
  return response.json()
}

async function displayData(photographers) {
  const urlId = new URLSearchParams(window.location.search).get('id')
  for (let i = 0; i < photographers.length; i += 1) {
    if (parseInt(urlId, 10) === photographers[i].id) {
      // eslint-disable-next-line
      const photographerModel = photographerFactory(photographers[i])
      photographerModel.getPhotograpHeaderDOM()
    }
  }
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
  // eslint-disable-next-line
  modalEvent()
}

init()
