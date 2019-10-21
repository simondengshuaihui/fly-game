// 加载进度条
import Phaser from "phaser";
export default class Load extends Phaser.Scene {
  preload() {
    let preloadSprite = this.add.sprite(
      this.sys.canvas.width / 2 - 110,
      this.sys.canvas.height / 2,
      "loading"
    );
    let loadingText = this.make.text({
      x: this.sys.canvas.width / 2,
      y: this.sys.canvas.height / 2 - 20,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff"
      }
    });
    loadingText.setOrigin(0.5, 0.5);
    preloadSprite.setOrigin(0, 0);
    this.load.on("progress", function(value) {
      preloadSprite.displayWidth = 220 * value;
      loadingText.setText(`Loading ${parseInt(value * 100) + "%"}`);
    });
    this.load.on("complete", function() {
      loadingText.destroy();
      preloadSprite.destroy();
      this.scene.start('main');
    },this);

    this.load.image("background", "assets/bg.jpg");
    this.load.spritesheet("myplane","assets/myplane.png", {frameWidth: 40,frameHeight: 40},4);
    this.load.spritesheet("startbutton","assets/startbutton.png",{ frameWidth: 100, frameHeight: 40 },2);
    this.load.spritesheet("replaybutton","assets/replaybutton.png",{ frameWidth: 80, frameHeight: 30 },2);
    this.load.spritesheet("sharebutton","assets/sharebutton.png",{ frameWidth: 80, frameHeight: 30 },2);
    this.load.image("mybullet", "assets/mybullet.png");
    this.load.image("bullet", "assets/bullet.png");
    this.load.image("enemy1", "assets/enemy1.png");
    this.load.image("enemy2", "assets/enemy2.png");
    this.load.image("enemy3", "assets/enemy3.png");
    this.load.spritesheet("explode1", "assets/explode1.png", {frameWidth:20, frameHeight:20}, 3);
    this.load.spritesheet("explode2", "assets/explode2.png", {frameWidth:30, frameHeight:30}, 3);
    this.load.spritesheet("explode3", "assets/explode3.png",{frameWidth:50, frameHeight:50}, 3);
    this.load.spritesheet("myexplode", "assets/myexplode.png", {frameWidth:40, frameHeight:40}, 3);
    this.load.image("award", "assets/award.png");
    this.load.audio("normalback", "assets/normalback.mp3");
    this.load.audio("playback", "assets/playback.mp3");
    this.load.audio("fashe", "assets/fashe.mp3");
    this.load.audio("crash1", "assets/crash1.mp3");
    this.load.audio("crash2", "assets/crash2.mp3");
    this.load.audio("crash3", "assets/crash3.mp3");
    this.load.audio("ao", "assets/ao.mp3");
    this.load.audio("pi", "assets/pi.mp3");
    this.load.audio("deng", "assets/deng.mp3");
  }
  create() {}
}
