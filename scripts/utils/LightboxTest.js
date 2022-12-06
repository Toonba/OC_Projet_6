/**
 * @property {HTMLElement} element
 */

class Lightbox {
    static init() {
        const medias = document.querySelectorAll(".lightbox-media").forEach((media) =>
            media.addEventListener("click", (e) => {
                e.preventDefault();
                // if (e.currentTarget.getAttribute("src") === null) {
                //     new Lightbox(e.currentTarget.childNodes[0].getAttribute("src"));
                //     console.log(e.currentTarget.childNodes[0].getAttribute("src"));
                //     console.log(e.currentTarget.getAttribute("src"));
                // }
                new Lightbox(e.currentTarget.getAttribute("src"));
            })
        );
    }

    /**
     *
     * @param {string} src src du Media
     */
    constructor(src) {
        this.element = this.buildDOM(src);
        this.loadMedia(src);
        const modal = document.getElementById("contact_modal");
        modal.after(this.element);
    }

    /**
     *
     * @param {string} src src du Media
     */
    loadMedia(src) {
        const current = this.element.querySelector(".current");
        if (src.endsWith(".mp4")) {
            const video = document.createElement("video");
            video.setAttribute("src", src);
            video.setAttribute("controls", "");
            current.appendChild(video);
        } else {
            const image = new Image();
            image.src = src;
            current.appendChild(image);
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
        <div class="lightbox-close-button" tabindex="0"><i class="fa-solid fa-xmark"></i></div>
        <div class="previous" tabindex="0"><i class="fa-solid fa-chevron-left"></i></div>
        <div class="current"></div>
        <div class="next" tabindex="0"><i class="fa-solid fa-chevron-right"></i></div>
    </div>`;
        // dom.querySelector(".lightbox-close-button").addEventListener("click", this.close.bind(this));
        return dom;
    }
}
