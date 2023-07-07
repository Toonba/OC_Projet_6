/**
 * @property {HTMLElement} element
 * @property {string[]} gallery Chemins des images de la lightbox
 * @property {string[]} title Titres des images
 * @property {string} url Image actuellement affichée
 */

export class Lightbox {
  element: HTMLElement
  gallery: string[]
  titleList: string[]
  url: string | null

  constructor(src: string, gallery: string[], title: string, titleList: string[]) {
    this.element = this.buildDOM()
    this.gallery = gallery
    this.titleList = titleList
    this.loadMedia(src, title)
    this.onKeydown = this.onKeydown.bind(this)
    const modal = document.getElementById('contact_modal')!
    modal.after(this.element)
    ;(this.element.childNodes[1].childNodes[1] as HTMLElement).focus()
    document.addEventListener('keydown', this.onKeydown)
    this.url = null
  }

  loadMedia(src: string, title: string) {
    const figure = this.element.querySelector('.current')!
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

  close() {
    const medias: (HTMLImageElement | HTMLVideoElement)[] = Array.from(document.querySelectorAll('.lightbox-media'))
    medias.forEach((media) => {
      if (this.url === media.getAttribute('src')) {
        media.focus()
      }
    })
    this.element.remove()
  }

  previous() {
    let position = this.gallery.findIndex((image) => image === this.url)
    if (position === 0) {
      position = this.gallery.length
    }
    this.loadMedia(this.gallery[position - 1], this.titleList[position - 1])
  }

  next() {
    let position = this.gallery.findIndex((image) => image === this.url)
    if (position === this.gallery.length - 1) {
      position = -1
    }
    this.loadMedia(this.gallery[position + 1], this.titleList[position + 1])
  }

  onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.close()
    } else if (e.key === 'ArrowLeft') {
      this.previous()
    } else if (e.key === 'ArrowRight') {
      this.next()
    }
  }

  buildDOM() {
    const section = document.createElement('section')
    section.classList.add('lightbox')
    const main = document.getElementById('main')!
    main.setAttribute('aria-hidden', 'true')
    section.setAttribute('aria-hidden', 'false')
    section.innerHTML = `
      <div class="lightbox-body" arialabel="image close up view">
        <button class="lightbox-close-button" tabindex="0" aria-label="Ferme la lightbox"><i class="fa-solid fa-xmark"></i></button>
        <button class="previous" tabindex="0" aria-label="Passer au media precedent"><i class="fa-solid fa-chevron-left"></i></button>
        <figure class="current" tabindex="0"></figure>
        <button class="next" tabindex="0" aria-label="Passer au media suivant"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
    `
    section.querySelector('.lightbox-close-button')!.addEventListener('click', this.close.bind(this))
    section.querySelector('.previous')!.addEventListener('click', this.previous.bind(this))
    section.querySelector('.next')!.addEventListener('click', this.next.bind(this))
    return section
  }

  static init() {
    const medias = Array.from(document.querySelectorAll('.lightbox-media')) as (HTMLImageElement | HTMLVideoElement)[]
    const gallery: string[] = medias.map((media) => media.getAttribute('src')!)
    const titleList = medias.map((media) => media.getAttribute('alt')!)
    medias.forEach((media) => {
      media.addEventListener('click', (e) => {
        e.preventDefault()
        const src = (e.currentTarget as HTMLElement)?.getAttribute('src')
        const alt = (e.currentTarget as HTMLElement)?.getAttribute('alt')
        if (src && alt) {
          new Lightbox(src, gallery, alt, titleList)
        }
      })
      media.addEventListener('keydown', function (e: KeyboardEvent) {
        if (e.code === '13') {
          e.preventDefault()
          const src = (e.currentTarget as HTMLElement)?.getAttribute('src')
          const alt = (e.currentTarget as HTMLElement)?.getAttribute('alt')
          if (src && alt) {
            new Lightbox(src, gallery, alt, titleList)
          }
        }
      } as EventListener)
    })
  }
}
