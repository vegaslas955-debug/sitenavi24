// ====== REVEAL EFFECT ======
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => el.classList.add('on'));
});

// ====== CUSTOM CURSOR ======
const cursor = document.getElementById('cur');
const ring = document.getElementById('ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ====== STARFIELD ======
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
const STAR_COUNT = 200;

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random() * canvas.width,
  });
}

function drawStars() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = stars[i];
    const k = 128.0 / star.z;
    const x = (star.x - canvas.width / 2) * k + canvas.width / 2;
    const y = (star.y - canvas.height / 2) * k + canvas.height / 2;
    const size = (1 - star.z / canvas.width) * 2;
    ctx.fillRect(x, y, size, size);

    star.z -= 2;
    if (star.z <= 0) {
      star.z = canvas.width;
      star.x = Math.random() * canvas.width;
      star.y = Math.random() * canvas.height;
    }
  }
  requestAnimationFrame(drawStars);
}
drawStars();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
