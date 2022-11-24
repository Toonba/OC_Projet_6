function photographerFactory(data) {
    const {name, id, city, country, tagline, price, portrait} = data;
    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const link = document.createElement("a");
        link.setAttribute("title", `Visiter la page de profile de ${name}`);
        link.setAttribute("href", `./photographer.html?id=${id}`);
        link.setAttribute("tabindex", "0");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `photo de : ${name}`);
        const div = document.createElement("div");
        div.className = "img-container";
        const h2 = document.createElement("h2");
        h2.textContent = name;
        const h3 = document.createElement("h3"); // est ce que j'ai le "droit" d'utiliser un h3, ou d'un point de vu accessibilité c'est pas ouf ?
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement("p");
        p.textContent = tagline;
        const span = document.createElement("span");
        span.textContent = `${price}€/jour`;
        article.appendChild(link);
        link.appendChild(div);
        div.appendChild(img);
        link.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);
        return article;
    }
    // Est ce que je pourrais utiliser les même nom de variable ?
    function getPhotograpHeaderDOM() {
        const photograpHeader = document.getElementsByClassName("photograph-header");
        const formButton = document.getElementsByClassName("contact_button");
        const textdiv = document.createElement("div");
        textdiv.className = "description-container";
        const profilH2 = document.createElement("h2");
        profilH2.textContent = name;
        const profilH3 = document.createElement("h3");
        profilH3.textContent = `${city}, ${country}`;
        const profilP = document.createElement("p");
        profilP.textContent = tagline;
        const imgdiv = document.createElement("div");
        imgdiv.className = "img-container";
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `photo de : ${name}`);
        photograpHeader[0].insertBefore(textdiv, formButton[0]);
        textdiv.appendChild(profilH2);
        textdiv.appendChild(profilH3);
        textdiv.appendChild(profilP);
        photograpHeader[0].appendChild(imgdiv);
        imgdiv.appendChild(img);
    }
    // je pense qu'ici on veux return tous nos paramètres présent dans l'objet pour pouvoir s'en servir plus tard
    return {name, id, city, country, tagline, price, picture, getUserCardDOM, getPhotograpHeaderDOM};
}
