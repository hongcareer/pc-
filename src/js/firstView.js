export default function(){
  const point = document.querySelectorAll('.home-nav li');
  const slide = document.querySelectorAll('.home-slide li');
  const home = document.querySelector('.home');
  let lastIndex = 0;
  let nowIndex = 0;
  let timer ='';
  let lastTime = 0;
  for (let i = 0; i < point.length; i++) {
    point[i].onclick = function(){
      //函数节流
      let nowTime = Date.now();
      if(nowTime-lastTime <= 2100) return;
      nowIndex = i;
      if(lastIndex === nowIndex) return;
      clearInterval(timer);
      if(nowIndex>lastIndex){
        slide[nowIndex].className = 'public rightShow';
        slide[lastIndex].className = 'public leftHide';
      }else{
        slide[nowIndex].className = 'public leftShow';
        slide[lastIndex].className = 'public rightHide';
      };
      point[nowIndex].className = 'active';
      point[lastIndex].className = '';
      lastIndex = nowIndex;
      lastTime = nowTime;
    }
  };

  function autoPlay(){
    timer = setInterval(()=>{
      nowIndex++;
      if(nowIndex === 4){
        nowIndex = 0;
      }
      slide[nowIndex].className = 'public rightShow';
      slide[lastIndex].className = 'public leftHide';
      point[nowIndex].className = 'active';
      point[lastIndex].className = '';
      lastIndex = nowIndex;
    },3000)
  }
  autoPlay();
  home.onmouseenter = function(){
    clearInterval(timer);
  };
  home.onmouseleave = autoPlay;


};

