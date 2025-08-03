// Chuyển đổi dark mode cho navbar và footer
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.querySelector('.navbar').classList.toggle('dark');
  document.querySelector('footer').classList.toggle('dark');
});
