import Phaser from 'phaser'
// 加载进度条
export default class Boot extends Phaser.Scene{
    preload(){
        this.load.image('loading', 'assets/preloader.gif');
    }
    create(){
        this.scene.start('load')
    }
}