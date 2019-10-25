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
        this.myPlan = this.add.sprite(this.width/2, this.height/2+100, 'myplane').setOrigin(0.5,0.5)
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("myplane", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
          });
        this.myPlan.anims.play("fly", true);
        // 开始按钮
        this.startbutton = this.add.sprite(this.width/2, this.height/2+200,'startbutton').setInteractive();
        this.anims.create({
            key: "buttomDown",
            frames: [{ key: "startbutton", frame: 1 }],
            frameRate: 20
          });
          this.anims.create({
            key: "buttomUp",
            frames: [{ key: "startbutton", frame: 0 }],
            frameRate: 20
          });
        this.startbutton.on('pointerdown', (pointer)=>{
            this.startbutton.anims.play('buttomDown')
        });
        this.startbutton.on('pointerup', (pointer)=>{
            this.startbutton.anims.play('buttomUp')
            this.scene.start('start');
            this.normalback.pause();
        });
        // 背景音乐
        this.normalback = this.sound.add('normalback',{loop:true});
        // this.normalback.play();
        // 添加字幕
        this.copyright = this.add.text(this.width/2, this.height - 40, "Simon contribute", {
            fontSize: "16px",
            fill: "#000"
          }).setOrigin(0.5,0.5)
    }
}