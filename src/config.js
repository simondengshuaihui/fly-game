import Phaser from 'phaser'
import {IsPC} from './util'

const isPc= IsPC()

export default {
  type: Phaser.AUTO,
  width: isPc ? 350 * 1.5 : window.screen.width,
  height: isPc ? 900 : window.screen.height,
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

