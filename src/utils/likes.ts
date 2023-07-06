// DOM
const likesTotalNumber = document.getElementsByClassName('likes-total-number')!
const likeButton = document.getElementsByClassName('like-button')!
const likes = document.getElementsByClassName('likes')!

// variables
let totalLikes = 0

// function to calcuate total like
function sumLikes(array: { likes: number }[]) {
  array.forEach((element) => {
    totalLikes += element.likes
  })
  likesTotalNumber[0].textContent = totalLikes.toString() // je pense qu'il faudrais reprendre ça pour que la fonction ne touche pas à une variable extérieur , ça serait mieux d'avoir une fonction pure qui prend le likesTotal... comme paramètre
  return totalLikes
}

// function to add the original number of like as object property
function setOrginalLikes(array: Media[]) {
  array.forEach((element) => {
    element.originalLikes = element.likes
  })
}

// function to update number of like once user click on heart

function updateLikes(array) {
  for (let i = 0; i < array.length; i += 1) {
    const myEvent = ['click', 'keydown']
    myEvent.forEach((evt) => {
      likeButton[i].addEventListener(evt, (e) => {
        if ((evt === 'keydown' && e.key === 'Enter') || evt === 'click') {
          let newLike = parseInt(likes[i].textContent, 10)
          if (likeButton[i].classList.contains('fa-regular')) {
            newLike += 1
            totalLikes += 1
            likeButton[i].classList.replace('fa-regular', 'fa-solid')
          } else if (likeButton[i].classList.contains('fa-solid')) {
            newLike -= 1
            totalLikes -= 1
            likeButton[i].classList.replace('fa-solid', 'fa-regular')
          }
          array[i].likes = newLike
          likes[i].textContent = newLike
          likesTotalNumber[0].textContent = totalLikes
        }
      })
    })
  }
}
