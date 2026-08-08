document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.main-menu');
  if (toggle && menu) toggle.addEventListener('click', () => menu.classList.toggle('open'));
  document.querySelectorAll('.main-menu > li > button').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 992px)').matches) {
        e.preventDefault();
        btn.parentElement.classList.toggle('open');
      }
    });
  });
});
