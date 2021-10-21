const canvas = document.querySelector('canvas');

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

const ctx = canvas.getContext('2d');

// Rects

// ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
// ctx.fillRect(100, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
// ctx.fillRect(400, 100, 100, 100);
// ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
// ctx.fillRect(300, 300, 100, 100);

// Lines

// ctx.beginPath();
// ctx.moveTo(50, 300);
// ctx.lineTo(300, 100);
// ctx.lineTo(400, 300);
// ctx.strokeStyle = '#fa34a3';
// ctx.stroke();

// Arcs
// ctx.beginPath();
// ctx.arc(300, 300, 30, 0, Math.PI * 2, false);
// ctx.strokeStyle = 'blue';
// ctx.stroke();

// for (let i = 0; i < 256; i++) {
//   let x = Math.random() * window.innerWidth;
//   let y = Math.random() * window.innerHeight;

// }

const colorArray = ['#2c3e50', '#e74c3c', '#ecf0f1', '#3498db', '#298089'];
const maxRadius = 25;

let circleArray = [];

let mouse = {
  x: undefined,
  y: undefined,
};

const onMouseMove = (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
};

const onResizeInit = () => {
  circleArray = [];

  for (let i = 0; i < 250; i++) {
    const radius = Math.random() * 10 + 1;
    const x = Math.random() * (innerWidth - radius * 2);
    const y = Math.random() * (innerHeight - radius * 2);
    const dx = (Math.random() - 0.5) * 6;
    const dy = (Math.random() - 0.5) * 3;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
};

const onResize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  onResizeInit();
};

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('resize', onResize);

class Circle {
  constructor(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
  }

  draw = () => {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  };

  update = () => {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  circleArray.forEach((circle) => circle.update());
};

onResizeInit();
animate();
