class Bretzel{
  constructor (canvas, x, y){
    
    this.x = x; 
    this.y = y;
    this.size = Math.floor(Math.random()*30)+20;
    this.velocidad = 10;
    this.color = 'red';
    this.ctx = canvas.getContext('2d');
    this.img = document.createElement('img');
    this.img.src ='./images/bretzel.png';

  }


  update (){
    
    this.y += this.velocidad;
    this.x = this.x;

  }
  render (){
    // self.ctx.fillStyle = self.color;
    // self.ctx.fillRect(self.x, self.y, self.size, self.size);
    this.ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
  }

  bretzelOnTheFloor (){
  
    return ((this.y + this.size) > this.ctx.canvas.height);
  }
}