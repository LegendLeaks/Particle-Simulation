/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas");

let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "black";

let particles_array = [];
let hue = 0;

const mouse = {
    x: undefined,
    y:undefined,
}

canvas.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    for(let i = 0; i < 3; i++) {
        particles_array.push(new Particle());
    }
})

canvas.addEventListener('mousedown', function(event){
    for(let i = 0; i < 100; i++) {
        particles_array.push(new Particle());
    }
})

function get_distance(p1, p2)
{
    // get distance between 2 particles

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;

    let distance = Math.sqrt((dx*dx) + (dy*dy));
    return distance;
}

function draw_line(p1, p2)
{
    // draw a line between 2 particles

    context.strokeStyle = p1.colour;
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.stroke();
    context.closePath();
}

class Particle
{
    constructor()
    {
        this.x = mouse.x;
        this.y = mouse.y

        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.colour = 'hsl('+ hue +',100%,50%)';
    }

    update()
    {
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.2) {
            this.size -= 0.1;
        }
    }

    draw()
    {
        context.fillStyle = this.colour;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }
}

function handle_particles()
{
    // update and draw all particles
    for(let i = 0; i < particles_array.length; i++)
        {
            particles_array[i].update();
            particles_array[i].draw();

            // draw lines to each particle
            for(let j = i+1; j < particles_array.length; j++)
                {
                    if(get_distance(particles_array[i], particles_array[j]) < 60)
                        {
                            draw_line(particles_array[i], particles_array[j]);
                        }
                }

            // remove small particles
            if(particles_array[i].size <= 0.2) {
                particles_array.splice(i, 1);
                i--;
            }


        }
    

}

function animate()
{
    //context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 0, 0.9)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    handle_particles();
    hue += 2;
    requestAnimationFrame(animate);
}

animate();