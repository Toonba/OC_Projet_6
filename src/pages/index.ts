interface MainData {
  photographers:Photographer[]
  media:Media[]
}

async function getPhotographers():Promise<MainData> {
  const response = await fetch('data/photographers.json')
  return response.json()
}

function displayData(photographers: Photographer[]) {
  const photographersSection: HTMLElement = document.querySelector('.photographer_section')!

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function photographerinit() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
}

photographerinit()
