const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = `hsl(${random(0, 360)}, 100%, 75%)`;
    this.radius = 1.3;

    const goc = Math.random() * Math.PI * 2;
    const vantoc = Math.random() * 3;
    this.vantocx = Math.cos(goc) * vantoc;
    this.vantocy = Math.sin(goc) * vantoc;
    this.life = 60;
  }
  update() {
    this.x = this.x + this.vantocx;
    this.y = this.y + this.vantocy;
    this.vantocy = this.vantocy + 0.01;
    this.life--;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let particles = [];

function exploide(x, y, color) {
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(x, y, color));
  }
}

class Firework {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height;
    this.targetY = random(100, canvas.height / 2);
    this.radius = 2;
    this.color = `hsl(${random(0, 360)}, 100%, 75%)`;
    this.speed = random(4, 7);
    this.exploded = false;
  }

  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY && !this.exploded) {
      this.exploded = true;
      exploide(this.x, this.y, this.color);
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

let fireworks = [];

function animate() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(new Firework());
  }

  fireworks.forEach((f, i) => {
    f.update();
    f.draw();

    if (f.exploded) {
      fireworks.splice(i, 1);
    }
  });
  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.life < 0) {
      particles.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
