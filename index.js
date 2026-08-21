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
----------------------------------------- */

const backToTopButton = document.querySelector(".back-to-top");

let isBackToTopRendered = false;

const alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? "1" : "0";
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0.8)";
};

window.addEventListener("scroll", () => {
  const shouldShow = window.scrollY > 700;

  if (shouldShow !== isBackToTopRendered) {
    isBackToTopRendered = shouldShow;
    alterStyles(isBackToTopRendered);
  }
});

/* Scroll all the way back to the top */

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* -----------------------------------------
  Scroll reveal — fades/slides sections in as they enter view
 ---------------------------------------- */

const revealTargets = document.querySelectorAll('[data-reveal]')
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (revealTargets.length && !prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' })

  revealTargets.forEach((el) => revealObserver.observe(el))
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'))
}
