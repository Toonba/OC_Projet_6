function galleryFactory(data) {
    const {id, title, photographerId, image, likes, date, price, video} = data;
    const picture = `assets/photographers/${photographerId}/${image}`;
    const mp4 = `assets/photographers/${photographerId}/${video}`;

    function getPhotographeGaleryDOM() {
        const mediaContainer = document.createElement("article");
        mediaContainer.className = "media-container";
        if (image !== undefined) {
            mediaContainer.innerHTML = `<img class="lightbox-media" src="${picture}" role="button" alt="${title}" tabindex="0"><aside class="mediaDescription-container"><h4>${title}</h4><div class="likes-container"><span class="likes">${likes}</span><i class="fa-solid fa-heart like-button" tabindex="0"></i></div></aside>`;
            // const img = document.createElement("img");
            // img.className = "lightbox-media";
            // img.setAttribute("src", picture);
            // img.setAttribute("role", "button");
            // img.setAttribute("alt", title);
            // img.setAttribute("tabindex", "0");
            // mediaContainer.appendChild(img);
        }
        if (video !== undefined) {
            mediaContainer.innerHTML = `<video class="lightbox-media" controle="" src="${mp4}" role="button" alt="${title}" tabindex="0"></video><aside class="mediaDescription-container"><h4>${title}</h4><div class="likes-container"><span class="likes">${likes}</span><i class="fa-solid fa-heart like-button" tabindex="0"></i></div></aside>`;

            // const vdo = document.createElement("video");
            // vdo.className = "lightbox-media";
            // vdo.setAttribute("controle", "");
            // vdo.setAttribute("src", mp4);
            // // vdo.setAttribute("autoplay", "");
            // vdo.setAttribute("role", "button");
            // vdo.setAttribute("alt", title);
            // vdo.setAttribute("tabindex", "0");
            // mediaContainer.appendChild(vdo);
        }
        // const mediaDescription = document.createElement("aside");
        // mediaDescription.className = "mediaDescription-container";
        // const h3 = document.createElement("h3");
        // h3.textContent = title;
        // const divLikes = document.createElement("div");
        // divLikes.className = "likes-container";
        // const nblike = document.createElement("span");
        // nblike.className = "likes";
        // nblike.textContent = likes;
        // const heart = document.createElement("i");
        // heart.className = "fa-solid fa-heart like-button";
        // heart.setAttribute("tabindex", "0");
        // sectionGalery[0].appendChild(mediaContainer);
        // mediaContainer.appendChild(mediaDescription);
        // mediaDescription.appendChild(h3);
        // mediaDescription.appendChild(divLikes);
        // divLikes.appendChild(nblike);
        // divLikes.appendChild(heart);
        return mediaContainer;
    }
    return {id, photographerId, title, image, likes, date, price, video, getPhotographeGaleryDOM};
}
