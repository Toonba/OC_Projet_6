async function getPhotographers() {
  const response = await fetch('data/photographers.json')
  return response.json()
}

function displayData(photographers) {
  const urlId = new URLSearchParams(window.location.search).get('id')
  for (let i = 0; i < photographers.length; i += 1) {
    if (parseInt(urlId, 10) === photographers[i].id) {
      const photographerModel = photographerFactory(photographers[i])
      photographerModel.getPhotograpHeaderDOM()
    }
  }
}

async function init() {
  const { photographers } = await getPhotographers()
  displayData(photographers)
  modalEvent()
}

init()
