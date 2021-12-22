import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const fn = e => {
  let timeCode = `${e.seconds}`;
  localStorage.setItem('videoplayer-current-time', timeCode);
  console.log(timeCode);
};

player.on('timeupdate', throttle(fn, 1000));

if (localStorage.getItem('videoplayer-current-time')) {
  const time = localStorage.getItem('videoplayer-current-time');
  console.log('Локальное чтение', time);

  player.setCurrentTime(time);
}
