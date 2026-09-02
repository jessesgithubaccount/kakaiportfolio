// Footer year
var yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll-spy: highlight nav link matching the section currently in view.
// Uses IntersectionObserver against a thin band just under the navbar, so a
// link only lights up once its section has genuinely scrolled up to that
// point — not the moment it first peeks into the bottom of the screen.
var spySections = Array.prototype.slice.call(
  document.querySelectorAll('main .section[id], .hero[id]')
);
var spyLinks = {};
document.querySelectorAll('.nav-links a[href^="#"]').forEach(function (link) {
  var id = link.getAttribute('href').slice(1);
  if (id) spyLinks[id] = link;
});

function setActiveLink(id) {
  Object.keys(spyLinks).forEach(function (key) {
    spyLinks[key].classList.toggle('active', key === id);
  });
}

var navHeightPx = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 84;
var spyObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && spyLinks[entry.target.id]) {
      setActiveLink(entry.target.id);
    }
  });
}, {
  root: null,
  rootMargin: '-' + (navHeightPx + 16) + 'px 0px -70% 0px',
  threshold: 0
});
spySections.forEach(function (sec) {
  if (spyLinks[sec.id]) spyObserver.observe(sec);
});

// Navbar: brighten glass on scroll
var nav = document.querySelector('.nav');
function onScroll() {
  if (!nav) return;
  if (window.scrollY > 24) nav.classList.add('is-scrolled');
  else nav.classList.remove('is-scrolled');
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
var navToggle = document.querySelector('.nav-toggle');
if (navToggle && nav) {
  navToggle.addEventListener('click', function () {
    nav.classList.toggle('menu-open');
  });
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    link.addEventListener('click', function () { nav.classList.remove('menu-open'); });
  });
}

// Contact modal (glass, triggered by any [data-open-contact] element)
var modal = document.getElementById('contact-modal');
function openModal() {
  if (!modal) return;
  modal.classList.add('is-open');
  document.body.classList.add('modal-open');
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('is-open');
  document.body.classList.remove('modal-open');
  resetContactForm();
}
document.querySelectorAll('[data-open-contact]').forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    openModal();
  });
});
document.querySelectorAll('[data-close-contact]').forEach(function (btn) {
  btn.addEventListener('click', closeModal);
});
if (modal) {
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });
}
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeModal();
});

// Contact form: name/email/message -> glassmorphism preview -> confirm -> mailto
var CONTACT_EMAIL = 'your.email@example.com';
var contactForm = document.getElementById('contact-form');
var messagePreview = document.getElementById('message-preview');
var previewFrom = document.getElementById('preview-from');
var previewMessage = document.getElementById('preview-message');
var previewEditBtn = document.getElementById('preview-edit');
var previewConfirmBtn = document.getElementById('preview-confirm');

function resetContactForm() {
  if (!contactForm || !messagePreview) return;
  messagePreview.hidden = true;
  contactForm.hidden = false;
  contactForm.reset();
}

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (typeof contactForm.reportValidity === 'function' && !contactForm.reportValidity()) return;

    var name = document.getElementById('cf-name').value.trim();
    var email = document.getElementById('cf-email').value.trim();
    var message = document.getElementById('cf-message').value.trim();

    contactForm.dataset.name = name;
    contactForm.dataset.email = email;
    contactForm.dataset.message = message;

    previewFrom.textContent = name + ' <' + email + '>';
    previewMessage.textContent = message;

    contactForm.hidden = true;
    messagePreview.hidden = false;
  });
}

if (previewEditBtn) {
  previewEditBtn.addEventListener('click', function () {
    messagePreview.hidden = true;
    contactForm.hidden = false;
  });
}

if (previewConfirmBtn) {
  previewConfirmBtn.addEventListener('click', function () {
    var name = contactForm.dataset.name || '';
    var email = contactForm.dataset.email || '';
    var message = contactForm.dataset.message || '';
    var subject = 'Portfolio message from ' + name;
    var body = message + '\n\n\u2014 ' + name + ' (' + email + ')';
    var mailtoLink = 'mailto:' + CONTACT_EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
    window.location.href = mailtoLink;
  });
}

// Scroll-reveal for .reveal elements
var revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(function (el) { io.observe(el); });
} else {
  revealEls.forEach(function (el) { el.classList.add('in-view'); });
}

