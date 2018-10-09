

class Bier {
  consturctor (canvas, x, y){

    const bierColors = ['#A3601D',
    '#E58A12',
    '#E5A614'];

    this.x = x;
    this.y = y;
    this.size = Math.floor(Math.random() * 40) +15;
    this.velocidad = 3;
    //self.volumenBier = Math.floor(Math.random()*5)+1;
    this.volumenBier = Math.floor(this.size/3);
    this.color = bierColors[Math.floor(Math.random() * bierColors.length)];
    this.ctx = canvas.getContext('2d');
    this.img = document.createElement('img');
    this.img.src ='./images/vaso-cerveza.png';
  }

  update () {
    
    this.y += this.velocidad;
    this.x = this.x;
  }


  render () {
  
    // self.ctx.fillStyle = self.color;
    // self.ctx.fillRect(self.x, self.y, self.size, self.size);
    this.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    
  }

  onTheFloor () {
    
    //console.log ((self.y + self.size) > self.ctx.height);
    return ((this.y + this.size) > this.ctx.canvas.height);
  }

}
