function photographerFactory(data) {
    const {name, id, city, country, tagline, price, portrait} = data;
    const picture = `assets/photographers/Photographers_ID_Photos/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        const link = document.createElement("a");
        const img = document.createElement("img");
        // si on veux un site accessible il faudrai également ajouter un attribut alt en plus non ?
        img.setAttribute("src", picture);
        const div = document.createElement("div");
        div.setAttribute("class", "img-container");
        const h2 = document.createElement("h2");
        h2.textContent = name;
        const h3 = document.createElement("h3");
        h3.textContent = `${city}, ${country}`;
        const p = document.createElement("p");
        p.textContent = tagline;
        const span = document.createElement("span");
        span.textContent = `${price}€/jour`;
        //Il faudra ajouter du code pour créer un H3 pour la localisation, un p pour le slogan et un autre p ou une span pour leur tarif, je le créerai sur la meme base que l'img ou le h2 et ferais un appendChild également pour les placer les un derrière les autres.
        // les deux ligne ici nous permette de placer img et h2 à l'intérieur de notre balise article
        //Comme on veut que la photo et le H2 soit cliquable je pense qu'il faudrait ajouter une balise a (qui link vers la page du photographe en fonction) et faire un article.appendChild(a) et un a.appendChild(img et h2)
        article.appendChild(link);
        link.appendChild(div);
        div.appendChild(img);
        link.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);
        return article;
    }
    // je pense qu'ici on veux return tous nos paramètres présent dans l'objet pour pouvoir s'en servir plus tard
    return {name, id, city, country, tagline, price, picture, getUserCardDOM};
}
