function galeryFactory(data) {
    const {id, photographerId, title, image, likes, date, price} = data;
    const picture = `assets/photographers/${photographerId}/${image}`;

    function getPhotographeGaleryDOM() {
        const sectionGalery = document.getElementsByClassName("galery");
        const mediaContainer = document.createElement("div");
        mediaContainer.className = "media-container";
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", title);
        const mediaDescription = document.createElement("aside");
        mediaDescription.className = "mediaDescription-container";
        const h3 = document.createElement("h3");
        h3.textContent = title;
        const divLikes = document.createElement("div");
        divLikes.className = "likes-container";
        const nblike = document.createElement("span");
        nblike.className = "likes";
        nblike.textContent = likes;
        const heart = document.createElement("i");
        heart.className = "fa-solid fa-heart";
        sectionGalery[0].appendChild(mediaContainer);
        mediaContainer.appendChild(img);
        mediaContainer.appendChild(mediaDescription);
        mediaDescription.appendChild(h3);
        mediaDescription.appendChild(divLikes);
        divLikes.appendChild(nblike);
        divLikes.appendChild(heart);
    }
    return {id, photographerId, title, image, likes, date, price, getPhotographeGaleryDOM};
}
