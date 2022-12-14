/* eslint-disable no-unused-vars */
// DOM
const likesTotalNumber = document.getElementsByClassName("likes-total-number");
const likeButton = document.getElementsByClassName("like-button");
const likes = document.getElementsByClassName("likes");

// variables
let totalLikes = 0;
function sumLikes(array) {
  array.forEach((element) => {
    totalLikes += element.likes;
  });
  likesTotalNumber[0].textContent = totalLikes;
  return totalLikes;
}

function setOrginalLikes(array) {
  array.forEach((element) => {
    element.originalLikes = element.likes;
  });
}

function updateLikes(array) {
  for (let i = 0; i < array.length; i += 1) {
    // mettre le click et keydown dans une variable 
    // eslint-disable-next-line no-loop-func
    likeButton[i].addEventListener("click", (e) => { 
      if (parseInt(likes[i].textContent, 10) === array[i].originalLikes) {
        array[i].likes += 1;
        totalLikes += 1;
        likes[i].textContent = array[i].likes;
        likesTotalNumber[0].textContent = totalLikes;
      } else {
        // alert("vous ne pouvez pas liker plusieurs fois une même photo");
      }
    });
    // eslint-disable-next-line no-loop-func
    likeButton[i].addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        if (parseInt(likes[i].textContent, 10) === array[i].originalLikes) {
          array[i].likes += 1;
          totalLikes += 1;
          likes[i].textContent = array[i].likes;
          likesTotalNumber[0].textContent = totalLikes;
        } else {
          // alert("vous ne pouvez pas liker plusieurs fois une même photo");
        }
      }
    });
  }
}
