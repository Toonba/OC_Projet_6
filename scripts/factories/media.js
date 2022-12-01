function galeryFactory(data) {
    const {id, title, photographerId, image, likes, date, price, video} = data;
    const picture = `assets/photographers/${photographerId}/${image}`;
    const mp4 = `assets/photographers/${photographerId}/${video}`;

    function getPhotographeGaleryDOM() {
        const sectionGalery = document.getElementsByClassName("galery");
        const mediaContainer = document.createElement("article");
        mediaContainer.className = "media-container";
        if (image !== undefined) {
            const img = document.createElement("img");
            img.className = "lightbox-media";
            img.setAttribute("src", picture);
            img.setAttribute("role", "button");
            img.setAttribute("alt", title);
            img.setAttribute("tabindex", "0");
            mediaContainer.appendChild(img);
        }
        if (video !== undefined) {
            const vdo = document.createElement("video");
            vdo.className = "lightbox-media";
            vdo.setAttribute("controle", "");
            // vdo.setAttribute("autoplay", "");
            vdo.setAttribute("role", "button");
            vdo.setAttribute("alt", title);
            vdo.setAttribute("tabindex", "0");
            const source = document.createElement("source");
            source.setAttribute("src", mp4);
            mediaContainer.appendChild(vdo);
            vdo.appendChild(source);
        }
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
        heart.setAttribute("tabindex", "0");
        sectionGalery[0].appendChild(mediaContainer);
        mediaContainer.appendChild(mediaDescription);
        mediaDescription.appendChild(h3);
        mediaDescription.appendChild(divLikes);
        divLikes.appendChild(nblike);
        divLikes.appendChild(heart);
    }
    return {id, photographerId, title, image, likes, date, price, video, getPhotographeGaleryDOM};
}
