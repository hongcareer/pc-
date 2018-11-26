import first from './firstView';
export default function () {
  const liNodes = document.querySelectorAll('.header-main .nav li');
  const arrow = document.querySelector('.header-main .arrow');
  const ulList = document.querySelector('#content .list');
  const content = document.querySelector('#content');
  const contentNav = document.querySelectorAll('#content .contentnav li');
  const homeNode = document.querySelector('.list .home .home-slide');
  const coursePlane1 = document.querySelector('.course-plane1');
  const coursePlane2 = document.querySelector('.course-plane2');
  const coursePlane3 = document.querySelector('.course-plane3');
  const pencil1 = document.querySelector('.works-pencil1');
  const pencil2 = document.querySelector('.works-pencil2');
  const pencil3 = document.querySelector('.works-pencil3');
  const aboutPic = document.querySelectorAll('.about-pic');
  const teamTitle = document.querySelector('.team-title');
  const teamText = document.querySelector('.team-text');
  let nowIndex = 0;
  let lastIndex = 0;
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
    animation[lastIndex].anOut()
    animation[nowIndex].anIn();
    lastIndex = nowIndex;
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
  //所有出场
  let animation =[];
  for (let i = 0; i < animation.length; i++) {
    animation[i].anOut();
  }
  setTimeout(()=>{
    animation[0].anIn ();
  },2000)
  //出入场动画
  animation =[
    {
      anIn (){
        homeNode.style.transform = 'translateY(0)';
        homeNode.style.opacity = '1';
      },
      anOut (){
        homeNode.style.transform = 'translateY(-200px)';
        homeNode.style.opacity = '0';
      },
    },
    {
      anIn (){
        coursePlane1.style.transform = 'translate(0,0)';
        coursePlane2.style.transform = 'translate(0,0)';
        coursePlane3.style.transform = 'translate(0,0)';
      },
      anOut (){
        coursePlane1.style.transform = 'translate(-100px,-100px)';
        coursePlane2.style.transform = 'translate(-100px,100px)';
        coursePlane3.style.transform = 'translate(100px,100px)';
      },
    },
    {
      anIn (){
        pencil1.style.transform = 'translateY(0)';
        pencil2.style.transform = 'translateY(0)';
        pencil3.style.transform = 'translateY(0)';
      },
      anOut (){
        pencil1.style.transform = 'translateY(100px)';
        pencil2.style.transform = 'translateY(-100px)';
        pencil3.style.transform = 'translateY(-100px)';
      },
    },
    {
      anIn (){
        aboutPic[0].style.transform = 'rotate(0)';
        aboutPic[1].style.transform = 'rotate(0)';
      },
      anOut (){
        aboutPic[0].style.transform = 'rotate(-45deg)';
        aboutPic[1].style.transform = 'rotate(45deg)';
      },
    },
    {
      anIn (){
        teamTitle.style.transform = 'translateX(0)';
        teamText.style.transform = 'translateX(0)';
      },
      anOut (){
        teamTitle.style.transform = 'translateX(-100px)';
        teamText.style.transform = 'translateX(100px)';
      },
    },
  ]

  //开机动画
  bootAnimation()
  function bootAnimation() {
    const boot = document.querySelector('#boot-animation');
    const up = document.querySelector('#boot-animation .up');
    const down = document.querySelector('#boot-animation .down');
    const line = document.querySelector('#boot-animation .line');
    let imgArr =['a1.jpg', 'a4.jpg', 'a9.jpg', 'a12.jpg', 'a121.jpg','home_gruen.png',
      'logo.png', 'm1.jpg', 'm2.jpg', 'm3.jpg', 'm4.jpg', 'pencel1.png', 'pencel2.png', 'pencel3.png', 'plane1.png', 'plane2.png', 'plane3.png','robot.png',
      't1.png', 't2.png', 't3.jpg', 't4.jpg','worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'zoomico.png'];
    // console.log(imgArr);
    let imgLoadedNum = 0;
    imgArr.forEach((item,index)=>{
      const img = new Image();
      img.onload = function(){
        imgLoadedNum++;
        line.style.width = Math.round(imgLoadedNum/imgArr.length*100) +'%';
        if(imgLoadedNum === imgArr.length){
          up.style.height = '0';
          down.style.height = '0';
          line.style.width = '0';
          up.addEventListener('transitionend',function(){
            boot.remove();
            animation[0].anIn();
            first();
          })
        }
      };
      img.src = `./images/${imgArr[index]}`;

    })
  };


  // //测试
  // animation[3].anOut();
  // setTimeout(()=>{
  //   animation[3].anIn();
  // },500);
  // move(3);
}