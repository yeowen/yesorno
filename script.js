const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
const fireworksMessage = document.getElementById("fireworksMessage");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework(x, y, color) {
  const particles = [];
  const particleCount = 150; // More particles

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: x,
      y: y,
      angle: random(0, Math.PI * 2),
      speed: random(1, 8), // Varying speeds
      radius: random(1, 4), // Smaller particles
      color: color,
      life: random(100, 250), // Longer life
    });
  }

  return particles;
}

let fireworks = [];

function drawFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.forEach((particle, i) => {
      particle.x += Math.cos(particle.angle) * particle.speed;
      particle.y += Math.sin(particle.angle) * particle.speed + 0.1; // Gravity
      particle.radius *= 0.96; // Shrinks the particles
      particle.life--;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      if (particle.life <= 0) {
        firework.splice(i, 1);
      }
    });

    if (firework.length === 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(drawFireworks);
}

function startFireworks() {
  fireworksMessage.style.display = "block"; // Show the message

  const colors = ["#ff4d4d", "#4da6ff", "#ffff4d", "#b84dff", "#4dff88"];
  for (let i = 0; i < 10; i++) { // Create 10 fireworks
    fireworks.push(
      createFirework(
        random(100, canvas.width - 100),
        random(100, canvas.height - 100),
        colors[Math.floor(random(0, colors.length))]
      )
    );
  }

  drawFireworks();
}