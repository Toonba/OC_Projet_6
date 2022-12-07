/**
 * @property {HTMLElement} element
 * @property {string[]} gallery Chemins des images de la lightbox
 * @property {string} url Image actuellement affichée
 */

class Lightbox {
    static init() {
        const medias = Array.from(document.querySelectorAll(".lightbox-media"));
        const gallery = medias.map((media) => media.getAttribute("src"));
        medias.forEach((media) =>
            media.addEventListener("click", (e) => {
                // e.preventDefault();
                new Lightbox(e.currentTarget.getAttribute("src"), gallery);
            })
        );
    }

    /**
     *
     * @param {string} src src du Media
     * @param {string[]} gallery Chemins des images de la lightbox
     */
    constructor(src, gallery) {
        this.element = this.buildDOM(src);
        this.gallery = gallery;
        this.loadMedia(src);
        this.onKeydown = this.onKeydown.bind(this);
        const modal = document.getElementById("contact_modal");
        modal.after(this.element);
        document.addEventListener("keydown", this.onKeydown);
    }

    /**
     *
     * @param {string} src src du Media
     */
    loadMedia(src) {
        this.url = null;
        const current = this.element.querySelector(".current");
        current.innerHTML = "";
        if (src.endsWith(".mp4")) {
            const video = document.createElement("video");
            video.setAttribute("src", src);
            video.setAttribute("controls", "");
            current.appendChild(video);
            this.url = src;
        } else {
            const image = new Image();
            image.src = src;
            current.appendChild(image);
            this.url = src;
        }
    }

    /**
     * Ferme la lightbox
     * @param {MouseEvent/keyboardEvent} e
     *
     */
    close(e) {
        e.preventDefault;
        this.element.remove();
    }

    /**
     * Ferme la lightbox
     * @param {MouseEvent/keyboardEvent} e
     *
     */
    previous(e) {
        e.preventDefault();
        let position = this.gallery.findIndex((image) => image === this.url);
        if (position === 0) {
            position = this.gallery.length;
        }
        this.loadMedia(this.gallery[position - 1]);
    }

    /**
     * Ferme la lightbox
     * @param {MouseEvent/keyboardEvent} e
     *
     */
    next(e) {
        e.preventDefault();
        let position = this.gallery.findIndex((image) => image === this.url);
        if (position === this.gallery.length - 1) {
            position = -1;
        }
        this.loadMedia(this.gallery[position + 1]);
    }

    /**
     * @param {KeyboardEvent} e
     *
     */
    onKeydown(e) {
        if (e.key == "Escape") {
            this.close(e);
        } else if (e.key == "ArrowLeft") {
            this.previous(e);
        } else if (e.key == "ArrowRight") {
            this.next(e);
        }
    }

    /**
     *
     * @param {string} src src du Media
     * @return {HTMLElement}
     */
    buildDOM(src, alt) {
        const dom = document.createElement("section");
        dom.classList.add("lightbox");
        dom.innerHTML = ` <div class="lightbox-body">
        <div class="lightbox-close-button" tabindex="0" aria-label="Ferme la lightbox"><i class="fa-solid fa-xmark"></i></div>
        <div class="previous" tabindex="0" aria-label="Passer au media precedent"><i class="fa-solid fa-chevron-left"></i></div>
        <div class="current"></div>
        <div class="next" tabindex="0" aria-label="Passer au media suivant"><i class="fa-solid fa-chevron-right"></i></div>
    </div>`;
        dom.querySelector(".lightbox-close-button").addEventListener("click", this.close.bind(this));
        dom.querySelector(".previous").addEventListener("click", this.previous.bind(this));
        dom.querySelector(".next").addEventListener("click", this.next.bind(this));
        return dom;
    }
}
