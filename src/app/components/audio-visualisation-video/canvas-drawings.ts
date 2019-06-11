export class CanvasDrawings {
  ctx: CanvasRenderingContext2D;

  deg = Math.PI / 180;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = this.canvas.getContext('2d');
  }

  randomColor() {
    this.ctx.strokeStyle = this.randomRgba();
    this.ctx.fillStyle = this.randomRgba();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  star(cx, cy, spikes, outerRadius, innerRadius) {
    this.randomColor();
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y)
      rot += step

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y)
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.lineWidth = 5;

    this.ctx.stroke();


    this.ctx.fill();
  }

  image(source, x, y, size) {
    const img = document.createElement('img');
    img.src = source;
    img.onload = () => {
      let w = size;
      let h = size;
      if (img.width > img.height) {
        h = (img.height / img.width) * size;
      } else if (img.height > img.width) {
        w = (img.width / img.height) * size;
      }

      this.ctx.drawImage(img, x, y, w, h);
    };
  }

  peace(x, y, size) {
    this.randomColor();
    this.text('☮', x, y, size);
  }

  randomGender(x, y, size) {
    this.randomColor();
    const symbols = [
      '♂',
      '♀',
      '⚥',
      '⚢',
      '⚣',
      '⚤',
      '⚧'
    ];
    this.text(symbols[Math.floor(Math.random() * symbols.length)], x, y, size);
  }

  heart(x, y, size) {
    this.randomColor();
    const symbols = [
      '♥',
      '❤'
    ];
    this.text(symbols[Math.floor(Math.random() * symbols.length)], x, y, size);
  }

  text(text, x, y, size, font: string = 'Arial') {
    this.ctx.font = size + 'px ' + font;
    this.ctx.fillText(text, x, y);
    this.ctx.strokeText(text, x, y);
  }

  smiley(centerX: number, centerY: number, radius: number) {
    this.randomColor();
    const eyeRadius = radius * 0.14;
    const eyeXOffset = radius * 0.36;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.ctx.fill();
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.beginPath();
    let eyeX = centerX - eyeXOffset;
    const eyeY = centerY - eyeXOffset;
    this.ctx.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
    eyeX = centerX + eyeXOffset;
    this.ctx.arc(eyeX, eyeY, eyeRadius, 0, 2 * Math.PI, false);
    const savedStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = this.ctx.strokeStyle;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius * .66, 0, Math.PI, false);
    this.ctx.stroke();
    this.ctx.fillStyle = savedStyle;

  }


  snowflake(n, x, y, len) {
    this.randomColor();
    this.ctx.lineWidth = 2;
    this.ctx.translate(x, y);
    this.ctx.moveTo(0, 0);
    this.leg(n, len);
    this.ctx.rotate(-120 * this.deg);
    this.leg(n, len);
    this.ctx.rotate(-120 * this.deg);
    this.leg(n, len);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
  }

  leg(n, len) {
    if (n === 0) {
      this.ctx.lineTo(len, 0);
    } else {
      this.ctx.scale(1 / 3, 1 / 3);
      this.leg(n - 1, len);
      this.ctx.rotate(60 * this.deg);
      this.leg(n - 1, len);
      this.ctx.rotate(-120 * this.deg);
      this.leg(n - 1, len);
      this.ctx.rotate(60 * this.deg);
      this.leg(n - 1, len);
    }
    this.ctx.translate(len, 0);
  }

  randomRgba() {
    const o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
  }

  randomHex() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }
}
