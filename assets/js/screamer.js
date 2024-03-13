// TODO Trim the scream

const scream = new Audio('./assets/audio/scream.mp3')
const canvas = document.querySelector('canvas')
const img = document.querySelector('img')
const ctx = canvas.getContext('2d')
canvas.height = canvas.width

// ---

let pad_x = 0
const ball = {
  x: 0.5,
  y: 0.5,
  a: 0.5
}

let bounces = 0
let speed = 10
let started

ctx.fillText('Record: 4 (ALN)', 5, 10)

// ---

function render() {
  move_ball()
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillRect(canvas.width * pad_x, canvas.height - 10, 50, 5)
  ctx.fillRect(canvas.width * ball.x, canvas.height * ball.y, 10, 10)

  setTimeout(render, speed)
}

function move_ball() {
  if (bounces == 5) speed++

  ball.x += Math.cos(ball.a) * 0.01
  ball.y -= Math.sin(ball.a) * 0.01

  if (ball.x <= 0  || ball.x > (canvas.width  - 10) / canvas.width) 
    ball.a = Math.PI - ball.a

  if (ball.y <= 0 || ball.y >= (canvas.height - 20) / canvas.height && ball.y < 1 && ball.x >= pad_x && ball.x <= pad_x + (50 / canvas.width)) {
    ball.a *= -1
    if (++bounces == 6) {
      canvas.style.display = 'none'
      img.style.display = 'block'
      scream.play()
    }
  }
}

document.body.addEventListener('keydown', e => {
  if      (e.key == 'ArrowLeft')  pad_x -= 0.03
  else if (e.key == 'ArrowRight') pad_x += 0.03
  pad_x = Math.max(0, Math.min((canvas.width - 50) / canvas.width, pad_x))
})

document.body.addEventListener('click', _ => { if (!started) { started = 1; render() }})
