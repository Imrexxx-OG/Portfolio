/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }
}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

/* -----------------------------------------
  Back to top button
 ---------------------------------------- */

const backToTopButton = document.querySelector(".back-to-top")
let isBackToTopRendered = false

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden"
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)"
}

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true
    alterStyles(isBackToTopRendered)
  } else {
    isBackToTopRendered = false
    alterStyles(isBackToTopRendered)
  }
})

/* -----------------------------------------
  Scroll reveal for [data-reveal] elements.
  Progressive enhancement: elements stay visible by default,
  so nothing breaks if JS fails or IntersectionObserver isn't supported.
  Only once both are confirmed do we hide-then-reveal.
 ---------------------------------------- */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const revealTargets = document.querySelectorAll('[data-reveal]')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-in')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  })

  revealTargets.forEach(el => {
    el.classList.add('reveal-init')
    observer.observe(el)
  })
}
