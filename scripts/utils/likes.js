//DOM
const likesTotalNumber = document.getElementsByClassName("likes-total-number");
const likeButton = document.getElementsByClassName("like-button");
const likes = document.getElementsByClassName("likes");
// const likes = document.querySelectorAll(".likes");
const currentlikes = Array.from(document.querySelectorAll(".likes"));

//variables
let totalLikes = 0;
function sumLikes(array) {
    // for (let i = 0; i < array.length; i++) {
    //     totalLikes += array[;
    // }
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

//faudrai une idée pour que le nombre de like reste quand on trie, qu'on puisse pas like de nouveau après le tri, mais qu'on puisse like une prmeière fois après tri
//ATM ca marche comme je veux avant un tri, et après un tri si on a tous liker mais on peux pas liker après un tri

function updateLikes(array) {
    for (let i = 0; i < array.length; i++) {
        likeButton[i].addEventListener("click", function (e) {
            if (likes[i].textContent == array[i].originalLikes) {
                array[i].likes += 1;
                totalLikes += 1;
                likes[i].textContent = array[i].likes;
                likesTotalNumber[0].textContent = totalLikes;
            } else {
                // alert("vous ne pouvez pas liker plusieurs fois une même photo");
            }
        });
    }
}
