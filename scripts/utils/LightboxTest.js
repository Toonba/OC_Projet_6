/* eslint-disable space-before-function-paren */

/**
 * @property {HTMLElement} element
 * @property {string[]} gallery Chemins des images de la lightbox
 * @property {string[]} title Titres des images
 * @property {string} url Image actuellement affichée
 */

// eslint-disable-next-line no-unused-vars
class Lightbox {
  static init() {
    const medias = Array.from(document.querySelectorAll('.lightbox-media'))
    const gallery = medias.map((media) => media.getAttribute('src'))
    const titleList = medias.map((media) => media.getAttribute('alt'))
    medias.forEach((media) => {
      media.addEventListener('click', (e) => {
        e.preventDefault()
        // eslint-disable-next-line no-new
        new Lightbox(e.currentTarget.getAttribute('src'), gallery, e.currentTarget.getAttribute('alt'), titleList)
      })
      media.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          e.preventDefault()
          // eslint-disable-next-line no-new
          new Lightbox(e.currentTarget.getAttribute('src'), gallery, e.currentTarget.getAttribute('alt'), titleList)
        }
      })
    })
  }

  /**
   *
   * @param {string} src src du Media
   * @param {string[]} gallery Chemins des images de la lightbox
   */

  constructor(src, gallery, title, titleList) {
    this.element = this.buildDOM()
    this.gallery = gallery
    this.titleList = titleList
    this.loadMedia(src, title)
    this.onKeydown = this.onKeydown.bind(this)
    const modal = document.getElementById('contact_modal')
    modal.after(this.element)
    this.element.childNodes[1].childNodes[1].focus()
    document.addEventListener('keydown', this.onKeydown)
  }

  /**
   *
   * @param {string} src src du Media
   */
  loadMedia(src, title) {
    this.url = null
    const figure = this.element.querySelector('.current')
    figure.innerHTML = ''
    if (src.endsWith('.mp4')) {
      const video = document.createElement('video')
      video.setAttribute('src', src)
      video.setAttribute('alt', title)
      video.setAttribute('controls', '')
      figure.appendChild(video)
      this.url = src
    } else {
      const image = new Image()
      image.src = src
      image.alt = title
      figure.appendChild(image)
      this.url = src
    }
    const figcaption = document.createElement('figcaption')
    figcaption.textContent = title
    figcaption.classList.add('current-title')
    figure.appendChild(figcaption)
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent/keyboardEvent} e
   *
   */
  close(e) {
    e.preventDefault()
    const medias = Array.from(document.querySelectorAll('.lightbox-media'))
    medias.forEach((media) => {
      if (this.url === media.getAttribute('src')) {
        media.focus()
      }
    })
    this.element.remove()
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent/keyboardEvent} e
   *
   */
  previous(e) {
    e.preventDefault()
    let position = this.gallery.findIndex((image) => image === this.url)
    if (position === 0) {
      position = this.gallery.length
    }
    this.loadMedia(this.gallery[position - 1], this.titleList[position - 1])
  }

  /**
   * Ferme la lightbox
   * @param {MouseEvent/keyboardEvent} e
   *
   */
  next(e) {
    e.preventDefault()
    let position = this.gallery.findIndex((image) => image === this.url)
    if (position === this.gallery.length - 1) {
      position = -1
    }
    this.loadMedia(this.gallery[position + 1], this.titleList[position + 1])
  }

  /**
   * @param {KeyboardEvent} e
   *
   */
  onKeydown(e) {
    if (e.key === 'Escape') {
      this.close(e)
    } else if (e.key === 'ArrowLeft') {
      this.previous(e)
    } else if (e.key === 'ArrowRight') {
      this.next(e)
    }
  }

  /**
   *
   * @param {string} src src du Media
   * @return {HTMLElement}
   */
  buildDOM() {
    const section = document.createElement('section')
    section.classList.add('lightbox')
    const main = document.getElementById('main')
    main.setAttribute('aria-hidden', 'true')
    section.setAttribute('aria-hidden', 'false')
    section.innerHTML = ` <div class="lightbox-body">
        <button class="lightbox-close-button" tabindex="0" aria-label="Ferme la lightbox"><i class="fa-solid fa-xmark"></i></button>
        <button class="previous" tabindex="0" aria-label="Passer au media precedent"><i class="fa-solid fa-chevron-left"></i></button>
        <figure class="current" tabindex="0"></figure>
        <button class="next" tabindex="0" aria-label="Passer au media suivant"><i class="fa-solid fa-chevron-right"></i></button>
    </div>`
    section.querySelector('.lightbox-close-button').addEventListener('click', this.close.bind(this))
    section.querySelector('.previous').addEventListener('click', this.previous.bind(this))
    section.querySelector('.next').addEventListener('click', this.next.bind(this))
    return section
  }
}
