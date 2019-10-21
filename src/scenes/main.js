import Phaser from 'phaser'
// 开始界面
export default class Main extends Phaser.Scene{
    preload(){
    }
    create(){
        this.width = this.sys.canvas.width
        this.height = this.sys.canvas.height
        // 背景
        this.bg = this.add.tileSprite(0, 0, this.width*2, this.height*2, 'background');
        // 飞机
        this.myPlan = this.add.sprite(this.width/2, this.height/2, 'myplane').setOrigin(0.5,0.5)
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("myplane", { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
          });
        this.myPlan.anims.play("fly", true);
    }
}