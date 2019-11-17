import Phaser from 'phaser'
import {IsPC,windowWidth,windowHeight} from './util'

const isPc= IsPC()
console.log(document.body.clientWidth,window.innerHeight)
export default {
  type: Phaser.AUTO,
  width: isPc ? 350 * 1.5 : windowWidth,
  height: isPc ? 900 : windowHeight,
  backgroundColor: "#2d2d2d",
  parent: 'game',
  physics: {
    default: "arcade", // 物理系统
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

