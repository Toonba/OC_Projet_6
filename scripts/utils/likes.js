//DOM
const likesCount = document.getElementsByClassName("likes-number");
const likeButton = document.getElementsByClassName("like-button");
const likes = document.getElementsByClassName("likes");
const currentlikes = Array.from(document.querySelectorAll(".likes"));


//variables
let totalLikes = 0;
function sumLikes(array) {
    array.forEach((element) => {
        totalLikes += element.likes;
    });
    likesCount[0].textContent = totalLikes;
    return totalLikes;
}

function updateLikes(){
    
}