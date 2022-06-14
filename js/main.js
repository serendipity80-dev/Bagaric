


// Swiper slider
var swiper = new Swiper(".bg-slider-thumbs", {
    loop: true,
    spaceBetween: 0,
    slidesPerView: 0,
  
  });
  var swiper2 = new Swiper(".bg-slider", {
    loop: true,
    spaceBetween: 0,
    thumbs: {
      swiper: swiper,
    },
  });

  // navigation scroll bar effect
  window.addEventListener('scroll', () => {
      const header = document.querySelector('header')

      header.classList.toggle('sticky', window.scrollY > 0)
  });

  // Responsive Navigation Menu Toggle

  const menuBtn = document.querySelector('.nav-menu-btn')
  const closeBtn = document.querySelector('.nav-close-btn')
  const navigation = document.querySelector('.navigation')

  menuBtn.addEventListener("click", () => {

    navigation.classList.add("active")
  })

  closeBtn.addEventListener("click", () => {

    navigation.classList.remove("active")
  })

  

function getElement(selection) {
    const element = document.querySelector(selection);
    if (element) {
      return element;
    }
    throw new Error(
      `Please check "${selection}" selector, no such element exists`
    );
  }
  
  class Gallery {
    constructor(element) {
      this.container = element;
      this.list = [...element.querySelectorAll('.bus-img')];
      // target
      this.modal = getElement('.modal');
      this.modalImg = getElement('.main-img');
      this.imageName = getElement('.image-name');
      this.modalImages = getElement('.modal-images');
      this.closeBtn = getElement('.close-btn');
      this.nextBtn = getElement('.next-btn');
      this.prevBtn = getElement('.prev-btn');
      // bind functions
      this.closeModal = this.closeModal.bind(this);
      this.nextImage = this.nextImage.bind(this);
      this.prevImage = this.prevImage.bind(this);
      this.chooseImage = this.chooseImage.bind(this);
      // container event
      this.container.addEventListener(
        'click',
        function (e) {
          // self.openModal();
          if (e.target.classList.contains('bus-img')) {
            this.openModal(e.target, this.list);
          }
        }.bind(this)
      );
    }
    openModal(selectedImage, list) {
      this.setMainImage(selectedImage);
      this.modalImages.innerHTML = list
        .map(function (image) {
          return `<img src="${
            image.src
          }" title="${image.title}" data-id="${image.dataset.id}" class="${selectedImage.dataset.id === image.dataset.id ? 'modal-img selected' : 'modal-img'}"/>`;
        })
        .join('');
      this.modal.classList.add('open');
      this.closeBtn.addEventListener('click', this.closeModal);
      this.nextBtn.addEventListener('click', this.nextImage);
      this.prevBtn.addEventListener('click', this.prevImage);
      this.modalImages.addEventListener('click', this.chooseImage);
    }
  
    setMainImage(selectedImage) {
      this.modalImg.src = selectedImage.src;
      this.imageName.textContent = selectedImage.title;
    }
  
    closeModal() {
      this.modal.classList.remove('open');
      this.closeBtn.removeEventListener('click', this.closeModal);
      this.nextBtn.removeEventListener('click', this.nextImage);
      this.prevBtn.removeEventListener('click', this.prevImage);
      this.modalImages.removeEventListener('click', this.chooseImage);
    }
    nextImage() {
      const selected = this.modalImages.querySelector('.selected');
      const next =
        selected.nextElementSibling || this.modalImages.firstElementChild;
      selected.classList.remove('selected');
      next.classList.add('selected');
      this.setMainImage(next);
    }
    prevImage() {
      const selected = this.modalImages.querySelector('.selected');
      const prev =
        selected.previousElementSibling || this.modalImages.lastElementChild;
      selected.classList.remove('selected');
      prev.classList.add('selected');
      this.setMainImage(prev);
    }
    chooseImage(e) {
      if (e.target.classList.contains('modal-img')) {
        const selected = this.modalImages.querySelector('.selected');
        selected.classList.remove('selected');
  
        this.setMainImage(e.target);
        e.target.classList.add('selected');
      }
    }
  }
  
  const city = new Gallery(getElement('.section-buses'));
  
 


