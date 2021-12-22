import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const fn = e => localStorage.setItem('videoplayer-current-time', e.seconds);

player.on('timeupdate', throttle(fn, 1000));

if (localStorage.getItem('videoplayer-current-time')) {
  const time = localStorage.getItem('videoplayer-current-time');

  player.setCurrentTime(time);
}
