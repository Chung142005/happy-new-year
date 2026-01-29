const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = 2;

    const goc = Math.random() * Math.PI * 2;
    const vantoc = Math.random() * 5;
    this.vantocx = Math.cos(goc) * vantoc;
    this.vantocy = Math.sin(goc) * vantoc;
    const life = 10;
  }
  update() {
    this.x = this.x + this.vantocx;
    this.y = this.y + this.vantocy;
    this.life--;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

class Firework {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height;
    this.targetY = random(100, canvas.height / 2);
    this.radius = 2;
    this.color = `hsl(${random(0, 360)}, 100%, 60%)`;
    this.speed = random(4, 7);
  }

  update() {
    this.y -= this.speed;
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

    if (f.y < f.targetY) {
      fireworks.splice(i, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
