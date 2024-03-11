const input = document.querySelector('input')
const canvas = document.querySelector('canvas')
const background = document.querySelector('.png')
const ctx = canvas.getContext('2d')

background.addEventListener('load', draw_background)

input.addEventListener('change', e => {
  src = window.URL.createObjectURL(input.files[0])

  const image = new Image();
  image.onload = e => {
    canvas.width = image.width
    canvas.height = image.height
    draw_background()
    ctx.drawImage(image, 0, 0);
  }

  image.src = src;
})

function draw_background() {
  for (let x = 0; x < Math.ceil(canvas.width / 400); x++)
    for (let y = 0; y < Math.ceil(canvas.height / 400); y++)
      ctx.drawImage(background, x * 400, y * 400)
}
