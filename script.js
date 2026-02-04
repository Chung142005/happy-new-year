const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}
// class Particle: hạt sau khi pháo nổ
class Particle {
  constructor(x, y, color, vx, vy) {
    this.x = x;
    this.y = y;
    // this.color = `hsl(${random(0, 360)}, 100%, 75%)`;
    this.color = color;
    this.radius = 4;

    // const goc = Math.random() * Math.PI * 2;
    // const vantoc = Math.random() * 3;
    // this.vx = Math.cos(goc) * vantoc;
    // this.vy = Math.sin(goc) * vantoc;
    this.vx = vx;
    this.vy = vy;

    this.life = 60;
  }
  update() {
    this.x = this.x + this.vx;
    this.y = this.y + this.vy;
    this.vy = this.vy + 0.02;
    this.radius *= 0.98;
    this.life = this.life - 0.7;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
  }
}
// mảng particles lưu tổng các hạt đang tồn tại
let particles = [];

// hàm exploide tạo 50 hạt và đẩy vào mảng particles
function exploide(x, y) {
  for (let i = 0; i < 50; i++) {
    let goc = Math.random() * Math.PI * 2;
    let vantoc = Math.random() * 3;
    let color = `hsl(${random(0, 360)}, 100%, 75%)`;
    let vx = Math.cos(goc) * vantoc;
    let vy = Math.sin(goc) * vantoc;
    particles.push(new Particle(x, y, color, vx, vy));
  }
}
function explodedCircle(x, y, color) {
  const speed = 3;

  for (let i = 0; i < 60; i++) {
    const angle = ((Math.PI * 2) / 60) * i;
    color = this.color;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    particles.push(new Particle(x, y, color, vx, vy));
  }
}
// class Firework: quả pháo bay lên
class Firework {
  constructor() {
    this.x = random(0, canvas.width);
    this.y = canvas.height;
    this.targetY = random(100, canvas.height / 2);
    this.radius = 4;
    this.color = `hsl(${random(0, 360)}, 100%, 75%)`;
    this.speed = random(4, 7);
    this.exploded = false;
  }

  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY && !this.exploded) {
      this.exploded = true;
      // exploide(this.x, this.y);
      explodedCircle(this.x, this.y, this.color);
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
