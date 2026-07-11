const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  const board = document.querySelector('.system-board');
  if (board) {
    board.addEventListener('pointermove', (event) => {
      const bounds = board.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      board.style.setProperty('--ry', `${x * 5}deg`);
      board.style.setProperty('--rx', `${y * -5}deg`);
    });
    board.addEventListener('pointerleave', () => {
      board.style.setProperty('--ry', '0deg');
      board.style.setProperty('--rx', '0deg');
    });
  }

  document.querySelectorAll('.case, .interest').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`);
    });
  });
}

const sectionLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sectionLinks.forEach((link) => {
  const section = document.querySelector(link.getAttribute('href'));
  if (section) sectionObserver.observe(section);
});
