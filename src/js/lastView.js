export default function(){
  const liNodes = document.querySelectorAll('.team-pic li');
  const ulNode = document.querySelector('.team-pic');
  const width = liNodes[0].offsetWidth;
  const height = liNodes[0].offsetHeight;
  let canvas =null;
  let bubbleTimer  = null;
  let circleTimer  = null;
  for (let i = 0; i < liNodes.length; i++) {
    liNodes[i].onmouseenter = function(){
      for (var j = 0; j < liNodes.length; j++) {
        liNodes[j].style.opacity = '0.5';
      }
      this.style.opacity = '1';
      createCanvas(i);
    };
    ulNode.onmouseleave = ()=>{
      for (var j = 0; j < liNodes.length; j++) {
        liNodes[j].style.opacity = '1';
      };
      canvas.remove();
      canvas = null;
      clearInterval(bubbleTimer);
      clearInterval(circleTimer);
    }
  };

  //鼠标移入，创建canvas
  function createCanvas(index){
    if(!canvas){
      canvas = document.createElement('canvas');
      canvas.height = height;
      canvas.width = width;
      canvas.style.position = 'absolute';
      canvas.style.top = '0px';
      canvas.style.left = index*width+'px';
      bubble();
      ulNode.appendChild(canvas);
    }else{
      canvas.style.left = index*width+'px';
    }
  };
  //生成气泡
  function bubble(){
    let arrCircle = [];
    //生成气泡
    bubbleTimer = setInterval(()=>{
      let r = Math.round(Math.random()*255);
      let g = Math.round(Math.random()*255);
      let b = Math.round(Math.random()*255);

      let c_rad = Math.round(Math.random()*3+7);
      let y = height - c_rad;
      let x = Math.round(Math.random()*width);
      let rad = 0;
      //缩放系数
      let s = Math.round(Math.random()*50+30);
      arrCircle.push({
        r,g,b,c_rad,x,y,rad,s
      })
    },60);
    //画圆
    circleTimer = setInterval(()=>{
      if(canvas.getContext){
        const crt = canvas.getContext('2d');
        crt.clearRect(0,0,width,height);
        arrCircle.forEach(item =>{
          item.rad+= 0.08;
          const y= Math.round(item.y - item.rad*item.s);
          const x= Math.round(item.x + Math.sin(item.rad)*item.s);
          crt.fillStyle = `rgb(${item.r}, ${item.g}, ${item.b})`;
          crt.beginPath();
          crt.arc(x,y,item.c_rad,0,2*Math.PI);
          crt.fill();
        });
      }
    },1000/60)
  }

}