/* ============================================
   NANI BARAL — Lightbox Gallery Logic
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {

  let lightbox = document.getElementById('lightbox');

  // Inject lightbox if not present (allows easy use across multiple pages)
  if (!lightbox) {
    const html = `
      <div id="lightbox" class="lightbox" aria-hidden="true" role="dialog" aria-modal="true">
        <button class="lightbox-close" id="lightboxClose" aria-label="Close Gallery">&times;</button>
        <button class="lightbox-prev" id="lightboxPrev" aria-label="Previous Image">&#10094;</button>
        <div class="lightbox-content">
          <img id="lightboxImg" src="" alt="" />
          <div class="lightbox-caption">
            <h3 id="lightboxTitle">Project Title</h3>
            <p id="lightboxCategory">Category</p>
          </div>
        </div>
        <button class="lightbox-next" id="lightboxNext" aria-label="Next Image">&#10095;</button>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
    lightbox = document.getElementById('lightbox');
  }

  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCategory = document.getElementById('lightboxCategory');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  const portfolioItems = document.querySelectorAll('.portfolio-item');

  let currentGallery = [];
  let currentIndex = 0;

  const showImage = (item) => {
    if (!item) return;
    const img = item.querySelector('img');
    const title = item.querySelector('h3').textContent;
    const category = item.querySelector('span').textContent;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;
  };

  const navigate = (direction) => {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
    showImage(currentGallery[currentIndex]);
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (portfolioItems.length) {
    // Open lightbox
    portfolioItems.forEach((item) => {
      item.addEventListener('click', () => {
        currentGallery = Array.from(portfolioItems).filter(i => !i.classList.contains('hide'));
        currentIndex = currentGallery.indexOf(item);

        showImage(item);
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });

    // Control buttons
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); navigate(-1); });
    lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); navigate(1); });

    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;

      if (e.key === 'Escape' || e.code === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft') {
        navigate(-1);
      } else if (e.key === 'ArrowRight' || e.code === 'ArrowRight') {
        navigate(1);
      }
    });

    // Scroll Wheel support
    let scrollCooldown = false;
    lightbox.addEventListener('wheel', (e) => {
      if (!lightbox.classList.contains('active') || scrollCooldown) return;

      scrollCooldown = true;
      if (e.deltaY > 0) {
        navigate(1);
      } else if (e.deltaY < 0) {
        navigate(-1);
      }

      setTimeout(() => { scrollCooldown = false; }, 400);
    }, { passive: true });
  }
});
