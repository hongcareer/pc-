export default function(){
  const music = document.querySelector('.header-main .music');
  const audio = document.querySelector('.header-main .audio');
  let flag = false;
  music.onclick = ()=>{
    if(!flag){
      audio.play();
      music.className = 'music active';
      flag = true;
    }else{
      audio.pause();
      music.className = 'music';
      flag = false;
    }
  }
}