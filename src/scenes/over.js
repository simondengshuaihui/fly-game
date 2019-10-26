import Phaser from 'phaser'
import config from '../config'


export default class Over extends Phaser.Scene{
    create(data){
        // 添加背景
        this.bg = this.add.tileSprite(0, 0, config.width*2, config.height*2, 'background');
        // 添加字幕
        this.copyright = this.add.text(config.width/2, config.height - 40, "Simon contribute", {
            fontSize: "16px",
            fill: "#000"
          }).setOrigin(0.5,0.5)
          // 飞机
        this.myPlan = this.add.sprite(config.width/2, config.height/2+100, 'myplane').setOrigin(0.5,0.5)
        this.anims.create({
            key: "fly",
            frames: this.anims.generateFrameNumbers("myplane", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
          });
        this.myPlan.anims.play("fly", true);
        // 分数
        this.scoreText = this.add.text(config.width/2, config.height/2, `SCORE :${data.score || 0}`, {
            fontSize: "36px",
            fontWeight:'bold',
            fill: "#ff0000"
          }).setOrigin(0.5,0.5)
        // 背景音乐
        this.normalback = this.sound.add('normalback',{loop:true});
        this.normalback.play();
        // 按钮
        this.restartbutton = this.add.sprite(config.width/2-45, config.height/2+200,'replaybutton').setInteractive();
        this.sharebutton = this.add.sprite(config.width/2+45, config.height/2+200,'sharebutton').setInteractive();
        this.anims.create({
            key: "replaybuttomDown",
            frames: [{ key: "replaybutton", frame: 1 }],
            frameRate: 20
          });
          this.anims.create({
            key: "replaybuttomUp",
            frames: [{ key: "replaybutton", frame: 0 }],
            frameRate: 20
          });
          this.anims.create({
            key: "sharebuttomDown",
            frames: [{ key: "sharebutton", frame: 1 }],
            frameRate: 20
          });
          this.anims.create({
            key: "sharebuttomUp",
            frames: [{ key: "sharebutton", frame: 0 }],
            frameRate: 20
          });
        this.restartbutton.on('pointerdown', (pointer)=>{
            this.restartbutton.anims.play('replaybuttomDown')
        });
        this.restartbutton.on('pointerup', (pointer)=>{
            this.restartbutton.anims.play('replaybuttomUp')
            this.scene.start('start');
            this.normalback.pause();
        });
        this.sharebutton.on('pointerdown', (pointer)=>{
            this.sharebutton.anims.play('sharebuttomDown')
        });
        this.sharebutton.on('pointerup', (pointer)=>{
            this.sharebutton.anims.play('sharebuttomUp')
            document.title = this.makeTitle(data.score);
            this.shareText = this.add.text(config.width/2 + 100, 30, `点击右上角分享`, {
              fontSize: "20px",
              fontWeight:'bold',
              fill: "#000"
            }).setOrigin(0.5,0.5)
        });
        
    }
    // 生成Title
    makeTitle = function(score) {
    if(score < 1000) {
      return "飞机大战，还挺难的，我才" + score + "分，你能得多少分呢？";
    } else {
      return "飞机大战，我是天才，得了" + score + "分，不服来战？";
    }
  }
}