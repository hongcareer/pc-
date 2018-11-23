import '../less/index.less';
const liNodes = document.querySelectorAll('.header-main .nav li');
const arrow = document.querySelector('.header-main .arrow');
arrow.style.left = liNodes[0].getBoundingClientRect().left+(liNodes[0].offsetWidth/2-arrow.offsetWidth/2)+'px';

for (let i = 0; i < liNodes.length; i++) {
  liNodes[i].onclick = function(){
    for (var j = 0; j < liNodes.length; j++) {
      liNodes[j].className = '';
    };
    liNodes[i].className = 'active';
    arrow.style.left = liNodes[i].getBoundingClientRect().left+liNodes[i].offsetWidth/2-arrow.offsetWidth/2+'px';
    console.log(arrow.offsetLeft);
  }
}