/* Fireworks Animation */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const sound = document.getElementById("boom");   // <-- Sound Added

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

class Firework {
    constructor(x, y, targetY) {
        this.x = x;
        this.y = y;
        this.targetY = targetY;
        this.speed = 2 + Math.random() * 3;
        this.exploded = false;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
    update() {
        if (this.y > this.targetY) {
            this.y -= this.speed;
        } else if (!this.exploded) {
            this.explode();
            this.exploded = true;

            // 🔥 Play Cracker Sound
            sound.currentTime = 0;
            sound.play();
        }
    }
    explode() {
        for (let i = 0; i < 30; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
        }
    }
    draw() {
        if (!this.exploded) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = Math.random() * 5;
        this.angle = Math.random() * Math.PI * 2;
        this.alpha = 1;
        this.decay = 0.02;
    }
    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.alpha -= this.decay;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}

function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        fireworks.push(
            new Firework(
                Math.random() * canvas.width,
                canvas.height,
                Math.random() * canvas.height / 2
            )
        );
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();
        if (fireworks[i].exploded) fireworks.splice(i, 1);
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].alpha <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(animate);
}

animate();



