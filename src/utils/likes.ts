import { Media } from '../factories/media.js'

// DOM
const likesTotalNumber = document.getElementsByClassName('likes-total-number') as HTMLCollectionOf<HTMLDivElement>
const likeButton = document.getElementsByClassName('like-button') as HTMLCollectionOf<HTMLButtonElement>
const likes = document.getElementsByClassName('likes') as HTMLCollectionOf<HTMLSpanElement>

// variables
let totalLikes = 0

// function to calcuate total like
export function sumLikes(array: { likes: number }[]) {
  array.forEach((element) => {
    totalLikes += element.likes
  })
  likesTotalNumber[0].textContent = String(totalLikes)
  return totalLikes
}

// function to add the original number of like as object property
export function setOrginalLikes(array: Media[]) {
  array.forEach((element) => {
    element.originalLikes = element.likes
  })
}

// function to update number of like once user click on heart
export function updateLikes(array: { likes: number }[]) {
  for (let i = 0; i < array.length; i += 1) {
    const myEvent: Array<'click' | 'keydown'> = ['click', 'keydown']
    myEvent.forEach((evt) => {
      likeButton[i].addEventListener(evt, (e) => {
        if ((evt === 'keydown' && (e as KeyboardEvent).key === 'Enter') || evt === 'click') {
          let newLike = parseInt(likes[i].textContent || '0', 10)
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
          likes[i].textContent = String(newLike)
          likesTotalNumber[0].textContent = String(totalLikes)
        }
      })
    })
  }
}
