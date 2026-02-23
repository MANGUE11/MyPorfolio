// Menu Burger
const burger = document.querySelector('.burger')
const mobileMenu = document.querySelector('.mobile-menu')
const menuOverlay = document.querySelector('.menu-overlay')
const mobileLinks = document.querySelectorAll('.mobile-menu a')

// Toggle menu
burger.addEventListener('click', () => {
  burger.classList.toggle('active')
  mobileMenu.classList.toggle('active')
  menuOverlay.classList.toggle('active')
  document.body.style.overflow = burger.classList.contains('active')
    ? 'hidden'
    : ''
})

// Fermer le menu en cliquant sur l'overlay
menuOverlay.addEventListener('click', () => {
  burger.classList.remove('active')
  mobileMenu.classList.remove('active')
  menuOverlay.classList.remove('active')
  document.body.style.overflow = ''
})

// Fermer le menu en cliquant sur un lien
mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    burger.classList.remove('active')
    mobileMenu.classList.remove('active')
    menuOverlay.classList.remove('active')
    document.body.style.overflow = ''
  })
})

// Curseur personnalisé
const cursor = document.querySelector('.cursor')
const cursorFollower = document.querySelector('.cursor-follower')

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px'
  cursor.style.top = e.clientY + 'px'

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + 'px'
    cursorFollower.style.top = e.clientY + 'px'
  }, 100)
})

// Effet au clic
document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)'
  cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)'
})

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)'
  cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)'
})

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  })
})

// Animation au scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px',
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, observerOptions)

// Observer tous les éléments avec animation
document
  .querySelectorAll(
    '.fade-in, .service-card, .portfolio-item, .timeline-item, .section-title, .section-subtitle, .contact-container, .gallery-item',
  )
  .forEach((el) => {
    observer.observe(el)
  })

// Animation différée pour les cartes de services
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.2}s`
})

// Animation différée pour les items du portfolio
document.querySelectorAll('.portfolio-item').forEach((item, index) => {
  item.style.transitionDelay = `${index * 0.15}s`
})

// Formulaire de contact
const contactForm = document.getElementById('contactForm')
contactForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Animation de soumission
  const submitBtn = contactForm.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = 'Envoi en cours...'
  submitBtn.style.background =
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

  // Simulation d'envoi (remplacer par vraie logique)
  setTimeout(() => {
    submitBtn.textContent = 'Message envoyé ! ✓'
    submitBtn.style.background =
      'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'

    setTimeout(() => {
      submitBtn.textContent = originalText
      submitBtn.style.background = ''
      contactForm.reset()
    }, 3000)
  }, 2000)
})

// Parallax effect sur le héro
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector('.hero-content')
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
    hero.style.opacity = 1 - scrolled / 700
  }
})

// Navigation active au scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]')
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute('id')
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active')
    } else {
      navLink?.classList.remove('active')
    }
  })
})

// Animation des chiffres (si on veut ajouter des stats)
function animateValue(element, start, end, duration) {
  let startTimestamp = null
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp
    const progress = Math.min((timestamp - startTimestamp) / duration, 1)
    element.textContent = Math.floor(progress * (end - start) + start)
    if (progress < 1) {
      window.requestAnimationFrame(step)
    }
  }
  window.requestAnimationFrame(step)
}

// ===== GALERIE : Pagination + Lightbox =====
const ITEMS_PER_PAGE = 16
const galleryItems = document.querySelectorAll('.gallery-item')
const galleryImages = document.querySelectorAll('.gallery-item img')
const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightbox-img')
let currentIndex = 0
let currentPage = 1
const totalPages = Math.ceil(galleryItems.length / ITEMS_PER_PAGE)

// Créer la pagination uniquement si plus d'une page
if (totalPages > 1) {
  const paginationDiv = document.createElement('div')
  paginationDiv.className = 'gallery-pagination'
  document.querySelector('.gallery-grid').after(paginationDiv)
  buildPagination()
}

function buildPagination() {
  const container = document.querySelector('.gallery-pagination')
  if (!container) return
  container.innerHTML = ''

  // Bouton précédent
  const prev = document.createElement('button')
  prev.className = 'nav-btn'
  prev.innerHTML = '<i class="fa-solid fa-chevron-left"></i>'
  prev.disabled = currentPage === 1
  prev.onclick = () => goToPage(currentPage - 1)
  container.appendChild(prev)

  // Numéros de pages
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button')
    btn.textContent = i
    btn.className = i === currentPage ? 'active' : ''
    btn.onclick = () => goToPage(i)
    container.appendChild(btn)
  }

  // Bouton suivant
  const next = document.createElement('button')
  next.className = 'nav-btn'
  next.innerHTML = '<i class="fa-solid fa-chevron-right"></i>'
  next.disabled = currentPage === totalPages
  next.onclick = () => goToPage(currentPage + 1)
  container.appendChild(next)
}

function goToPage(page) {
  currentPage = page
  const start = (page - 1) * ITEMS_PER_PAGE
  const end = start + ITEMS_PER_PAGE

  galleryItems.forEach((item, i) => {
    item.classList.toggle('hidden', i < start || i >= end)
  })

  buildPagination()
  document.getElementById('galerie').scrollIntoView({ behavior: 'smooth' })
}

// Initialiser page 1
goToPage(1)

// Lightbox
function openLightbox(index) {
  currentIndex = index
  lightboxImg.src = galleryImages[index].src
  lightbox.classList.add('active')
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightbox.classList.remove('active')
  document.body.style.overflow = ''
}

function navigateLightbox(direction) {
  currentIndex =
    (currentIndex + direction + galleryImages.length) % galleryImages.length
  lightboxImg.src = galleryImages[currentIndex].src
}

// Fermer avec Escape + navigation clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') navigateLightbox(-1)
  if (e.key === 'ArrowRight') navigateLightbox(1)
})

// Fermer en cliquant sur le fond
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox()
})
