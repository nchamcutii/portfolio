const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let animationId;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createFirework(x, y) {
  const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ffe4e1', '#d63384'];
  const count = 40;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    const speed = Math.random() * 4 + 2;
    particles.push({
      x,
      y,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: 2 + Math.random() * 2
    });
  }
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter(p => p.alpha > 0);
  for (let p of particles) {
    p.x += p.dx;
    p.y += p.dy;
    p.alpha -= 0.015;

    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  if (particles.length > 0) {
    animationId = requestAnimationFrame(updateParticles);
  }
}

function startFireworks(x, y) {
  createFirework(x, y);
  updateParticles();
  const interval = setInterval(() => {
    createFirework(x, y);
  }, 400);

  // Dừng sau 3 giây
  setTimeout(() => {
    clearInterval(interval);
    cancelAnimationFrame(animationId);
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 3000);
}

document.getElementById("sendBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const form = e.target.closest("form");
  const rect = e.target.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;

  startFireworks(x, y);

  // Hiển thị thông báo
  const msg = document.getElementById("successMessage");
  msg.style.display = "block";

  // Ẩn sau 3 giây
  setTimeout(() => {
    msg.style.display = "none";
  }, 2000);

  form.reset();
});
