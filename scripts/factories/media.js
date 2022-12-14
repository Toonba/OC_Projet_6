// eslint-disable-next-line
function galleryFactory(data) {
  // prettier-ignore
  const { id, title, photographerId, image, likes, date, price, video } = data;
  const picture = `assets/photographers/${photographerId}/${image}`;
  const mp4 = `assets/photographers/${photographerId}/${video}`;

  function getPhotographeGaleryDOM() {
    const figure = document.createElement("figure");
    figure.className = "media-container";
    if (image !== undefined) {
      figure.innerHTML = `<img class="lightbox-media" src="${picture}" role="button" alt="${title}" tabindex="0" ><figcaption class="mediaDescription-container"><p>${title}</p><div class="likes-container"><span class="likes">${likes}</span><i class="fa-solid fa-heart like-button" tabindex="0" role="button" aria-label="Bouton j'aime"></i></div></figcaption>`;
      // const img = document.createElement("img");
      // img.className = "lightbox-media";
      // img.setAttribute("src", picture);
      // img.setAttribute("role", "button");
      // img.setAttribute("alt", title);
      // img.setAttribute("tabindex", "0");
      // mediaContainer.appendChild(img);
    }
    if (video !== undefined) {
      figure.innerHTML = `<video class="lightbox-media" controle="" src="${mp4}" role="button" alt="${title}" tabindex="0"></video><figcaption class="mediaDescription-container"><p>${title}</p><div class="likes-container"><span class="likes">${likes}</span><i class="fa-solid fa-heart like-button" tabindex="0" role="button" aria-label="Bouton j'aime"></i></div></figcaption>`;

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
    return figure;
  }
  return {
    id,
    photographerId,
    title,
    image,
    likes,
    date,
    price,
    video,
    getPhotographeGaleryDOM,
  };
}
