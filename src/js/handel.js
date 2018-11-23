export default function () {
  const liNodes = document.querySelectorAll('.header-main .nav li');
  const arrow = document.querySelector('.header-main .arrow');
  const ulList = document.querySelector('#content .list');
  const content = document.querySelector('#content');
  const contentNav = document.querySelectorAll('#content .contentnav li');
  let nowIndex = 0;
  let timer = null;
  //箭头的初始位置
  arrow.style.left = liNodes[0].getBoundingClientRect().left+(liNodes[0].offsetWidth/2-arrow.offsetWidth/2)+'px';
  contentNav[0].className = 'active';
  //头部的逻辑
  for (let i = 0; i < liNodes.length; i++) {
    liNodes[i].onclick = function(){
      nowIndex = i;
      move(nowIndex);
    }
  }
//内容区滚动事件
  document.onmousewheel = wheel;
  document.addEventListener('DOMMouseScroll',wheel);
  function wheel(event) {
    event = event || window.event;
    clearTimeout(timer);
    timer = setTimeout(()=>{
      let flag = '';
      if (event.wheelDelta) {
        //ie/chrome
        if (event.wheelDelta > 0) {
          flag = 'up';
        } else {
          flag = 'down'
        }
      } else if (event.detail) {
        //firefox
        if (event.detail < 0) {
          flag = 'up';
        } else {
          flag = 'down'
        }
      }
      switch (flag) {
        case 'up' :
          if(nowIndex>0){
            nowIndex--;
            move(nowIndex);
          }
          break;
        case 'down' :
          if(nowIndex<4){
            nowIndex++;
            move(nowIndex);
          }
          break;
      }

      //禁止默认行为
      event.preventDefault && event.preventDefault();
      return false;
    },200);
  };
//箭头，导航，页面的同步移动
  function move(nowIndex) {
    ulList.style.top = -nowIndex*content.offsetHeight+'px';
    for (var j = 0; j < liNodes.length; j++) {
      liNodes[j].className = '';
      contentNav[j].className='';
    };
    liNodes[nowIndex].className = 'active';
    contentNav[nowIndex].className = 'active';
    arrow.style.left = liNodes[nowIndex].getBoundingClientRect().left+liNodes[nowIndex].offsetWidth/2-arrow.offsetWidth/2+'px';
  };
//点击内容区的导航
  for (let i = 0; i < contentNav.length; i++) {
    contentNav[i].onclick = function(){
      nowIndex = i;
      move(nowIndex);
    }
  }
//窗口的重置
  window.onresize = ()=>{
    ulList.style.top = -nowIndex*content.offsetHeight+'px';
    arrow.style.left = liNodes[nowIndex].getBoundingClientRect().left+liNodes[nowIndex].offsetWidth/2-arrow.offsetWidth/2+'px';
  };
}