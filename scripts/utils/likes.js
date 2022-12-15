/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
// DOM
const likesTotalNumber = document.getElementsByClassName('likes-total-number')
const likeButton = document.getElementsByClassName('like-button')
const likes = document.getElementsByClassName('likes')
const test = document.getElementsByClassName('main-header')

// variables
let totalLikes = 0
function sumLikes(array) {
  array.forEach((element) => {
    totalLikes += element.likes
  })
  likesTotalNumber[0].textContent = totalLikes
  return totalLikes
}

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
          likes[i].textContent = newLike
          likesTotalNumber[0].textContent = totalLikes
        }
      })
    })
  }
}
