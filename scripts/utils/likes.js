//DOM
const likesCount = document.getElementsByClassName("likes-count");
const likeButton = document.getElementsByClassName("like-button");
const likes = document.getElementsByClassName("likes");

//variables
let totalLikes = 0;
function sumLikes(array) {
    array.forEach((element) => {
        totalLikes += element.likes;
    });
    return totalLikes;
}

function updateLike() {
    for (let i = 0; i < mediaById.length; i++) {
        let originalLike = mediaById[i].likes;
        if (parseInt(likes[i].textContent) !== mediaById[i].likes) {
            return false;
        }
        likeButton[i].addEventListener("click", function (e) {
            originalLike += 1;
            likes[i].textContent = originalLike;
            let newTotalLikes = parseInt(likesCount.textContent, 10);
            likesCount[0].textContent = newTotalLikes;
        });
    }
}
